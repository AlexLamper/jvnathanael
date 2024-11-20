'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

export default function ActiviteitDetails({ params }: { params: Promise<{ activiteitId: string }> }) {
  const supabase = createClient()

  const [activiteitId, setActiviteitId] = useState<string | null>(null)
  const [activiteit, setActiviteit] = useState<any | null>(null)
  const [participants, setParticipants] = useState<any[] | null>(null) // Define participants state
  const [userName, setUserName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  // Fetch activity details
  useEffect(() => {
    params.then((resolvedParams) => setActiviteitId(resolvedParams.activiteitId))
  }, [params])

  useEffect(() => {
    if (activiteitId) {
      const fetchActiviteit = async () => {
        // Fetch activity details
        const activiteitResponse = await supabase
          .from('activiteiten')
          .select()
          .eq('id', activiteitId)
          .single()
        setActiviteit(activiteitResponse.data)

        // Fetch participants
        const participantsResponse = await supabase
          .from('activiteiten_participants')
          .select('participant_name') // Adjust column name if different
          .eq('activiteit_id', activiteitId)
        setParticipants(participantsResponse.data || [])
      }
      fetchActiviteit()
    }
  }, [activiteitId])

  // Handle sign-up (POST request using Supabase)
  const handleSignUp = async () => {
    if (!userName.trim()) {
      alert('Please enter your name.')
      return
    }

    setIsLoading(true)

    try {
      // Insert new participant into the `activiteiten_participants` table
      const { data, error } = await supabase
        .from('activiteiten_participants')
        .insert({
          participant_name: userName,
          activiteit_id: activiteitId,
        })

      if (error) {
        console.error('Error adding participant:', error)
        alert('An error occurred while signing up. Please try again.')
        return
      }

      console.log('Participant added successfully:', data)

      // Update the participants list locally
      setParticipants((prev) => [...(prev || []), { participant_name: userName }])
      setSuccessMessage('You have successfully signed up!')
      setUserName('') // Clear the input field
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!activiteit) {
    return <div>Loading...</div>
  }

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-[#3A3C71]">{activiteit.title}</h1>
      <p className="text-gray-700 mb-4">{activiteit.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Datum:</strong> {new Date(activiteit.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Participants ({participants?.length || 0}):</strong>{' '}
        {participants && participants.length > 0
          ? participants.map((p) => p.participant_name).join(', ')
          : 'No participants yet'}
      </p>

      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-lg font-semibold mb-2 text-black">Aanmelden voor deze activiteit</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-400 rounded-lg px-4 py-2 w-full mb-4 bg-white text-black"
        />
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition ${
            isLoading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      </div>
    </section>
  )
}

'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Activiteiten() {
  const [activiteiten, setActiviteiten] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      // Fetch activities and their participant counts
      const { data: activiteitenData, error: activiteitenError } = await supabase
        .from('activiteiten')
        .select('*')

      if (activiteitenError) {
        console.error('Error fetching activiteiten:', activiteitenError)
        return
      }

      // Fetch participants for all activities
      const { data: participantsData, error: participantsError } = await supabase
        .from('activiteiten_participants')
        .select('activiteit_id, participant_name')

      if (participantsError) {
        console.error('Error fetching participants:', participantsError)
        return
      }

      // Add participant count to each activity
      const activiteitenWithParticipants = activiteitenData.map((activiteit) => {
        const activiteitParticipants = participantsData?.filter(
          (p) => p.activiteit_id === activiteit.id
        )
        return {
          ...activiteit,
          participants: activiteitParticipants || [],
        }
      })

      setActiviteiten(activiteitenWithParticipants)
    }

    getData()
  }, [])

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Aanstaande activiteiten</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activiteiten?.map((activiteit) => (
          <div
            key={activiteit.id}
            className="border border-black border-opacity-60 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-[#3A3C71]">{activiteit.title}</h3>
            <p className="text-gray-700 mb-4">{activiteit.description}</p>
            <p className="text-sm text-gray-500">Datum: {new Date(activiteit.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">
              <strong>{activiteit.participants.length}</strong> deelnemers:{" "}
              {activiteit.participants.length > 0
                ? activiteit.participants.map((p: any) => p.participant_name).join(', ')
                : 'Geen deelnemers'}
            </p>
            <Link href={`/activiteiten/${activiteit.id}`} passHref>
              <button className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition">
                Details/Aanmelden
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

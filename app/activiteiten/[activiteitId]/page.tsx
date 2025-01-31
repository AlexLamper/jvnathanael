"use client";

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

export default function ActiviteitDetails({ params }: { params: Promise<{ activiteitId: string }> }) {
  const supabase = createClient();

  const [activiteitId, setActiviteitId] = useState<string | null>(null);
  const [activiteit, setActiviteit] = useState<any | null>(null);
  const [participants, setParticipants] = useState<any[] | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { user, isLoaded } = useUser();

  // Check if the user is admin
  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata.role as string;
      setIsAdmin(role === "admin");
    }
  }, [user, isLoaded]);

  // Fetch activity details
  useEffect(() => {
    params.then((resolvedParams) => setActiviteitId(resolvedParams.activiteitId));
  }, [params]);

  useEffect(() => {
    if (activiteitId) {
      const fetchActiviteit = async () => {
        const activiteitResponse = await supabase
          .from('activiteiten')
          .select()
          .eq('id', activiteitId)
          .single();
        setActiviteit(activiteitResponse.data);

        const participantsResponse = await supabase
          .from('activiteiten_participants')
          .select('participant_name')
          .eq('activiteit_id', activiteitId);
        setParticipants(participantsResponse.data || []);
      };
      fetchActiviteit();
    }
  }, [activiteitId]);

  // Handle sign-up (POST request using Supabase)
  const handleSignUp = async () => {
    if (!userName.trim()) {
      alert('Please enter your name.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('activiteiten_participants')
        .insert({
          participant_name: userName,
          activiteit_id: activiteitId,
        });

      if (error) {
        console.error('Error adding participant:', error);
        alert('An error occurred while signing up. Please try again.');
        return;
      }

      setParticipants((prev) => [...(prev || []), { participant_name: userName }]);
      setSuccessMessage('You have successfully signed up!');
      setUserName('');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    alert("Create button clicked. Implement create logic here.");
  };

  const handleEdit = () => {
    alert("Edit button clicked. Implement edit logic here.");
  };

  const handleDelete = () => {
    alert("Delete button clicked. Implement delete logic here.");
  };

  if (!activiteit) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-[#3A3C71]">{activiteit.title}</h1>
      <p className="text-gray-700 mb-4">{activiteit.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Datum:</strong> {new Date(activiteit.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Deelnemers ({participants?.length || 0}):</strong>{' '}
        {participants && participants.length > 0
          ? participants.map((p) => p.participant_name).join(', ')
          : 'No participants yet'}
      </p>

      {isAdmin && (
        <div className="mb-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg mr-2 hover:bg-green-500"
          >
            Creëren
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 hover:bg-blue-500"
          >
            Bewerken
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
          >
            Verwijderen
          </button>
        </div>
      )}

      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-lg font-semibold mb-2 text-black">Aanmelden voor deze activiteit</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Voer je naam in"
          className="border border-gray-400 rounded-lg px-4 py-2 w-full mb-4 bg-white text-black"
        />
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition ${
            isLoading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Aanmelden...' : 'Aanmelden'}
        </button>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      </div>
    </section>
  );
}

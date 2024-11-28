"use client"

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

export default function Activiteiten() {
  const [activiteiten, setActiviteiten] = useState<any[] | null>(null);
  const supabase = createClient();
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata.role as string;
      setIsAdmin(role === "admin");
    }
  }, [user, isLoaded]);

  useEffect(() => {
    const getData = async () => {
      const { data: activiteitenData, error: activiteitenError } = await supabase
        .from('activiteiten')
        .select('*');

      if (activiteitenError) {
        console.error('Error fetching activiteiten:', activiteitenError);
        return;
      }

      const { data: participantsData, error: participantsError } = await supabase
        .from('activiteiten_participants')
        .select('activiteit_id, participant_name');

      if (participantsError) {
        console.error('Error fetching participants:', participantsError);
        return;
      }

      const activiteitenWithParticipants = activiteitenData.map((activiteit) => {
        const activiteitParticipants = participantsData?.filter(
          (p) => p.activiteit_id === activiteit.id
        );
        return {
          ...activiteit,
          participants: activiteitParticipants || [],
        };
      });

      setActiviteiten(activiteitenWithParticipants);
    };

    getData();
  }, []);

  const handleCreate = () => {
    alert("Create button clicked. Implement create logic here.");
  };

  const handleEdit = (id: string) => {
    alert(`Edit button clicked for activiteit with ID: ${id}. Implement edit logic here.`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this activiteit?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('activiteiten')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting activiteit:', error);
        alert('An error occurred while deleting the activiteit.');
        return;
      }

      setActiviteiten((prev) => prev?.filter((activiteit) => activiteit.id !== id) || null);
      alert('Activiteit successfully deleted.');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Aanstaande activiteiten</h2>
      {isAdmin && (
        <div className="mb-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg mr-2 hover:bg-green-500"
          >
            Creëren
          </button>
        </div>
      )}
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
              <strong>{activiteit.participants.length}</strong> deelnemers: {" "}
              {activiteit.participants.length > 0
                ? activiteit.participants.map((p: any) => p.participant_name).join(', ')
                : 'Geen deelnemers'}
            </p>
            <Link href={`/activiteiten/${activiteit.id}`} passHref>
              <button className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition">
                Details/Aanmelden
              </button>
            </Link>
            {isAdmin && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(activiteit.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Bewerken
                </button>
                <button
                  onClick={() => handleDelete(activiteit.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                  Verwijderen
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

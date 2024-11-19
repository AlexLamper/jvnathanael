"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Define the Activiteit type
interface Activiteit {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: string[];
}

export default function ActiviteitDetailPage() {
  const [activiteit, setActiviteit] = useState<Activiteit | null>(null);
  const [participantName, setParticipantName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Use useParams() to get the activiteitId from the URL
  const { activiteitId } = useParams();

  useEffect(() => {
    if (!activiteitId) return;

    // Fetch the activity details by ID from the API route
    fetch(`/api/activiteiten/${activiteitId}`)
      .then((res) => res.json())
      .then((data: Activiteit) => setActiviteit(data))
      .catch((error) => {
        console.error('Fout bij het ophalen van de activiteit:', error);
        setError('Fout bij het ophalen van de activiteit.');
      });
  }, [activiteitId]);

  const handleRegister = async () => {
    if (!participantName) {
      setError('Vul je naam in om je aan te melden.');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activiteitId, participantName }),
    });

    if (response.ok) {
      const updatedActiviteit = await response.json();
      setActiviteit(updatedActiviteit);
      setParticipantName('');
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Registratie mislukt.');
    }
  };

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-24">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Activiteitsdetails</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {activiteit ? (
        <div className="border border-black border-opacity-60 p-4 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#3A3C71]">{activiteit.title}</h3>
          <p className="text-gray-700 mb-4">{activiteit.description}</p>
          <p className="text-sm text-gray-500"><strong>Datum:</strong> {activiteit.date}</p>
          <p className="text-sm text-gray-500">
            <strong>{activiteit.participants ? activiteit.participants.length : 0}</strong> deelnemers
          </p>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2">Aanmelden voor deze activiteit</h4>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="border border-black border-opacity-40 p-2 mt-2 w-full rounded"
              placeholder="Vul je naam in"
            />
            <button
              onClick={handleRegister}
              className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition"
            >
              Aanmelden
            </button>
          </div>
        </div>
      ) : (
        <p>Activiteitsdetails laden...</p>
      )}
    </section>
  );
}

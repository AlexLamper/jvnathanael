"use client";

import { useEffect, useState } from 'react';

interface Activiteit {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  max_participants: number;
  created_at: string;
  updated_at: string;
  participants: any[]; // Adjust this if needed
}

interface ActiviteitenResponse {
  _id: string;
  activiteiten: Activiteit[];
}

const ActiviteitenComponent = () => {
  const [activiteiten, setActiviteiten] = useState<Activiteit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiviteiten = async () => {
      try {
        // Fetch data from your API or database endpoint
        const response = await fetch('/api/activiteiten'); // Adjust this URL to your actual API endpoint
        const data: ActiviteitenResponse = await response.json();
        setActiviteiten(data.activiteiten);
      } catch (err) {
        setError('Failed to fetch activiteiten');
      } finally {
        setLoading(false);
      }
    };

    fetchActiviteiten();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Activiteiten</h1>
      <ul>
        {activiteiten.map((activiteit) => (
          <li key={activiteit._id}>
            <h2>{activiteit.name}</h2>
            <p>{activiteit.description}</p>
            <p><strong>Date:</strong> {new Date(activiteit.date).toLocaleString()}</p>
            <p><strong>Location:</strong> {activiteit.location}</p>
            <p><strong>Max Participants:</strong> {activiteit.max_participants}</p>
            <p><strong>Created At:</strong> {new Date(Number(activiteit.created_at)).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(Number(activiteit.updated_at)).toLocaleString()}</p>
            <p><strong>Participants:</strong> {activiteit.participants.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiviteitenComponent;

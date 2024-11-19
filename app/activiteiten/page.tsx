import React from "react";

type Activiteit = {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: string[];
};

async function fetchActiviteiten(): Promise<Activiteit[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activiteiten`, {
    cache: "no-store", // Ensure the data is always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch activiteiten");
  }

  return res.json();
}

export default async function ActiviteitenPage() {
  const activiteiten = await fetchActiviteiten();

  return (
    <div>
      <h1>Activiteiten</h1>
      <ul>
        {activiteiten.map((activiteit) => (
          <li key={activiteit.id}>
            <h2>{activiteit.title}</h2>
            <p>{activiteit.description}</p>
            <p>{new Date(activiteit.date).toLocaleDateString()}</p>
            <p>Participants: {activiteit.participants.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

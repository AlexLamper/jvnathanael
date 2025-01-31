"use client";

import React, { useEffect, useState } from "react";
import { ActiviteitType } from "@/lib/models";
import Link from "next/link";

const ActiviteitPage = () => {
  const [activiteiten, setActiviteiten] = useState<ActiviteitType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiviteiten = async () => {
      try {
        const response = await fetch("/api/activiteiten");
        if (!response.ok) {
          throw new Error("Failed to fetch activiteiten");
        }

        const activiteiten: ActiviteitType[] = await response.json();
        setActiviteiten(activiteiten);
      } catch (error) {
        console.error("Error fetching activiteiten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiviteiten();
  }, []);

  return (
    <div className="py-8 min-h-[100vh]">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Activiteiten</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : activiteiten.length === 0 ? (
          <p className="text-gray-500">Geen activiteiten gevonden.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activiteiten.map((activiteit) => (
            <div
              key={activiteit._id.toString()}
              className="border border-black border-opacity-60 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-[#3A3C71]">{activiteit.name}</h3>
              <p className="text-gray-700 mb-4">{activiteit.description}</p>
              <p className="text-sm text-gray-500">Datum: {new Date(activiteit.date).toLocaleDateString()}</p>
              {/* <p className="text-sm text-gray-500">
                <strong>{activiteit.participants.length}</strong> deelnemers: {" "}
                {activiteit.participants.length > 0
                  ? activiteit.participants.map((p) => p.participant_name).join(", ")
                  : "Geen deelnemers"}
              </p> */}
              <Link href={`/activiteiten/${activiteit._id.toString()}`} passHref>
                <button className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition">
                  Details/Aanmelden
                </button>
              </Link>
              {/* {isAdmin && (
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
              )} */}
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default ActiviteitPage;

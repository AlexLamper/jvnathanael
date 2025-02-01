"use client";

import React, { useEffect, useState } from "react";
import { ActiviteitType } from "@/lib/models";

const ActiviteitenPage = () => {
  const [activiteiten, setActiviteiten] = useState<ActiviteitType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setActiviteiten(data.activiteiten);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/activiteiten/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }
      setActiviteiten((prev) => prev.filter((a) => a._id.toString() !== id));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Activiteiten</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition">
          Nieuwe Activiteit Toevoegen
        </button>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {activiteiten.length === 0 ? (
              <p className="text-gray-500">Geen activiteiten gevonden</p>
            ) : (
              <ul className="space-y-6">
                {activiteiten.map((activiteit) => (
                  <li
                    key={activiteit._id.toString()}
                    className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      {activiteit.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{activiteit.description}</p>
                    <p className="text-gray-600 dark:text-gray-300">Locatie: {activiteit.location}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Datum: {new Date(activiteit.date).toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Max. deelnemers: {activiteit.max_participants}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ingeschreven deelnemers: {activiteit.participants.length}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                        Bewerken
                      </button>
                      <button
                        onClick={() => handleDelete(activiteit._id.toString())}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Verwijderen
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActiviteitenPage;

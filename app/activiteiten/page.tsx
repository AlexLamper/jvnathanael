"use client";

import React, { useEffect, useState } from "react";
import { ActiviteitType } from "@/lib/models";

const ActiviteitenPage = () => {
  const [activiteiten, setActiviteiten] = useState<ActiviteitType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiviteiten = async () => {
      try {
        const response = await fetch("/api/activiteiten");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const activiteiten: ActiviteitType[] = await response.json();
        setActiviteiten(activiteiten);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiviteiten();
  }, []);

  return (
    <div className="py-8">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Activiteiten</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : activiteiten.length === 0 ? (
          <p className="text-gray-500">Geen activiteiten gevonden</p>
        ) : (
          <ul className="space-y-6">
            {activiteiten.map((activiteit) => (
              <li
                key={activiteit._id.toString()}
                className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {activiteit.name}
                </h2>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActiviteitenPage;

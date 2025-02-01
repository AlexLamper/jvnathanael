"use client";

import React, { useEffect, useState } from "react";
import { ActiviteitType, LessonType } from "@/lib/models";

const ActiviteitenPage = () => {
  const [activiteiten, setActiviteiten] = useState<ActiviteitType[]>([]);
  const [lessons, setLessons] = useState<LessonType[]>([]);
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
        setLessons(data.lessons);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Activiteiten en Lessen</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Activiteiten</h2>
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
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Lessen</h2>
              {lessons.length === 0 ? (
                <p className="text-gray-500">Geen lessen gevonden</p>
              ) : (
                <ul className="space-y-6">
                  {lessons.map((lesson) => (
                    <li
                      key={lesson._id.toString()}
                      className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{lesson.content}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Duur: {lesson.duration} minuten
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Cursus ID: {lesson.course}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ActiviteitenPage;
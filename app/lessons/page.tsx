"use client";

import { useEffect, useState } from 'react';

const LessonPage = () => {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("/api/lessons");
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const lessons: LessonType[] = await response.json();
        setLessons(lessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="py-8">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Lessons</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : lessons.length === 0 ? (
          <p className="text-gray-500">No lessons found</p>
        ) : (
          <ul className="space-y-6">
            {lessons.map((lesson) => (
              <li
                key={lesson._id.toString()}
                className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{lesson.content}</p>
                <p className="text-gray-600 dark:text-gray-400">Duration: {lesson.duration} minutes</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
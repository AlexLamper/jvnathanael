'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Activiteiten() {
  const [activiteiten, setActiviteiten] = useState<any[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Aanstaande activiteiten</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activiteiten?.length === 0 ? (
            <p className="text-gray-500">Geen activiteiten gevonden</p>
          ) : (
            activiteiten?.map((activiteit) => (
              <div
                key={activiteit.id}
                className="border border-black border-opacity-60 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-[#3A3C71]">{activiteit.title}</h3>
                <p className="text-gray-700 mb-4">{activiteit.description}</p>
                <p className="text-sm text-gray-500">Datum: {new Date(activiteit.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">
                  <strong>{activiteit.participants?.length || 0}</strong> deelnemers
                </p>
                <Link href={`/activiteiten/${activiteit.id}`} passHref>
                  <button className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition">
                    Bekijk Details
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
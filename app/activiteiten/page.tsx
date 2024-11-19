'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Activiteiten() {
  const [activiteiten, setActiviteiten] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('activiteiten').select()
      setActiviteiten(data)
    }
    getData()
  }, [])

  return (
    <section className="container lg:max-w-[90%] max-w-[95%] mx-auto py-20 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Aanstaande activiteiten</h2>
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
              <strong>{activiteit.participants?.length || 0}</strong> deelnemers
            </p>
            <Link href={`/activiteiten/${activiteit.id}`} passHref>
              <button className="mt-4 px-6 py-2 bg-[#3A3C71] text-white rounded-md hover:bg-[#323464] transition">
                Bekijk Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

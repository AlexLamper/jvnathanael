'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Activiteiten() {
  const [activiteiten, setActiviteiten] = useState<any[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

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
    <section className="lg:max-w-[90%] max-w-[95%] mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-4 text-[#3A3C71]">Aanstaande activiteiten</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activiteiten?.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">Geen activiteiten gevonden</p>
              </CardContent>
            </Card>
          ) : (
            activiteiten?.map((activiteit) => (
              <Card key={activiteit._id.toString()} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#3A3C70]">{activiteit.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{activiteit.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-[#3A3C70]" />
                    {new Date(activiteit.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2 text-[#3A3C70]" />
                    <p className="text-sm text-gray-500">
                      <strong>{activiteit.participants?.length || 0}</strong> deelnemers
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/activiteiten/${activiteit._id.toString()}`} passHref>
                    <Button className="w-full bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90">Bekijk Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </section>
  )
}
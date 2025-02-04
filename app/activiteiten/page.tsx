"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RegistratieModal from "@/components/activiteiten/RegistratieModal";
import type { ActiviteitType } from "@/lib/models";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trash, Plus, Edit } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const ActiviteitenPage = () => {
  const [activiteiten, setActiviteiten] = useState<ActiviteitType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedActiviteit, setSelectedActiviteit] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata.role as string;
      setIsAdmin(role === "admin");
    }
  }, [user, isLoaded]);

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
    if (!confirm("Weet je zeker dat je deze activiteit wilt verwijderen?")) return;
    try {
      const response = await fetch(`/api/activiteiten/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setActiviteiten(activiteiten.filter((a) => a._id.toString() !== id));
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3A3C70]">Aanstaande activiteiten</h1>
        {isAdmin && (
          <Button className="bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90" asChild>
            <Link href="/activiteiten/nieuw">
              <Plus className="h-5 w-5 mr-2" /> Nieuwe Activiteit
            </Link>
          </Button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-[#3A3C70] border-t-[#C5A572] rounded-full animate-spin"></div>
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
                <CardFooter className="flex justify-between">
                  <Button 
                    className="w-full bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90 mr-6"
                    onClick={() => setSelectedActiviteit(activiteit._id.toString())}
                  >
                    Registreren
                  </Button>
                  {isAdmin && (
                    <div className="flex gap-2">
                    <Link href={`/activiteiten/bewerken/${activiteit._id}`} passHref>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(activiteit._id.toString())}>
                      <Trash className="h-4 w-4" />
                    </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}

      {selectedActiviteit && (
        <RegistratieModal 
          activiteitId={selectedActiviteit} 
          onClose={() => setSelectedActiviteit(null)} 
        />
      )}
    </div>
  );
};

export default ActiviteitenPage;

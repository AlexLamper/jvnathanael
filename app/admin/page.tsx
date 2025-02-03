import { Calendar, Users, BookOpen, Bell, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="container px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Beheerders Paneel</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/activiteiten">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Activiteiten</CardTitle>
              <Calendar className="h-4 w-4 text-[#3A3C70]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Aankomende activiteiten</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/members">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Aanmeldingen</CardTitle>
              <Users className="h-4 w-4 text-[#3A3C70]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">Actieve aanmeldingen</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 mt-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recente Activiteiten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Zangavond",
                  date: "2025-02-03",
                  description: "Samen zingen en lofprijzen.",
                },
                {
                  title: "Schaatsen",
                  date: "2025-02-02",
                  description: "Schaatsen in Breda.",
                },
                {
                  title: "Jeugdavond",
                  date: "2025-02-01",
                  description: "Een gezellige avond voor de jeugd met activiteiten en Bijbelstudie.",
                },
              ].map((announcement) => (
                <div key={announcement.title} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                  <Bell className="h-5 w-5 text-[#3A3C70] mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">{announcement.description}</p>
                    <time className="text-xs text-muted-foreground">{announcement.date}</time>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snelle Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button className="w-full bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90">
                Nieuwe activiteit aanmaken
              </Button>
              <Button className="w-full bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90">
                Persoon aanmelden voor activiteit
              </Button>
              <Link href="/activiteiten">
                <Button className="w-full bg-[#3A3C70] text-white hover:bg-[#3A3C70]/90">Activiteiten Pagina</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Systeem Instellingen</CardTitle>
          <Settings className="h-5 w-5 text-[#3A3C70]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Website</h4>
              <p className="text-sm text-muted-foreground">Beheer website instellingen en weergave</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Gebruikers</h4>
              <p className="text-sm text-muted-foreground">Beheer gebruikers permissies en rollen</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Email</h4>
              <p className="text-sm text-muted-foreground">Pas email notificaties aan</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Backup</h4>
              <p className="text-sm text-muted-foreground">Beheer systeem backups en herstel</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


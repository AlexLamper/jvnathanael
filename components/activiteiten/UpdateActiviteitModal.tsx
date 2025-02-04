import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ActiviteitType } from "@/lib/models"

interface UpdateActiviteitModalProps {
  activiteit: ActiviteitType
  onClose: () => void
  onSuccess: (updatedActiviteit: ActiviteitType) => void
}

const UpdateActiviteitModal = ({ activiteit, onClose, onSuccess }: UpdateActiviteitModalProps) => {
  const [name, setName] = useState(activiteit.name)
  const [description, setDescription] = useState(activiteit.description)
  const [date, setDate] = useState(new Date(activiteit.date).toISOString().split("T")[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/courses/${activiteit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, date }),
      })

      if (!response.ok) {
        throw new Error("Failed to update activiteit")
      }

      const updatedActiviteit = await response.json()
      onSuccess(updatedActiviteit)
    } catch (error) {
      console.error("Error updating activiteit:", error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activiteit Bijwerken</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} required />
          <Textarea
            placeholder="Beschrijving"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button type="submit">Bijwerken</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateActiviteitModal


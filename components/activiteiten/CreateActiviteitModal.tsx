import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateActiviteitModalProps {
  onClose: () => void;
  onSuccess: (newActiviteit: any) => void;
}

const CreateActiviteitModal = ({ onClose, onSuccess }: CreateActiviteitModalProps) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, date }),
      })

      if (!response.ok) {
        throw new Error("Failed to create activiteit")
      }

      const newActiviteit = await response.json()
      onSuccess(newActiviteit)
    } catch (error) {
      console.error("Error creating activiteit:", error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe Activiteit Aanmaken</DialogTitle>
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
            <Button type="submit" className="bg-[#3A3C70] text-white">Aanmaken</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateActiviteitModal


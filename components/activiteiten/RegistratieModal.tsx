"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RegistratieModalProps {
  activiteitId: string;
  onClose: () => void;
}

const RegistratieModal = ({ activiteitId, onClose }: RegistratieModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "activiteit", // Specify the type
          data: { name }, // Send the user's name
          activiteitId, // Send the activiteit ID
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
  
      const data = await response.json();
      console.log("Registered:", data);
      setSuccess("Succesvol geregistreerd!");
      setError(null);
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Registratie</h2>
        <input 
          type="text" 
          placeholder="Je naam" 
          className="border p-2 w-full mb-2" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <Button onClick={handleRegister}>Registreren</Button>
        <Button onClick={onClose} variant="secondary">Annuleren</Button>
      </div>
    </div>
  );
};

export default RegistratieModal;

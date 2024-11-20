"use client";

import { useState } from "react";

interface SignupFormProps {
  activiteitId: string | undefined;
}

const SignupForm: React.FC<SignupFormProps> = ({ activiteitId }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate activiteitId
    if (!activiteitId || typeof activiteitId !== "string") {
      setMessage("Invalid activiteitId");
      console.error("Invalid activiteitId:", activiteitId); // Log for debugging
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activiteitId, name }),
      });

      const data = await response.json();
      setMessage(data.message);
      setName(""); // Clear the input field
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage("Error signing up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2  rounded-md bg-white text-black w-full"
        placeholder="Enter your name"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};

export default SignupForm;

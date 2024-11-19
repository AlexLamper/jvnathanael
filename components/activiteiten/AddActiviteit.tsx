// Example component to add an activiteit

import { useState } from 'react';

const AddActiviteit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState(['Alex Lamper']); // Default participant

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch('/api/addActiviteit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, date, participants }),
    });

    if (response.ok) {
      const newActiviteit = await response.json();
      console.log('Activiteit added:', newActiviteit);
    } else {
      console.error('Failed to add activiteit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Activiteit</button>
    </form>
  );
};

export default AddActiviteit;

// pages/api/addActiviteit.js

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have your database URL in .env
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, date, participants } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO activiteiten (title, description, date, participants) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, new Date(date), participants]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting activiteit:', error);
      res.status(500).json({ error: 'Failed to add activiteit' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

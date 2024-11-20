import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { activiteitId, name } = body;

  console.log("Received payload:", body);

  if (!activiteitId || !name) {
    return NextResponse.json(
      { message: "Invalid data provided", details: body },
      { status: 400 }
    );
  }

  try {
    const query = `
      INSERT INTO public.activiteiten_participants (activiteit_id, participant_name, created_at)
      VALUES ($1, $2, NOW());
    `;
    const values = [activiteitId, name];

    await pool.query(query, values);

    return NextResponse.json({ message: "Successfully signed up!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Error signing up", error: (error as any).message },
      { status: 500 }
    );
  }
}

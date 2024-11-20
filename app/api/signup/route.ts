import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in your environment variables
});

export async function POST(request: Request) {
  const body = await request.json();
  const { activiteitId, name } = body;

  console.log("Received payload:", body); // Debugging logs

  if (!activiteitId || !name) {
    return NextResponse.json({ message: "Invalid data provided", details: body }, { status: 400 });
  }

  try {
    const query = `
      UPDATE "public"."activiteiten"
      SET "participants" = array_append("participants", $1)
      WHERE "id" = $2;
    `;
    const values = [name, activiteitId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Activiteit not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Successfully signed up!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Error signing up", error: (error as any).message }, { status: 500 });
  }
}

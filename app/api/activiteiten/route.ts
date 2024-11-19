import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set up in your `.env` file
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM activiteiten ORDER BY date ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching activiteiten:", error);
    return NextResponse.json(
      { error: "Failed to fetch activiteiten" },
      { status: 500 }
    );
  }
}

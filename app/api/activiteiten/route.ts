import { NextResponse } from 'next/server';
import connectDB from "@/libs/mongodb"
import Activiteit from '@/models/Activiteit';

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB(); // Ensure you're calling this function
    console.log('MongoDB connected successfully.');

    const activiteiten = await Activiteit.find();
    console.log('Activiteiten fetched:', activiteiten);

    return NextResponse.json(activiteiten);
  } catch (error) {
    console.error('Error fetching activiteiten:', error);
    return NextResponse.json({ message: 'Error fetching activiteiten' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    await connectDB();
    const activiteitData = await request.json();
    const newActiviteit = new Activiteit(activiteitData);
    await newActiviteit.save();
    return NextResponse.json(newActiviteit, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating activiteit' }, { status: 500 });
  }
}

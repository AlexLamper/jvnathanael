import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Activiteit from '@/models/Activiteit';

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const activiteiten = await Activiteit.find();
    console.log('Activiteiten fetched:', activiteiten);

    return NextResponse.json(activiteiten);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ message: 'Error fetching courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const activiteitData = await request.json();
    const newActiviteit = new Activiteit(activiteitData);
    await newActiviteit.save();
    return NextResponse.json(newActiviteit, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating activiteit' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Course from '@/models/Course';
import Activiteit from '@/models/Activiteit';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const courses = await Course.find();
    console.log('Courses fetched:', courses);

    const activiteit = await Activiteit.find();
    console.log('Activiteit fetched:', activiteit);

    const activiteiten = await Activiteit.find();
    console.log('Activiteiten fetched:', activiteiten);

    return NextResponse.json({ courses, activiteiten });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { type, data, activiteitId } = await request.json();

    if (type === 'activiteit') {
      if (!activiteitId || !data.name) {
        return NextResponse.json({ message: 'Missing activiteitId or name' }, { status: 400 });
      }

      // Convert the activiteitId from string (in $oid format) to ObjectId
      const activiteitObjectId = new mongoose.Types.ObjectId(activiteitId);

      const activiteit = await Activiteit.findById(activiteitObjectId);
      if (!activiteit) {
        return NextResponse.json({ message: 'Activiteit not found' }, { status: 404 });
      }

      // Check if the user is already registered
      const isRegistered = activiteit.participants.includes(data.name);
      if (isRegistered) {
        return NextResponse.json({ message: 'User already registered' }, { status: 400 });
      }

      console.log('Data Name:', data.name); // Check what value data.name has

      // Ensure that the value of data.name is a string
      if (typeof data.name === 'string') {
        activiteit.participants.push(data.name);
      } else {
        return NextResponse.json({ message: 'Invalid name type' }, { status: 400 });
      }

      await activiteit.save();

      return NextResponse.json(activiteit, { status: 201 });
    } 
    else {
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json({ message: 'Error creating data' }, { status: 500 });
  }
}

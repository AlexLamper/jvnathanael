import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Course from '@/models/Course';
import Activiteit from '@/models/Activiteit';
import Lesson from '@/models/Lesson';

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const courses = await Course.find();
    console.log('Courses fetched:', courses);

    const activiteiten = await Activiteit.find();
    console.log('Activiteiten fetched:', activiteiten);

    const lessons = await Lesson.find();
    console.log('Lessons fetched:', lessons);

    return NextResponse.json({ courses, activiteiten, lessons });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { type, data } = await request.json();

    if (type === 'course') {
      const newCourse = new Course(data);
      await newCourse.save();
      return NextResponse.json(newCourse, { status: 201 });
    } else if (type === 'activiteit') {
      const newActiviteit = new Activiteit(data);
      await newActiviteit.save();
      return NextResponse.json(newActiviteit, { status: 201 });
    } else if (type === 'lesson') {
      const newLesson = new Lesson(data);
      await newLesson.save();
      return NextResponse.json(newLesson, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json({ message: 'Error creating data' }, { status: 500 });
  }
}
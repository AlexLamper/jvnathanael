import { connectDB } from "./connectDB";
import Activiteit from "@/models/Activiteit";
import Course from "@/models/Course";

export const getCourses = async () => {
    try {
        await connectDB();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log('Error in getCourses:', error);
        throw new Error(error);
    }
};

export const getActiviteiten = async () => {
    try {
        await connectDB();
        const activiteiten = await Activiteit.find();
        return activiteiten.map((activiteit) => ({
            _id: activiteit._id,
            name: activiteit.name,
            description: activiteit.description,
            date: activiteit.date,
            location: activiteit.location,
            max_participants: activiteit.max_participants,
            participants: activiteit.participants || [],
            created_at: activiteit.created_at,
            updated_at: activiteit.updated_at,
        }));
    } catch (error) {
        console.log('Error in getActiviteiten:', error);
        throw new Error(error);
    }
};

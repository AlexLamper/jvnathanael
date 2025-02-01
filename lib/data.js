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
        return activiteiten;
    } catch (error) {
        console.log('Error in getActiviteiten:', error);
        throw new Error(error);
    }
};
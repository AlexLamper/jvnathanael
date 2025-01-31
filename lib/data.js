import { connectDB } from "./connectDB";

export const getCourses = async () => {
    try {
        connectDB();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log('Error in getCourses:', error);
        throw new Error(error);
    }
};

export const getActiviteiten = async () => {
    try {
        connectDB();
        const activiteiten = await Activiteit.find();
        return activiteiten;
    } catch (error) {
        console.log('Error in getActiviteiten:', error);
        throw new Error(error);
    }
};
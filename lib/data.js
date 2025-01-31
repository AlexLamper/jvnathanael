import { Activiteit } from "./models";
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

// Get all activiteiten
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

// Get a single activiteit by ID
export const getActiviteit = async (id) => {
    try {
        await connectDB();
        const activiteit = await Activiteit.findById(id);
        return activiteit;
    } catch (error) {
        console.log('Error in getActiviteit:', error);
        throw new Error(error);
    }
};

// Add a new activiteit
export const addActiviteit = async (data) => {
    try {
        await connectDB();
        const newActiviteit = new Activiteit(data);
        await newActiviteit.save();
        return newActiviteit;
    } catch (error) {
        console.log('Error in addActiviteit:', error);
        throw new Error(error);
    }
};

// Update an existing activiteit
export const updateActiviteit = async (id, data) => {
    try {
        await connectDB();
        const updatedActiviteit = await Activiteit.findByIdAndUpdate(id, data, { new: true });
        return updatedActiviteit;
    } catch (error) {
        console.log('Error in updateActiviteit:', error);
        throw new Error(error);
    }
};

// Delete an activiteit
export const deleteActiviteit = async (id) => {
    try {
        await connectDB();
        await Activiteit.findByIdAndDelete(id);
        return { message: "Activiteit deleted successfully" };
    } catch (error) {
        console.log('Error in deleteActiviteit:', error);
        throw new Error(error);
    }
};

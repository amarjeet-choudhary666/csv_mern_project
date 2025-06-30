import mongoose from 'mongoose';
import {DB_NAME} from '../constants'


export const connectDB = async () => {
    try {

        const mongo_uri = process.env.MONGO_URI;
        if (!mongo_uri){
            throw new Error("MongoDB URI is not defined in environment variables");
        }
        const conectionInstances = await mongoose.connect(`${mongo_uri}/${DB_NAME}`)
        console.log(`MongoDB connected: ${conectionInstances.connection.host}`);
    } catch (error) {
        console.log("mongodb failed to conect", error);
        process.exit(1);
    }
}
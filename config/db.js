import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async  ()=>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to DB ${conn.connection.host}`)
    } catch (error) {
        console.log("Mongo DB error: " + error)
    }
}

export default connectDB;
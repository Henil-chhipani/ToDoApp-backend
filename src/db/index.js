import mongoose, { connect } from "mongoose";
import { DB_Name } from "../constant.js";
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    try {
    
        const connectInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_Name}`
        )
        console.log(`\n Mongodb connected DB host: ${connectInstance.connection.host}`);

    } catch (error) {
        console.log("error", error);
        process.exit(1);

    }   
}

export default connectDB
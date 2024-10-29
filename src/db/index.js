import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB=async () =>{
    try {
        const connectionI= await mongoose.connect(process.env.MONGO_DB)
        console.log(`mongodb connected !! ${connectionI.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}
export default connectDB
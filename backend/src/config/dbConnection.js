import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({override:true,quiet:true})

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully!!!")
    } catch (error) {
        console.log("error connecting with mongodb",error)
    }
}

export default connectDB
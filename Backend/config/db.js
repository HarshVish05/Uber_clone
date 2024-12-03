import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo DB is connected ${connection.host}`);
        
    } catch (error) {
        console.error(error.message)
    }
}
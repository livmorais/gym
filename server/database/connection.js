import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // MongoDB connection string
        const con = await mongoose.connect(process.env.MONGO_URL, {});

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;



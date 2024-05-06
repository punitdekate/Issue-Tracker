import mongoose from "mongoose";

const connectToMongoose = async() => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("Mongoose is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoose;
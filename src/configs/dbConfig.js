import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log('MongoDB has been connected...');
  } catch (error) {
    console.log(`MongoDB could not be connected! ${error}`);
  }
};

export { connectToDB };

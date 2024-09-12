import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}todo`);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("ERROR >>>>>", err);
  }
};

const conn = mongoose.connection;

conn.on("error", (err) => {
  console.log("ERROR >>>>>", err);
});

export default connectDB;

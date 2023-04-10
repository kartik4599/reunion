import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const connect = await mongoose.connect(uri);

    console.log(`DataBase is connected at ${connect.connection.host}`);

    // const session = connect.startSession;
  } catch (e) {
    console.log("database not connected");
    console.log(e);
  }
};

export default connectDB;

import { connect } from "mongoose";

const db_uri = process.env.DB_URI;

async function connectDB() {
  try {
    await connect(db_uri);
    console.log({
      response: true,
      message: "Database connection established successfully",
    });
  } catch (error) {
    console.log({ response: false, error: error.message });
  }
}

export default connectDB;

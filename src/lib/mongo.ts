import mongoose from "mongoose";

const url = process.env.MONGO_URI!;
const dbName = process.env.DATABASE!;
type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};
export async function connectToDatabase() {
  if (connection.isConnected) {
		console.log("Already connected.");
		return;
	}
  try {
    const con =await mongoose.connect(url, {
      dbName
    });
    console.log("Connected to MongoDB with Mongoose");
    
		connection.isConnected = con.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

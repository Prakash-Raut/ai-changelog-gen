import { connect } from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

export const dbConnect = async (): Promise<void> => {
	if (connection.isConnected) {
		console.log("Already connected to the database");
		return;
	}

	try {
		const db = await connect(process.env.MONGO_URI!);

		connection.isConnected = db.connections[0]?.readyState;

		console.log("Database connected successfully");
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1);
	}
};

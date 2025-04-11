import { dbConnect } from "./config/db.js";
import { createServer } from "./server.js";

const port = 5000;
const server = createServer();

server.listen(port, () => {
	dbConnect();
	console.log(`🚀 API running on http://localhost:${port}`);
});

import server from "./index.js";
import connectToMongoose from "./src/config/db.config.js";
import path from 'path';
import dotenv from 'dotenv';
const configPath = path.resolve("src", "config", ".env");
dotenv.config({ path: configPath });

server.listen(process.env.PORT_NO, () => {
    console.log(`Server is listening on port no ${process.env.PORT_NO}`);
    connectToMongoose();
});
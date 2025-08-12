import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { MONGODB_URI_LOCAL, MONGODB_URI_ONLINE } from "../constants.js";
import routes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const onlineUri = process.env.MONGODB_URI_ONLINE || MONGODB_URI_ONLINE;
const localUri = process.env.MONGODB_URI_LOCAL || MONGODB_URI_LOCAL;

try {
    await mongoose.connect(onlineUri);
    console.log('Connected to MongoDB Atlas (Online)');
} catch (error) {
    try {
        await mongoose.connect(localUri);
        console.log("Connected to Local MongoDB");
    } catch (localError) {
        console.error("Cannot to connect to any DB!");
        console.error();
        process.exit(1); // stop the app
    }
}

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.urlencoded( { extended: false }));

app.use

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Krasteva Art Studio');
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
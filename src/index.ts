import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Krasteva Art Studio');
});

app.listen(PORT, () => console.log(`Server is listeing on port ${PORT}`));
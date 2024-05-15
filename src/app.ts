import express, { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import path from "node:path";

const app = express();
const port = 3000;

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, DateTime.local().toFormat("dd/MM/yyyy HH:mm:ss"));
    next();
});

app.use(express.static("./public")); // middelware file statici

app.get("/", (req: Request, res: Response) => {
    res.send("Ciao");
});

// app.get("/eiffel.jpg", (req: Request, res: Response) => {
//     res.sendFile(path.join(process.cwd(), "eiffel.jpg"));
// });


app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
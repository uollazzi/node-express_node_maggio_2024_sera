import express, { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import path from "node:path";

const app = express();
const port = 3000;

// configurazione template engine
app.set("views", "./src/views");
app.set("view engine", "hbs");

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, DateTime.local().toFormat("dd/MM/yyyy HH:mm:ss"));
    let dataApertura = DateTime.local(2024, 5, 16, 18, 30);

    if (DateTime.local() < dataApertura) {
        res.send("Siamo ancora chiusi.");
    }
    else {
        next();
    }
});

app.use(express.static("./public")); // middelware file statici

app.use("/api", (req: Request, res: Response) => {
    res.send("API");
});

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.get("/errore", (req: Request, res: Response) => {
    throw new Error("Database irraggiungibile");
});

// app.get("/eiffel.jpg", (req: Request, res: Response) => {
//     res.sendFile(path.join(process.cwd(), "eiffel.jpg"));
// });

// 404 - ultimo middleware nella pipeline
app.use((req: Request, res: Response) => {
    res.status(404).send("Pagina non trovata.");
});

// 500
// specificarla proprio così: (err: Error, req: Request, res: Response, next: NextFunction)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
import express, { Express, Request, Response } from "express";
import combineroutes from "@routes/index";
import "@/schemas/index";


const app: Express = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

// database connection will be here
app.use(express.urlencoded({ extended: true }));

// routes will be here
app.use("/api/v1/", combineroutes);
app.get("/", (req: Request, res: Response) => {
  res.send("App is running successfully !");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
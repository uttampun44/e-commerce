import express, { Express, Request, Response } from "express";
import combineroutes from "@routes/index";


const app: Express = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/api/v1/", combineroutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running successfully !");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
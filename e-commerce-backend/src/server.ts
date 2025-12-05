import express, { Express, Request, Response } from "express";


const app: Express = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("E-commerce Backend is running!");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
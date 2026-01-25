import express, { Express } from "express";
import combineroutes from "@routes/index";
import "@/schemas/index";
import connectDB from "@/schemas/index";
import middleware from "@/middleware/middleware";
import cors from 'cors';
import { corsOptions } from "@/config/cors";
import chalk from "chalk";

const app: Express = express();
const PORT = process.env.PORT || 8000;

// cors middleware first
app.use(cors(corsOptions));

// middlewares
middleware(app);

// database connection is handled in schemas/index.ts
connectDB();

// routes will be here
app.use("/api/v1/", combineroutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running at http://localhost:${PORT}`));
});
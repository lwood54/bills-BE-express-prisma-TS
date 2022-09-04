import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(express.json());
app.use((req, _res, next) => {
  console.log({ PATH: req.path, METHOD: req.method });
  next(); // must do with middleware to advance process
});

// ROUTES
app.use("/user", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + Prisma + TypeScript");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

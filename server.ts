import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import billsRoutes from "./routes/bills";
import categoryRoutes from "./routes/categories";
import { logger } from "./middleware/logger";
import { restricted } from "./middleware/restricted";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(express.json());
app.use(logger);

// ROUTES
app.use("/", userRoutes);
app.use("/bills", restricted, billsRoutes);
app.use("/categories", restricted, categoryRoutes);
app.get("/test", (_, res) => {
  res.send("Test Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import billsRoutes from "./routes/bills";
import billCategoryRoutes from "./routes/billCategory";
import { logger } from "./middleware/logger";
import { restricted } from "./middleware/restricted";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(express.json());
app.use(logger);

// ROUTES
app.use("/user", userRoutes);
app.use("/bills", restricted, billsRoutes);
app.use("/bills/category", billCategoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import billsRoutes from "./routes/bills";
import billCategoryRoutes from "./routes/billCategory";

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
app.use("/bills", billsRoutes);
app.use("/bills/category", billCategoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

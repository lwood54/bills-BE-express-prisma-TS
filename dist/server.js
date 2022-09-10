"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const bills_1 = __importDefault(require("./routes/bills"));
const billCategory_1 = __importDefault(require("./routes/billCategory"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// MIDDLEWARE
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log({ PATH: req.path, METHOD: req.method });
    next(); // must do with middleware to advance process
});
// ROUTES
app.use("/user", user_1.default);
app.use("/bills", bills_1.default);
app.use("/bills/category", billCategory_1.default);
app.get("/", (_req, res) => {
    res.send("Express + Prisma + TypeScript");
});
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
//# sourceMappingURL=server.js.map
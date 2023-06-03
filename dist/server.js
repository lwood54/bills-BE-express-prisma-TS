"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const bills_1 = __importDefault(require("./routes/bills"));
const categories_1 = __importDefault(require("./routes/categories"));
const logger_1 = require("./middleware/logger");
const restricted_1 = require("./middleware/restricted");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// MIDDLEWARE
app.use(express_1.default.json());
app.use(logger_1.logger);
// ROUTES
app.use("/", user_1.default);
app.use("/bills", restricted_1.restricted, bills_1.default);
app.use("/categories", restricted_1.restricted, categories_1.default);
app.get("/test", (_, res) => {
    res.send("Test Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
//# sourceMappingURL=server.js.map
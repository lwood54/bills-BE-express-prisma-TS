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
const logger_1 = require("./middleware/logger");
const restricted_1 = require("./middleware/restricted");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// MIDDLEWARE
app.use(express_1.default.json());
app.use(logger_1.logger);
// ROUTES
app.use("/user", user_1.default);
app.use("/bills", restricted_1.restricted, bills_1.default);
app.use("/billCategories", restricted_1.restricted, billCategory_1.default);
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
//# sourceMappingURL=server.js.map
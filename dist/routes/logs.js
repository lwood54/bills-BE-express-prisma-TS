"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logsController_1 = require("../controllers/logsController");
const router = express_1.default.Router();
// ROOT: bills/category
// create bill category route
router.post("/create", logsController_1.createLog);
// get all bill categories for user
// router.get("/user/:id", getCategories);
// // update bill category
// router.put("/:id", updateCategory);
// // delete bill category
// router.delete("/:id", deleteCategory);
exports.default = router;
//# sourceMappingURL=logs.js.map
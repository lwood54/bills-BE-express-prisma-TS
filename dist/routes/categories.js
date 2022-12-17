"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
// ROOT: bills/category
// create bill category route
router.post("/create", categoryController_1.createCategory);
// get all bill categories for user
// router.get("/user/:id", getCategories);
// // update bill category
// router.put("/:id", updateCategory);
// // delete bill category
// router.delete("/:id", deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
// create category route
router.post("/create", categoryController_1.createCategory);
// get all categories by user
router.get("/list/:userId", categoryController_1.getCategories);
// get single category by id
router.get("/:id", categoryController_1.getCategory);
// update category
router.put("/:id", categoryController_1.updateCategory);
// delete category
router.delete("/:id", categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map
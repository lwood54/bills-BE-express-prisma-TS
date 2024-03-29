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
router.post("/create", categoryController_1.createBillCategory);
// get all bill categories for user
router.get("/user/:id", categoryController_1.getBillCategories);
// update bill category
router.put("/:id", categoryController_1.updateBillCategory);
// delete bill category
router.delete("/:id", categoryController_1.deleteBillCategory);
exports.default = router;
//# sourceMappingURL=billCategory.js.map
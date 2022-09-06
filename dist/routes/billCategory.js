"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billCategoryController_1 = require("../controllers/billCategoryController");
const router = express_1.default.Router();
// ROOT: /category
// create bill category route
router.post("/create", billCategoryController_1.createBillCategory);
// // get single bill route
// router.get("/:id", getBill);
// get all bill categories for user
// router.get("/user/:id", getBills);
// update bill category
// router.put("/:id", updateBill);
// delete bill category
// router.delete("/:id", deleteBill);
exports.default = router;
//# sourceMappingURL=billCategory.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billsController_1 = require("../controllers/billsController");
const router = express_1.default.Router();
// ROOT: /bills
// create bill route
router.post("/create", billsController_1.createBill);
// get single bill route
router.get("/:id", billsController_1.getBill);
// get all bills for user
router.get("/user/:id", billsController_1.getBills);
// // update bill
router.put("/:id", billsController_1.updateBill);
// // delete bill
router.delete("/:id", billsController_1.deleteBill);
exports.default = router;
//# sourceMappingURL=bills.js.map
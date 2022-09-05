"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billController_1 = require("../controllers/billController");
const router = express_1.default.Router();
// create bill route
router.post("/create", billController_1.createBill);
// get single bill route
// router.post("/:id", getBill);
exports.default = router;
//# sourceMappingURL=bill.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logsController_1 = require("../controllers/logsController");
const router = express_1.default.Router();
// ROOT: /logs
// create log
router.post("/create", logsController_1.createLog);
// get all logs by user
router.get("/list/:userId", logsController_1.getLogs);
// get single log
router.get("/:id", logsController_1.getLog);
// edit log
router.put("/:id", logsController_1.updateLog);
// delete log
router.delete("/:id", logsController_1.deleteLog);
exports.default = router;
//# sourceMappingURL=logs.js.map
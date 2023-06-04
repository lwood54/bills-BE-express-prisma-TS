import express from "express";
import {
  createLog,
  deleteLog,
  getLog,
  getLogs,
  updateLog,
} from "../controllers/logsController";

const router = express.Router();

// ROOT: /logs

// create log
router.post("/:userId/create", createLog);

// get all logs by user
router.get("/:userId/list", getLogs);

// get single log
router.get("/:id", getLog);

// edit log
router.put("/:id", updateLog);

// delete log
router.delete("/:id", deleteLog);

export default router;

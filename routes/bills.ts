import express from "express";
import {
  createBill,
  deleteBill,
  getBill,
  getBills,
  updateBill,
} from "../controllers/billsController";

const router = express.Router();

// ROOT: /bills

// create bill route
router.post("/create", createBill);

// get single bill route
router.get("/:id", getBill);

// get all bills for user
router.get("/user/:id", getBills);

// update bill
router.put("/:id", updateBill);

// delete bill
router.delete("/:id", deleteBill);

export default router;

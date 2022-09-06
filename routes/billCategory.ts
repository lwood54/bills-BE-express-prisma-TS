import express from "express";
import { createBillCategory } from "../controllers/billCategoryController";

const router = express.Router();

// ROOT: /category

// create bill category route
router.post("/create", createBillCategory);

// // get single bill route
// router.get("/:id", getBill);

// get all bill categories for user
// router.get("/user/:id", getBills);

// update bill category
// router.put("/:id", updateBill);

// delete bill category
// router.delete("/:id", deleteBill);

export default router;

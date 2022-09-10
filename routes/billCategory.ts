import express from "express";
import {
  createBillCategory,
  deleteBillCategory,
  getBillCategories,
  updateBillCategory,
} from "../controllers/billCategoryController";

const router = express.Router();

// ROOT: bills/category

// create bill category route
router.post("/create", createBillCategory);

// get all bill categories for user
router.get("/user/:id", getBillCategories);

// update bill category
router.put("/:id", updateBillCategory);

// delete bill category
router.delete("/:id", deleteBillCategory);

export default router;

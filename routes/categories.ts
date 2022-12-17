import express from "express";
import {
  createCategory,
  // deleteCategory,
  // getCategories,
  // updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

// ROOT: bills/category

// create bill category route
router.post("/create", createCategory);

// get all bill categories for user
// router.get("/user/:id", getCategories);

// // update bill category
// router.put("/:id", updateCategory);

// // delete bill category
// router.delete("/:id", deleteCategory);

export default router;

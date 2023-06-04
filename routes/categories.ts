import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

// create category route
router.post("/create", createCategory);

// get all categories by user
router.get("/list/:userId", getCategories);

// get single category by id
router.get("/:id", getCategory);

// update category
router.put("/:id", updateCategory);

// delete category
router.delete("/:id", deleteCategory);

export default router;

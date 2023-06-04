import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: "user is required" });
  }
  if (!title) {
    return res.status(400).json({ error: "category title is required" });
  }
  try {
    const category = await prisma.category.create({
      data: {
        title,
        userId,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    console.error("ERROR @categoryController create", error);
    res.status(500).json(error);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  try {
    const categories = await prisma.category.findMany({
      where: {
        user: { id: userId },
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("ERROR @categoryController getCategories", error);
    res.status(500).json(error);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    res.status(400).json({ error: "category not specified" });
  }
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    console.error("ERROR @categoryController getCategory", error);
    res.status(500).json(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "category title is required" });
  }
  if (!categoryId) {
    res.status(400).json({ error: "category not specified" });
  }
  const isCategoryMatch = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!isCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const updatedBill = await prisma.category.update({
      where: { id: categoryId },
      data: { title },
    });
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("ERROR @categoryController udpateCategory", error);
    res.status(500).json(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    res.status(400).json({ error: "id required" });
  }
  const isCategoryMatch = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!isCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error("ERROR @categoryController deleteCategory", error);
    res.status(500).json(error);
  }
};

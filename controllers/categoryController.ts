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
    const response = await prisma.category.create({
      data: {
        title,
        userId,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @categoryController create", error);
    return res.status(500).json({ error: "failed attempt creating category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // return { message: "list list list" };
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  try {
    const response = await prisma.category.findMany({
      where: {
        user: { id: userId },
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @categoryController getCategories", error);
    return res
      .status(500)
      .json({ error: "failed attempt to fetch categories" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ error: "category not specified" });
  }
  try {
    const response = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @categoryController getCategory", error);
    return res
      .status(500)
      .json({ error: "server error when getting categories" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "category title is required" });
  }
  if (!categoryId) {
    return res.status(400).json({ error: "category not specified" });
  }
  const isCategoryMatch = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!isCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const response = await prisma.category.update({
      where: { id: categoryId },
      data: { title },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @categoryController udpateCategory", error);
    return res.status(500).json({ error: "server error updating bill" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ error: "id required" });
  }
  const isCategoryMatch = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!isCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const response = await prisma.category.delete({
      where: { id: categoryId },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @categoryController deleteCategory", error);
    return res.status(500).json({ error: "server error deleting category" });
  }
};

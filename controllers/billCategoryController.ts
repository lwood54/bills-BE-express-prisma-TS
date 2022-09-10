import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createBillCategory = async (req: Request, res: Response) => {
  const { scale, title, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "user is required" });
  }
  if (!title) {
    return res.status(400).json({ error: "category title is required" });
  }
  try {
    const category = await prisma.billCategory.create({
      data: {
        scale,
        title,
        userId,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const getBillCategories = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "user is required" });
  }
  try {
    const billCategories = await prisma.billCategory.findMany({
      where: { userId },
    });
    res.status(200).json(billCategories);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateBillCategory = async (req: Request, res: Response) => {
  const billCategoryId = req.params.id;
  const { scale, title } = req.body;
  // if (!title) {
  //   res.status(400).json({ error: "category title is required" });
  // }
  if (!billCategoryId) {
    res.status(400).json({ error: "id required" });
  }
  const isBillCategoryMatch = await prisma.billCategory.findUnique({
    where: { id: billCategoryId },
  });
  if (!isBillCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const updatedBill = await prisma.billCategory.update({
      where: { id: billCategoryId },
      data: { scale, title },
    });
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteBillCategory = async (req: Request, res: Response) => {
  const billCategoryId = req.params.id;
  if (!billCategoryId) {
    res.status(400).json({ error: "id required" });
  }
  const isBillCategoryMatch = await prisma.billCategory.findUnique({
    where: { id: billCategoryId },
  });
  if (!isBillCategoryMatch) {
    return res.status(404).json({ error: "No matching category with that id" });
  }
  try {
    const deletedBillCategory = await prisma.billCategory.delete({
      where: { id: billCategoryId },
    });
    res.status(200).json(deletedBillCategory);
  } catch (error) {
    res.status(400).json({ error });
  }
};

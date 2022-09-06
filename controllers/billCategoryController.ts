import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createBillCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.billCategory.create({
      data: {
        title: "household",
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
  // res.json({ message: "creating bill category" });
};
export const getBillCategories = async (req: Request, res: Response) => {};
export const updateBillCategory = async (req: Request, res: Response) => {};
export const deleteBillCategory = async (req: Request, res: Response) => {};

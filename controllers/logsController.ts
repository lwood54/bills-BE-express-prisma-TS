import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createLog = async (req: Request, res: Response) => {
  const { amount, categoryId, scale, title, userId } = req.body;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  if (!title) {
    return res.status(400).json({ error: "log title is required" });
  }
  try {
    const newLog = await prisma.log.create({
      data: {
        amount: Number(amount),
        title,
        scale,
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json({ data: newLog });
  } catch (error) {
    console.error("ERROR @logsController create", error);
    res.status(500).json({ error });
  }
};

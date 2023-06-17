import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createLog = async (req: Request, res: Response) => {
  const { amount, categoryId, createdAt, scale, title } = req.body;
  const userId = req.params.userId;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  if (!title) {
    return res.status(400).json({ error: "log title is required" });
  }
  try {
    const response = await prisma.log.create({
      data: {
        amount: Number(amount),
        category: {
          connect: {
            id: categoryId,
          },
        },
        createdAt,
        scale,
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @logsController create", error);
    return res.status(500).json({ error: "server error creating log" });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  try {
    const response = await prisma.log.findMany({
      where: {
        user: { id: userId },
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @logsController getLogs", error);
    return res.status(500).json({ error: "server error getting logs" });
  }
};

export const getLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  if (!logId) {
    return res.status(400).json({ error: "no matching log" });
  }
  try {
    const response = await prisma.log.findUnique({
      where: {
        id: logId,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @logsController getLog", error);
    return res.status(500).json({ error: "server error getting log" });
  }
};

export const updateLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  const { amount, categoryId, createdAt, scale, title } = req.body;
  if (!logId) {
    return res.status(400).json({ error: "log not specified" });
  }
  const isLogMatch = await prisma.log.findUnique({
    where: { id: logId },
  });
  if (!isLogMatch) {
    return res.status(404).json({ error: "No matching log with that id" });
  }
  try {
    const response = await prisma.log.update({
      where: { id: logId },
      data: { amount, categoryId, createdAt, scale, title },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @logsController udpateLog", error);
    return res.status(500).json({ error: "server error updating log" });
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  if (!logId) {
    return res.status(400).json({ error: "id required" });
  }
  const isLogMatch = await prisma.log.findUnique({
    where: { id: logId },
  });
  if (!isLogMatch) {
    return res.status(404).json({ error: "No matching log with that id" });
  }
  try {
    const response = await prisma.log.delete({
      where: { id: logId },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @logsController deleteLog", error);
    return res.status(500).json({ error: "server error deleting log" });
  }
};

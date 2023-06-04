import { Request, Response } from "express";
import prisma from "../db/db.prisma";

export const createLog = async (req: Request, res: Response) => {
  const { amount, categoryId, scale, title } = req.body;
  const userId = req.params.userId;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  if (!title) {
    return res.status(400).json({ error: "log title is required" });
  }
  try {
    const createdLog = await prisma.log.create({
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
    res.status(200).json(createdLog);
  } catch (error) {
    console.error("ERROR @logsController create", error);
    res.status(500).json(error);
  }
};

export const getLogs = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(403).json({ error: "not authorized" });
  }
  try {
    const logs = await prisma.log.findMany({
      where: {
        user: { id: userId },
      },
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error("ERROR @logsController getLogs", error);
    res.status(500).json(error);
  }
};

export const getLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  if (!logId) {
    return res.status(400).json({ error: "no matching log" });
  }
  try {
    const log = await prisma.log.findUnique({
      where: {
        id: logId,
      },
    });
    res.status(200).json(log);
  } catch (error) {
    console.error("ERROR @logsController getLog", error);
    res.status(500).json(error);
  }
};

export const updateLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  const { amount, categoryId, scale, title } = req.body;
  if (!logId) {
    res.status(400).json({ error: "log not specified" });
  }
  const isLogMatch = await prisma.log.findUnique({
    where: { id: logId },
  });
  if (!isLogMatch) {
    return res.status(404).json({ error: "No matching log with that id" });
  }
  try {
    const updatedLog = await prisma.log.update({
      where: { id: logId },
      data: { amount, categoryId, scale, title },
    });
    res.status(200).json(updatedLog);
  } catch (error) {
    console.error("ERROR @logsController udpateLog", error);
    res.status(500).json(error);
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  const logId = req.params.id;
  if (!logId) {
    res.status(400).json({ error: "id required" });
  }
  const isLogMatch = await prisma.log.findUnique({
    where: { id: logId },
  });
  if (!isLogMatch) {
    return res.status(404).json({ error: "No matching log with that id" });
  }
  try {
    const deletedLog = await prisma.log.delete({
      where: { id: logId },
    });
    res.status(200).json(deletedLog);
  } catch (error) {
    console.error("ERROR @logsController deleteLog", error);
    res.status(500).json(error);
  }
};

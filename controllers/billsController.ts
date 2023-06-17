import { Request, Response } from "express";
import prisma from "../db/db.prisma";
import { billValidation } from "../utilties/validation";

export const createBill = async (req: Request, res: Response) => {
  const { balance, dayDue, rate, limit, amount, title } = req.body;
  const userId = req.params.userId;
  const validation = billValidation(
    "create",
    balance,
    dayDue,
    rate,
    limit,
    amount,
    title
  );
  if (validation !== "valid") {
    return res.status(400).json({ error: validation });
  }
  try {
    const response = await prisma.user.findUnique({ where: { id: userId } });
    if (!response) {
      return res.status(404).json({ error: "No user with that id" });
    }
  } catch (error) {
    console.error("ERROR @billsController createBill", error);
    return res.status(400).json({ error: "server error getting user" });
  }

  try {
    const response = await prisma.bill.create({
      data: {
        balance,
        dayDue,
        rate,
        limit,
        amount,
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (response) {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("ERROR @billsController create", error);
    return res.status(400).json({ error: "error creating bill" });
  }
};

// get all bills by user
export const getBills = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!response) {
      return res.status(400).json({ error: "unable to find user" });
    }
  } catch (error) {}
  try {
    const bills = await prisma.bill.findMany({ where: { userId } });
    return res.status(200).json(bills);
  } catch (error) {
    console.error("ERROR @billsController getBills", error);
    return res.status(400).json({ error: "error getting bills" });
  }
};

// get single bill
export const getBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  try {
    const bill = await prisma.bill.findUnique({ where: { id: billId } });
    return res.status(200).json(bill);
  } catch (error) {
    console.error("ERROR @billsController getBill", error);
    return res.status(400).json({ error: "error getting bill" });
  }
};

// update bill
export const updateBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  const { balance, dayDue, rate, limit, amount, title } = req.body;
  const validation = billValidation(
    "update",
    balance,
    dayDue,
    rate,
    limit,
    amount,
    title
  );
  if (validation !== "valid") {
    return res.status(400).json({ error: validation });
  }
  try {
    const response = await prisma.bill.findUnique({
      where: {
        id: billId,
      },
    });
    if (!response) {
      return res.status(404).json({ error: "unable to find bill" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server error finding bill" });
  }

  try {
    const response = await prisma.bill.update({
      where: {
        id: billId,
      },
      data: {
        balance,
        dayDue,
        rate,
        limit,
        amount,
        title,
      },
    });
    if (response) {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("ERROR @billsController updateBill", error);
    return res.status(400).json({ error: "error updating bill" });
  }
};

// delete bill
export const deleteBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  if (!billId) {
    return res.status(400).json({ error: "no bill id provided" });
  }
  const response = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
  });
  if (!response) {
    return res.status(404).json({ error: "unable to find bill" });
  }
  try {
    const response = await prisma.bill.delete({ where: { id: billId } });
    return res.status(200).json(response);
  } catch (error) {
    console.error("ERROR @billsController deleteBill", error);
    return res.status(400).json({ error: "error deleting bill" });
  }
};

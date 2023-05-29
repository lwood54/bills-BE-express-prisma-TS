import { Request, Response } from "express";
import prisma from "../db/db.prisma";
import { billValidation, getErrorResponse } from "../utilties/validation";

export const createBill = async (req: Request, res: Response) => {
  const { balance, dayDue, rate, limit, amount, title, userId } = req.body;

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
  const isUserMatch = await prisma.user.findUnique({ where: { id: userId } });
  if (!isUserMatch) {
    return res.status(404).json({ error: "No user with that id" });
  }
  try {
    console.info("test");
    const bill = await prisma.bill.create({
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
    if (bill) {
      return res.status(200).json(bill);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: getErrorResponse(error, "createBill") });
  }
};

// get all bills by user
export const getBills = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const isUserMatch = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (isUserMatch) {
    try {
      const bills = await prisma.bill.findMany({ where: { userId } });
      return res.status(200).json(bills);
    } catch (error) {
      return res
        .status(400)
        .json({ error: getErrorResponse(error, "getBills") });
    }
  } else {
    res.status(404).json({ error: "No user matches that id" });
  }
};

// get single bill by user
export const getBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  try {
    const bill = await prisma.bill.findUnique({ where: { id: billId } });
    res.status(200).json(bill);
  } catch (error) {
    return res.status(400).json({ error: getErrorResponse(error, "getBill") });
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
  const billMatch = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
  });
  if (!billMatch) {
    return res.status(404).json({ error: "unable to find bill" });
  }
  try {
    const bill = await prisma.bill.update({
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
    if (bill) {
      return res.status(200).json(bill);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: getErrorResponse(error, "updateBill") });
  }
};

// delete bill
export const deleteBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  if (!billId) {
    return res.status(400).json({ error: "no bill id provided" });
  }
  const billMatch = await prisma.bill.findUnique({
    where: {
      id: billId,
    },
  });
  if (!billMatch) {
    return res.status(404).json({ error: "unable to find bill" });
  }
  try {
    const bill = await prisma.bill.delete({ where: { id: billId } });
    return res.status(200).json(bill);
  } catch (error) {
    return res
      .status(400)
      .json({ error: getErrorResponse(error, "deleteBill") });
  }
};

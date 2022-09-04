import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const envSecret = process.env.SECRET;

const createToken = (_id: string) => {
  if (envSecret) {
    return jwt.sign({ _id }, envSecret, { expiresIn: "3d" });
  }
};

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "No user with that email" });
  }
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Incorrect password" });
    }
    const token = createToken(user.id);
    res.status(200).json({ email, token });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  const isUsed = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (isUsed) {
    return res.status(400).json({ message: "email is already in use" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    const token = createToken(user.id);
    if (user) {
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

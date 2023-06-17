import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/db.prisma";
import { restricted } from "../middleware/restricted";

const envSecret = process.env.SECRET;

const createToken = (_id: string) => {
  if (envSecret) {
    // return jwt.sign({ _id }, envSecret, { expiresIn: "3d" });
    return jwt.sign({ _id }, envSecret, { expiresIn: "1m" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  try {
    const response = await prisma.user.findUnique({ where: { username } });
    if (!response) {
      return res.status(404).json({ error: "No user with that username" });
    }
    if (response) {
      const isMatch = await bcrypt.compare(password, response.password);
      if (!isMatch) {
        return res.status(404).json({ error: "Incorrect password" });
      }
      const token = createToken(response.id);
      return res
        .status(200)
        .json({ username, userId: response.id, email: response.email, token });
    }
  } catch (error) {
    console.error("ERROR @userController login", error);
    return res.status(500).json({ error: "server error logging in" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, username, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "email required" });
  }
  if (!password) {
    return res.status(400).json({ error: "password required" });
  }
  if (!username) {
    return res.status(400).json({ error: "username required" });
  }
  try {
    const response = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (response) {
      return res.status(409).json({ message: "email is already taken" });
    }
  } catch (error) {
    console.error("ERROR @email lookup: ", error);
    return res.status(500).json({ error: "server error finding user" });
  }

  try {
    const response = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (response) {
      return res.status(409).json({ message: "username is already taken" });
    }
  } catch (error) {
    console.error("ERROR @username lookup: ", error);
    return res.status(500).json({ error: "server error getting user" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const response = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username,
      },
    });
    if (response) {
      const token = createToken(response.id);
      const { email, firstName, lastName, username } = response;
      return res.status(200).json({
        email,
        firstName,
        lastName,
        username,
        userId: response.id,
        token,
      });
    }
  } catch (error) {
    console.error("ERROR @user create: ", error);
    return res.status(500).json({ error: "server error creating user" });
  }
};

// use restrcited middleware function - don't pass next
export const userUpdate = async (req: Request, res: Response) => {
  restricted(req, res);
  const { email, firstName, lastName, username, password } = req.body;
  const userId = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "No user matches the credentials" });
  }

  try {
    const response = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (response) {
      return res.status(409).json({ message: "username is already taken" });
    }
  } catch (error) {
    console.error("ERROR @username lookup: ", error);
    return res.status(500).json({ error: "server error getting user" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password && (await bcrypt.hash(password, salt));

    const response = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username,
      },
    });
    if (response) {
      return res.status(200).json({
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
      });
    }
  } catch (error) {
    console.error("ERROR @userController update", error);
    return res.status(400).json({ error: "server error updating user" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  restricted(req, res);
  if (!req.payload) {
    return;
  }
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "user id required" });
  }

  try {
    const response = await prisma.user.findUnique({ where: { id: userId } });
    if (!response) {
      return res.status(404).json({ error: "User not found." });
    } else {
      const { email, username, firstName, lastName } = response;
      return res
        .status(200)
        .json({ email, username, firstName, lastName, userId });
    }
  } catch (error) {
    console.error("ERROR @userController getUser", error);
    return res.status(400).json({ error: "server error getting user" });
  }
};

// TODO: add isAdmin boolean to schema and allow admin to delete a user

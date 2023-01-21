import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/db.prisma";
import { restricted } from "../middleware/restricted";

const envSecret = process.env.SECRET;

const createToken = (_id: string) => {
  if (envSecret) {
    return jwt.sign({ _id }, envSecret, { expiresIn: "3d" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: "No user with that username" });
  }
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Incorrect password" });
    }
    const token = createToken(user.id);
    res
      .status(200)
      .json({ username, userId: user.id, email: user.email, token });
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
  const isEmailTaken = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (isEmailTaken) {
    return res.status(400).json({ message: "email is already taken" });
  }
  const isUsernameTaken = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (isUsernameTaken) {
    return res.status(400).json({ message: "username is already taken" });
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
        username,
      },
    });
    const token = createToken(user.id);
    if (user) {
      const { email, firstName, lastName, username } = user;
      return res
        .status(200)
        .json({ email, firstName, lastName, username, userId: user.id, token });
    }
  } catch (error) {
    res.status(400).json({ error });
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

  const isUsernameTaken = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (isUsernameTaken) {
    return res.status(400).json({ message: "username is already taken" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password && (await bcrypt.hash(password, salt));

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username,
      },
    });
    if (updatedUser) {
      return res.json(200).json({ username: user.username });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
  // if (user) {
  //   try {
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const updatedUser = await prisma.user.update({
  //   where: { id: userId },
  //   data: {
  //     email,
  //     firstName,
  //     lastName,
  //     password: hashedPassword,
  //     username,
  //   },
  // });
  // if (updatedUser) {
  //   return res.json(200).json({ username: user.username });
  // }
  //   } catch (error) {
  //     return res.json(400).json({ error: "something went wrong" });
  //   }
  // }
};

export const getUser = async (req: Request, res: Response) => {
  restricted(req, res);
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "user id required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    } else {
      const { email, username, firstName, lastName } = user;
      return res
        .status(200)
        .json({ email, username, firstName, lastName, userId });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

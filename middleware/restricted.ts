import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const restricted = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers["authorization"]?.split(" ")[1];
  const secret = process.env.SECRET;
  if (!authToken || !secret) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  jwt.verify(authToken, secret, (err, payload) => {
    if (err) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    req.payload = payload;
  });
  next();
};

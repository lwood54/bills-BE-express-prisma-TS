import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const restricted = (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const authToken = req.headers["authorization"]?.split(" ")[1];
  const secret = process.env.SECRET;
  if (!authToken || !secret) {
    console.error("restricted - missing authToken or secret");
    return res.status(400).json({ error: "Unauthorized" });
  }
  jwt.verify(authToken, secret, (err, payload) => {
    if (err) {
      console.error("restricted - error with verification", err);
      return res.status(400).json({ error: "Unauthorized - expired token" });
    }
    req.payload = payload;
  });
  if (next) {
    next();
  }
};

import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log({ PATH: req.path, METHOD: req.method });
  next(); // must do with middleware to advance process
};

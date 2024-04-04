import express, { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decodedUser = Jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

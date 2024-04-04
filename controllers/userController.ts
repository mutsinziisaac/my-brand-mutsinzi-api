import express, { Request, Response, NextFunction } from "express";
import User from "../models/users";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  res.status(200).json({ message: "user created successfully" });
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Create a payload containing only the username
    const payload = { username: user.username, userId: user._id };

    const accessToken = Jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    res.json({ accessToken: accessToken });
  })(req, res, next); // <- Call the passport.authenticate function
};

export const usersList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find().exec();
  res.status(200).json(users);
};

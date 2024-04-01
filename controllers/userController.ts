import express, { Request, Response, NextFunction } from "express";
import User from "../models/users";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = new User({
    username: req.body.name,
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

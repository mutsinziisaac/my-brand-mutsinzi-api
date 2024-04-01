import express, { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = new Comment({
    text: req.body.text,
  });

  await comment.save();
  res.status(200).json({ message: "comment saved successfully" });
};

export const commentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allComments = await Comment.find().exec();
  res.status(200).json(allComments);
};

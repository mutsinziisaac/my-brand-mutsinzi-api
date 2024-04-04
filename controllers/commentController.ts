import express, { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
import Blog from "../models/blog";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.id;
  const { text } = req.body;
  const username = (req.user as { username: string }).username;

  const comment = new Comment({
    text,
    user: username,
  });

  const savedComment = await comment.save();

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (!Array.isArray(blog.comments)) {
    // If blog.comments is not an array, initialize it as an empty array
    blog.comments = [];
  }

  blog.comments.push(savedComment._id);

  await blog.save();
  res.status(200).json({ message: "comment saved successfully" });
};

export const commentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allComments = await Comment.find({}, "text username")
    .populate("user")
    .exec();
  res.status(200).json(allComments);
};

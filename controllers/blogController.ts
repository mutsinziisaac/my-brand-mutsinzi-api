import express, { Request, Response, NextFunction } from "express";
import Blog from "../models/blog";

export const blogList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allBlogs = await Blog.find().populate("comments").exec();
  res.status(200).json(allBlogs);
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    comments: req.body.comments,
  });

  await blog.save();
  res.status(200).json({ message: "blog saved successfully" });
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const { title, description, image } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    title,
    description,
    image,
  });

  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json({ message: "Blog updated" });
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Blog deleted successfully" });
};

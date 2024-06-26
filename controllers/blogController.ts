import express, { Request, Response, NextFunction, json } from "express";
import Blog from "../models/blog";
import cloudinary from "../cloudinary";

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
  const { title, description, comments } = req.body;
  let image;

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      image = result.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).json({ message: "Error uploading image" });
    }
  }

  // Create the blog with the image URL
  const blog = new Blog({ title, description, image, comments });

  try {
    // Save the blog to the database
    await blog.save();
    res.status(200).json({ message: "Blog saved successfully" });
  } catch (error) {
    console.error("Error saving blog to database:", error);
    res.status(500).json({ message: "Error saving blog" });
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  let image;

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    } catch (error) {
      console.error("error uploading image to cloudinary:", error);
    }
  }

  const { title, description } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    title,
    description,
    image,
  });

  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json({ message: "Blog updated", updateBlog });
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Blog deleted successfully" });
};

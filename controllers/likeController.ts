import { Request, Response } from "express";
import Like from "../models/like";
import Blog from "../models/blog";

export const likeBlog = async (req: Request, res: Response) => {
  try {
    const username = (req.user as { username: string }).username;
    const blogId = req.params.id;

    const existingLike = await Like.findOne({ user: username, blog: blogId });

    if (existingLike) {
      await existingLike.deleteOne();
      await Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });
      return res.status(200).json({ message: "Blog unliked successfully" });
    }

    const newLike = new Like({ user: username, blog: blogId });
    await newLike.save();
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });
    res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

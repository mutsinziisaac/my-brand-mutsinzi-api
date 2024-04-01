import express, { Request, Response, NextFunction } from "express";
import {
  blogList,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController";
import { commentList, createComment } from "../controllers/commentController";
import { createUser } from "../controllers/userController";
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).send("api is working");
});

router.get("/blogs", blogList);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

router.get("/comments", commentList);
router.post("/comments", createComment);

router.post("/sign-up", createUser);

export default router;

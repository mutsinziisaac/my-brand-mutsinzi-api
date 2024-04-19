import upload from "../multer";

import express, { Request, Response, NextFunction } from "express";
import {
  blogList,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController";
import { commentList, createComment } from "../controllers/commentController";
import {
  createUser,
  loginUser,
  usersList,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  createMessage,
  deleteMessage,
  messageList,
} from "../controllers/messageController";
import { likeBlog } from "../controllers/likeController";
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).send("api is working");
});
//blog routes
router.get("/blogs", blogList);
router.post("/blogs", upload.single("image"), createBlog);
router.put("/blogs/:id", authenticateToken, updateBlog);
router.delete("/blogs/:id", authenticateToken, deleteBlog);

//like routes
router.post("/blogs/:id/like", authenticateToken, likeBlog);

//comment routes
router.get("/comments", authenticateToken, commentList);
router.post("/blogs/:id/comments", authenticateToken, createComment);

//message routes
router.get("/messages", authenticateToken, messageList);
router.post("/messages", createMessage);
router.delete("/messages/:id", authenticateToken, deleteMessage);

//user routes
router.post("/sign-up", createUser);
router.post("/log-in", loginUser);
router.get("/users", authenticateToken, usersList);

export default router;

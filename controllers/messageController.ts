import express, { Request, Response, NextFunction } from "express";
import Message from "../models/message";

export const messageList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allMessages = await Message.find().exec();
  res.status(200).json(allMessages);
};

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await message.save();
  res.status(200).json({ message: "message sent successfully" });
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "message deleted successfully" });
};

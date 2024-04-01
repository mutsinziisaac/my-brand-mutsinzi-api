import mongoose, { Schema, Document, Types } from "mongoose";

interface IComment extends Document {
  text: string;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
});

export default mongoose.model<IComment>("Comment", CommentSchema);

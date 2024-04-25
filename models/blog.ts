import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  description: string;
  image: string;
  comments?: string[];
  likes: number;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
});

export default mongoose.model<IBlog>("Blog", BlogSchema);

import mongoose, { Schema, Document } from "mongoose";

interface ILike extends Document {
  user: string;
  blog: string;
}

const LikeSchema: Schema = new Schema({
  user: { type: String, ref: "User", required: true },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

export default mongoose.model<ILike>("Like", LikeSchema);

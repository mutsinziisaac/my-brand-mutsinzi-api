import mongoose, { Schema, Document, mongo } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

export default mongoose.model<IUser>("User", UserSchema);

import mongoose from "mongoose";
import Todo from "./todo.schema.js"; // Import Todo schema

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }], // Reference to Todo schema
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;

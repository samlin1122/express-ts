import { inRange } from "lodash";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  // age: {
  //   type: Number,
  //   min: 1,
  //   max: 100,
  //   // validate: {
  //   //   validator: (e: any) => e % 2 === 0,
  //   //   message: (e: any) => `${e} is not an event number`,
  //   // },
  // },
  email: { type: String, required: true, lowercase: true },
  password: {
    type: String,
    required: true,
    // min: 1,
    // max: 100,
    // validate: {
    //   validator: (e: any) => inRange(e.length, 8, 16),
    //   message: (e: any) => `${e} is not an event number`,
    // },
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.model("users", userSchema);
// collection 名稱規則
// 1. 開頭強制小寫
// 2. 強制加上 s
// eg: Room > rooms

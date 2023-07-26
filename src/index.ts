import mongoose from "mongoose";
import server from "./server";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const port = parseInt(process.env.PORT || "8081");

mongoose.connect("mongodb://localhost:27017/hex").then((res) => {
  console.log("連線成功");
});

// 程式出現重大錯誤時
process.on("uncaughtException", (err) => {
  console.error("uncaughtException");
  console.error(err);
  process.exit(1);
});

// 未捕捉到的catch
process.on("unhandledRejection", (err, promise) => {
  console.error("未捕捉到的 rejection:", promise, "原因", err);
});

server.listen(port, () => {
  console.log(`Express with Typescript! http://localhost:${port}`);
});

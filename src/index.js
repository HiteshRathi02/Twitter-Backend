import express from "express";
import { connectDB, PORT } from "./config/index.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",router);



app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT}`
  );
  connectDB();
});

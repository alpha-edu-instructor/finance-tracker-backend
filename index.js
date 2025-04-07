import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import db from "./config/db.js";

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);

app.listen(PORT, async () => {
  try {
    await db.sync();
    console.log("База данных подключена!");
  } catch (error) {
    console.log(
      "Не получилось подключится к базе данных\n" + "Error: " + error.message
    );
  }
  console.log(`Сервер запущем на http://localhost:${PORT}`);
});

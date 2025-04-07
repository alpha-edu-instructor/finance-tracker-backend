import express from "express";
import TransactionController from "../controllers/transaction.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authUser, TransactionController.getAll);
router.post("/", authUser, TransactionController.create);
router.delete("/:id", authUser, TransactionController.remove);

export default router;

import { Op } from "sequelize";
import Transaction from "../models/Transaction.js";

class TransactionController {
  async getAll(req, res) {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const transactions = await Transaction.findAll({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        },
        order: [["date", "DESC"]]
      });

      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { type, title, amount, date } = req.body;

      const newTransaction = await Transaction.create({
        user_id: req.userId,
        type,
        title,
        amount,
        date
      });

      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          id: req.params.id,
          user_id: req.userId
        }
      });

      if (!transaction) {
        return res.status(404).json({ error: "Транзакция не найдена" });
      }

      await transaction.destroy();
      res.json({ message: "Tранзакция удалена" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TransactionController();

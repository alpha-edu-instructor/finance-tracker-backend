import Transaction from "../models/Transaction.js";

class TransactionController {
  async getAll(req, res) {
    try {
      const transactions = await Transaction.findAll({
        where: { user_id: req.userId },
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
        user_id: req.user.id,
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

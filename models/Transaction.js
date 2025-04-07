import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const Transaction = db.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  {
    tableName: "transactions",
    timestamps: true
  }
);

User.hasMany(Transaction, { foreignKey: "user_id" });
Transaction.belongsTo(User, { foreignKey: "user_id" });

export default Transaction;

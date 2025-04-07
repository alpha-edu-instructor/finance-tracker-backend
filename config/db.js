import { Sequelize } from "sequelize";
import "dotenv/config";

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false
});

export default sequelize;

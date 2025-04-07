import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashPassword, checkValidPassword } from "../services/bcrypt.js";

class AuthController {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const emailAlreadyExists = await User.findOne({ where: { email } });
      if (emailAlreadyExists) {
        return res
          .status(409)
          .json({ message: "Данная электронная почта занята!" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword
      });

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Неверный e-mail или пароль" });
      }

      const passwordIsValid = await checkValidPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(404).json({ message: "Неверный e-mail или пароль" });
      }

      const token = jwt.sign({ userId: user.id }, "secretkey", {
        expiresIn: "1m"
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();

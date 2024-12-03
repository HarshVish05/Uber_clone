import { userModel } from "../models/user.model.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);

  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = req.body;

  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await userModel.hashPassword(password);

    user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({ token, user });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

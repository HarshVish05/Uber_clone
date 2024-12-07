import { validationResult } from "express-validator";
import { captainModel } from "../models/captain.model.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, numberplate, vehicleType, capacity },
  } = req.body;

  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !numberplate ||
    !vehicleType ||
    !capacity
  ) {
    throw new Error("All fields are required");
  }

  try {
    let captain = await captainModel.findOne({ email });
    if (captain)
      return res.status(400).json({ message: "Captain already exists" });

    const hashedPassword = await captainModel.hashPassword(password);

    captain = await captainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color,
        numberplate,
        vehicleType,
        capacity,
      },
    });

    const token = await captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

import { validationResult } from "express-validator";
import { captainModel } from "../models/captain.model.js";
import { blacklistedTokenModel } from "../models/blacklist.model.js";

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

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await captain.generateAuthToken();
    
    res.cookie('token', token)

    res.status(200).json({ token, captain });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCaptainProfile = async(req, res) => {
    try {
        const captain = req.captain

        res.status(201).json(captain)
        
    } catch (error) {
        res.status(500).send( "Server error")
    }
}


export const logoutCaptain = async(req, res) =>{
    try {
        
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        await blacklistedTokenModel.create({ token })
        
        res.clearCookie('token')
        res.status(201).json({ message: "Logged out successfully" })
        
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

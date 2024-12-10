import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { blacklistedTokenModel } from "../models/blacklist.model.js";
import { captainModel } from "../models/captain.model.js";

export const authMiddlewareUser = async (req, res, next) => {
  // we can get token from either cookies or from headers. For cookies we have written a line in loginUser in controller 
  // so if we want to use cookies just uncomment the line in controller
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "User not authorized" });

  // check if the token is blacklisted
  const isBlacklisted = await blacklistedTokenModel.findOne({ token })

  if(isBlacklisted){
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


export const authMiddlewareCaptain = async(req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: "User not authorized" });

    const isBlacklisted = await blacklistedTokenModel.findOne({ token })
    if(isBlacklisted){
      return res.status(401).json({ message: "Unauthorized" })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const captain = await captainModel.findById(decoded._id)

      req.captain = captain
      
      next()
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }

}

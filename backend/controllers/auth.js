import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    })

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if(!user) return next(createError(404, "Incorrect password or username"));

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) return next(createError(400, "Incorrect password or username"));

    
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);
    const { password, isAdmin, ...others } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(others);
  } catch (err) {
    next(err);
  }
}
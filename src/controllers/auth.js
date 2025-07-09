import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //check body
    console.log(req.body);
    const { email, userName, password } = req.body;

    //check email in db
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(user);

    if (user) {
      createError(400, "Email already in use");
    }

    //encrypt password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    //save to prisma db
    const result = await prisma.user.create({
      data: {
        email,
        userName,
        password: hashPassword,
      },
    });
    res.json({ message: `Register ${result.userName} Successful` });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    //check body
    const { email, password } = req.body;

    //check email
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) {
      createError(400, "Email or password invalid");
    }

    //check password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      createError(400, "Email or password is invalid");
    }

    //generate token
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: `Welcome back ${user.userName}`,
      payload,
      token,
    })
  } catch (error) {
    next(error);
  }
};

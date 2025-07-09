import { createError } from "../utils/createError";
import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    //check header
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing!");
    }

    //Split token
    const token = header.split(" ")[1];

    //verify token
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Token is invalid!");
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};

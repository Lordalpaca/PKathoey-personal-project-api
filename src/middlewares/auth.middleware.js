import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    //check header
    const header = req.headers.authorization;
    console.log("1. Authorization Header:", header);
    if (!header) {
      return next(createError(401, "Token is missing!"));
    }

    //Split token
    const token = header.split(" ")[1];
    console.log("2. Extracted Token:", token);
     if (!token) {
        return next(createError(401, "Token is malformed!"));
    }

    console.log("3. JWT Secret:", process.env.JWT_SECRET);

    //verify token
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      console.log("4. Inside jwt.verify callback.");
      console.log("5. Error from jwt.verify:", error);
      console.log("6. Decoded token (payload):", decode);
      if (error) {
        return next(createError(401, "Token is invalid or expired!"));
      }
      req.user = decode;
      console.log("7. req.user set to:", req.user);
      next();
    });
  } catch (error) {
    console.log("8. Caught synchronous error in authCheck:", error);
    next(error);
  }
};

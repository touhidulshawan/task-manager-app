// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel";
//
// const userAuth =
//   () => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = req.header("Authorization")!.replace("Bearer ", "");
//       const decoded = jwt.verify(token, "mysecretkey") as any;
//       const user = await User.findOne({
//         _id: decoded._id,
//         "tokens.token": token,
//       });
//
//       if (!user) throw new Error();
//
//       req.token = token;
//       req.user = user;
//       return next();
//     } catch (error: any) {
//       res.status(401).send({ error: "Please authenticate" });
//     }
//   };
//
// export default userAuth;

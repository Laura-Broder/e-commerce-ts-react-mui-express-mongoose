import UserModel, { I_UserDocument } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export async function register(user: I_UserDocument): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: I_UserDocument) {
  try {
    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new Error("email of user is not correct");
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign(
        { _id: foundUser._id?.toString(), email: foundUser.email },
        config.jwt.secret,
        {
          expiresIn: "2 days",
        }
      );

      return {
        user: { _id: foundUser._id?.toString(), email: foundUser.email },
        token: token,
      };
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    throw error;
  }
}

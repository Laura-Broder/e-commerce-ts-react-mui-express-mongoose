import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel, { I_UserDocument } from '../models/UserModel';
import { AppError, HttpCode } from '../types/AppError';

export async function register(user: I_UserDocument) {
  try {
    const newUser = await UserModel.create(user);
    const token = jwt.sign(
      { _id: newUser._id?.toString(), email: newUser.email },
      config.jwt.secret,
      {
        expiresIn: "2 days",
      }
    );

    return {
      user: { _id: newUser._id?.toString(), email: newUser.email },
      token: token,
    };
  } catch (error) {
    throw error;
  }
}

export async function login(user: I_UserDocument) {
  try {
    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User does not exist",
      });
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
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Wrong Password",
      });
    }
  } catch (error) {
    throw error;
  }
}

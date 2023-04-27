import { Document, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import { I_Product } from "./ProductModel";

const saltRounds = 8;

export interface I_UserDocument extends Document {
  email: string;
  password: string;
  cart: Types.DocumentArray<I_Product>;
  wishlist: Types.DocumentArray<I_Product>;
}

const UserSchema: Schema<I_UserDocument> = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  cart: [{ type: Types.ObjectId, unique: true }],
  wishlist: [{ type: Types.ObjectId, unique: true }],
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const UserModel = model<I_UserDocument>("User", UserSchema);

export default UserModel;

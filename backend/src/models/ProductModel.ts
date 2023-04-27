import { Document, Schema, Types, model } from "mongoose";

export interface I_Product extends Document {
  _id: Types.ObjectId;
  name: string;
}

const ProductSchema: Schema<I_Product> = new Schema({
  name: { type: String, unique: true },
});

const ProductModel = model<I_Product>("product", ProductSchema);

export default ProductModel;

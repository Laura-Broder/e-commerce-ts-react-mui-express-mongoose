import { Document, model, Schema, Types } from 'mongoose';

export interface I_Product extends Document {
  _id: Types.ObjectId;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductSchema: Schema<I_Product> = new Schema({
  name: { type: String, unique: true },
  imageUrl: { type: String },
  price: { type: Number },
});

const ProductModel = model<I_Product>("product", ProductSchema);

export default ProductModel;

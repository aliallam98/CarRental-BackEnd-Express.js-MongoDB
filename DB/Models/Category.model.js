import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, unique: true },
    description: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true, lowercase: true },
    image: { secure_url: { type: String }, public_id: { type: String } },
  },
  { timestamps: true }
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;

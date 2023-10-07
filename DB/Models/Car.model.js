import { Schema, Types, model } from "mongoose";

const carSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    slug: { type: String, required: true, lowercase: true },
    color: { type: String, required: true },
    modelYear: { type: Number, required: true },
    seater: { type: Number, required: true },
    powerHourse: { type: String, required: true },
    KilometersIncluded: { type: String, required: true },
    rentalCost: { type: String, required: true },
    relatedVideo: {},
    carSilderImages: [
      { secure_url: { type: String }, public_id: { type: String } },
    ],
    carCardImage: { secure_url: { type: String }, public_id: { type: String } },
    categoryId: { type: Types.ObjectId, required: true ,ref:"Category"},
    brandId: { type: Types.ObjectId, required: true ,ref:"Brand"},
  },
  { timestamps: true }
);

const carModel = model("Car", carSchema);

export default carModel;

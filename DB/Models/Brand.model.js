import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, unique: true },
    slug: { type: String, required: true, lowercase: true },
    image: { secure_url: { type: String }, public_id: { type: String } },
  },
  { timestamps: true , toJSON:{virtuals:true} },
);

brandSchema.virtual("Cars",{
  localField : "_id" ,
  foreignField :"brandId",
  ref:"Car" 
})

const brandModel = model("Brand", brandSchema);

export default brandModel;

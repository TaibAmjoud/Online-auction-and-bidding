import mongoose from "mongoose";

const bidingSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
    },
    bidingPrice: {
      type: Number,
      required: true,
    },
    itemRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Biding = mongoose.model("Biding", bidingSchema);

export default Biding;

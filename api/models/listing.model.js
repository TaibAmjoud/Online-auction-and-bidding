import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    reservedPrice: {
      type: Number,
      required: true,
    },
    auctionStartingDate: {
      type: Date,
      default: Date.now,
    },
    auctionEndingDate: {
      type: Date,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;

import Biding from "../models/biding.model.js";
import { errorHandler } from "../utils/error.js";

export const createBiding = async (req, res, next) => {
  try {
    const biding = await Biding.create(req.body);
    return res.status(201).json(biding);
  } catch (error) {
    next(error);
  }
};

export const getBid = async (req, res, next) => {
  try {
    const highestBid = await Biding.find({ itemRef: req.params.id })
      .select("bidingPrice")
      .sort({ bidingPrice: -1 })
      .limit(1);

    return res.status(200).json(highestBid);
  } catch (error) {
    next(error);
  }
};

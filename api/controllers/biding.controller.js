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

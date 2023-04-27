import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import * as userServices from "../services/userServices";
import { getErrorMessage } from "../middleware/errorHandler";

export const loginUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    try {
      const foundUser = await userServices.login(req.body);
      res.status(200).send(foundUser);
      res.send(`foundUser: ${foundUser}`);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }
};

export const registerUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    try {
      const newUser = await userServices.register(req.body);
      res.status(201).send(newUser);
      res.send(`created a new user: ${newUser}`);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }
};

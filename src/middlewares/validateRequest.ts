import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validate =
  (anySchema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await anySchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      log.error(err);
      res.status(400).send(err.error);
    }
  };

export default validate;

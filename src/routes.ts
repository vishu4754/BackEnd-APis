import { Router } from 'express';

const routeHandler = Router();

routeHandler.use('/v1/tours', (req, res, next) => {
  res.status(200).json({
      message: 'Hi there'
  });
  next();
});

export default routeHandler;
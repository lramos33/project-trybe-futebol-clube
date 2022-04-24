import { Request, Response, NextFunction } from 'express';

const error = (err: { message: string; }, _req: Request, res: Response, _next: NextFunction) => {
  const { message } = err;
  return res.status(500).json({ message });
};

export default error;

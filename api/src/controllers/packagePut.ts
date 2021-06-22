import { Request, Response, NextFunction } from 'express';
import * as PackageService from '../services/package.put.service';

// Middleware for validating given vouchers using RegEx
export const validateVoucher = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const message = PackageService.validateVoucher(req.params.voucher);

  if (message) {
    return res.status(400).json({ message: message });
  }
  return next();
};

// Sets Packages as scanned if they are valid and found
export const scanPackage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.scanPackage(req.params.voucher);

    //If no rows were affected there is no package with such voucher

    return res
      .status(results.status as number)
      .json({ message: results.message as string });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Sets packages in route to delivery
export const setEnRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PackageService.setEnRoute(req.params.voucher);
    return res
      .status(result.status as number)
      .json({ message: result.message as string });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Sets packages as delivered
export const setDelivered = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PackageService.setDelivered(req.params.voucher);

    return res
      .status(result.status as number)
      .json({ message: result.message as string });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

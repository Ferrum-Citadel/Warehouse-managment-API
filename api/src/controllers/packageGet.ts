import { Request, Response } from 'express';
import * as PackageService from '../services/package.get.service';

// Controller that returns all packages from database
export const getPackages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.getPackages();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controller that returns only  scanned packages
export const getScanned = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.getScanned();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  unscanned packages
export const getUnscanned = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.getUnscanned();

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  packages en route
export const getEnRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.getEnRoute();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  delivered packages
export const getDelivered = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await PackageService.getDelivered();

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

//Controller that finds a package status by voucher
export const getStatusOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const message = await PackageService.getStatusOne(req.params.voucher);
    return res.status(200).json({ message: message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for getting all the information projected on the front-end
export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const statusArr = await PackageService.getAll();
    if (statusArr.length) {
      return res.status(200).json({ statusArr });
    } else {
      return res.status(400).json({ message: 'No stock' });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      err,
    });
  }
};

// Controller that returns cluster that the package belongs to
export const getCluster = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PackageService.getCluster(req.params.voucher);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

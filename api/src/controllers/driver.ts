import { Request, Response } from 'express';
import * as DriverService from '../services/drivers.service';

// Returns all drivers
export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await DriverService.getAll();
    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Returns the packages that the given driver needs to pick up
export const getAssignedPackages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await DriverService.getAssignedPackages(req.params.name);

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Returns the cluster assigned to the given driver
export const getAssignedCluster = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await DriverService.getAssignedCluster(req.params.name);

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

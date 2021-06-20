import { Request, Response } from 'express';
import * as stateService from '../services/state.service';
//Controller that resets the database state
export const resetState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await stateService.resetState();
    return res.status(200).json({ message: 'Project state was reset' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

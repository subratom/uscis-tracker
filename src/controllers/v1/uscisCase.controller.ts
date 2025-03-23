import { Request, Response, NextFunction } from "express";
import axios from "axios";

import { fetchUSCISAccessToken } from "./uscisAuth.controller";
import { saveCaseToDatabase } from "../../services/uscisCase.service";
import { LoggerManager } from "../../common/logger/LoggerManager";
export const fetchCaseStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const receiptNumber = req.params.receiptNumber.toUpperCase();
    if (receiptNumber.length !== 13) {
      LoggerManager.error(`Invalid receipt number: ${receiptNumber}`);
      return res.status(400).json({ error: 'Invalid receipt number' });
    }
    const token = await fetchUSCISAccessToken();
    LoggerManager.info(`Fetching case status for : ${receiptNumber}`);

    const response = await axios.get(`https://api-int.uscis.gov/case-status/${receiptNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status !== 200 || response === undefined) {
      LoggerManager.error(`Failed to fetch case status for: ${receiptNumber}`);
      throw new Error('Failed to fetch case status');
    }

    saveCaseToDatabase(response.data);

    const status = response.data.status;
    const details = response.data.details;
    const fetchedAt = new Date();

    res.status(200).json({ message: 'Status fetched and stored' });
  } catch (error) {
    LoggerManager.error(`Fetching case status : ${error}`);
    next(error);
  }
};


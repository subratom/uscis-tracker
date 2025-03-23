import axios from "axios";
import { Request, Response, NextFunction } from "express";

import { LoggerManager } from "../../common/logger/LoggerManager";
import { fetchUSCISAccessToken } from "./uscisAuth.controller";
import { getPostgresDataSource } from "../../db/postgres";

const fetchCaseStatusHistory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const receiptNumber = req.params.receiptNumber.toUpperCase();
        if (receiptNumber.length !== 13) {
            return res.status(400).json({ error: 'Invalid receipt number' });
        }

        LoggerManager.info(`Fetching case status history for: ${receiptNumber}`);

        // PostgreSQL case history endpoint
        //res.status(200).json({ message: 'PostgreSQL history endpoint not implemented' });
        // try {
        //   const pgRepo = getPostgresDataSource().getRepository(CasePostgres);

        //   const history = await pgRepo.find({
        //     where: { receiptNumber: req.params.receiptNumber.toUpperCase() },
        //     order: { fetchedAt: 'DESC' },
        //   });

        //   res.json(history);
        // } catch (error) {
        //   console.error('PostgreSQL history error:', error);
        //   res.status(500).json({ error: 'Failed to fetch PostgreSQL case history' });
        // }

        res.status(200).json({ message: 'Status fetched and stored' });
    } catch (error) {
        LoggerManager.error(`Error fetching case status history:, ${error}`);
        next(error);
    }
};

export {fetchCaseStatusHistory};
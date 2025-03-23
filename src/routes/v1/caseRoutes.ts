import { Router, Request, Response } from 'express';
import { fetchCaseStatus } from '../../controllers/v1/uscisCase.controller';
import { fetchCaseStatusHistory } from '../../controllers/v1/uscisCaseHistory.controller';
import axios from 'axios';
import * as cheerio from 'cheerio';

//import CaseMongo from '../models/CaseMongo';
//import { getPostgresDataSource } from '../db/postgres';
//import { CasePostgres } from '../models/CasePostgres';

const router = Router();

router.get('/status/:receiptNumber', fetchCaseStatus);
router.get('/history/:receiptNumber', fetchCaseStatusHistory);

export default router;

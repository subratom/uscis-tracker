import { Router } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

//import CaseMongo from '../models/CaseMongo';
//import { getPostgresDataSource } from '../db/postgres';
//import { CasePostgres } from '../models/CasePostgres';

const router = Router();

// Scrape and store case status in Mongo + Postgres
router.get('/status/:receiptNumber', async (req, res) => {
  const receiptNumber = req.params.receiptNumber.toUpperCase();

  try {
    if (receiptNumber.length !== 13) {
      return res.status(400).json({ error: 'Invalid receipt number' });
    }
    console.log('Fetching case status for:', receiptNumber);
    // const response = await axios.get('https://egov.uscis.gov/casestatus/mycasestatus.do', {
    //   params: { appReceiptNum: receiptNumber },
    // });

    // const $ = cheerio.load(response.data);

    // const status = $('.current-status-sec').text().trim();
    // const details = $('.appointment-sec').text().trim();
    // const fetchedAt = new Date();

    // MongoDB History
    // const mongoEntry = new CaseMongo({
    //   receiptNumber,
    //   status,
    //   details,
    //   fetchedAt,
    // });
    // await mongoEntry.save();

    // PostgreSQL History
    // const pgRepo = getPostgresDataSource().getRepository(CasePostgres);
    // const pgEntry = pgRepo.create({
    //   receiptNumber,
    //   status,
    //   details,
    //   fetchedAt,
    // });
    // await pgRepo.save(pgEntry);

    // res.json({
    //   receiptNumber,
    //   status,
    //   details,
    //   fetchedAt,
    // });
    res.status(200).json({ message: 'Status fetched and stored' });
  } catch (error) {
    console.error('Error fetching case status:', error);
    ///casestatus/mycasestatus.do?res.status(500).json({ error: 'Failed to fetch case status' });
  }
});

// MongoDB case history endpoint
// router.get('/history/mongo/:receiptNumber', async (req, res) => {
//   try {
//     res.status(200).json({ message: 'MongoDB history endpoint not implemented' });
//     // const history = await CaseMongo.find({
//     //   receiptNumber: req.params.receiptNumber.toUpperCase(),
//     // }).sort({ fetchedAt: -1 });

//     // res.json(history);
//   } catch (error) {
//     console.error('MongoDB history error:', error);
//     res.status(500).json({ error: 'Failed to fetch MongoDB case history' });
//   }
// });

// PostgreSQL case history endpoint
// router.get('/history/postgres/:receiptNumber', async (req, res) => {
//   res.status(200).json({ message: 'PostgreSQL history endpoint not implemented' });
//   // try {
//   //   const pgRepo = getPostgresDataSource().getRepository(CasePostgres);

//   //   const history = await pgRepo.find({
//   //     where: { receiptNumber: req.params.receiptNumber.toUpperCase() },
//   //     order: { fetchedAt: 'DESC' },
//   //   });

//   //   res.json(history);
//   // } catch (error) {
//   //   console.error('PostgreSQL history error:', error);
//   //   res.status(500).json({ error: 'Failed to fetch PostgreSQL case history' });
//   // }
// });

export default router;

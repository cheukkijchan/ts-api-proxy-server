import express from 'express';
import axios from 'axios';
import apicache from 'apicache';
require('dotenv').config();
import url from 'url';
// Env vars
const API_BASE_URL = process.env.API_BASE_URL || '';
const API_KEY_NAME = process.env.API_KEY_NAME || '';
const API_KEY_VALUE = process.env.API_KEY_VALUE || '';

const cache = apicache.middleware;
export const apiRouter = express.Router();

apiRouter.get('/', cache('10 minutes'), async (req, res, next) => {
  try {
    const fullUrl = new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl
    );
    let searchParams = new URLSearchParams(fullUrl.search);

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...Object.fromEntries(searchParams.entries()),
    });

    const apiRes = await axios.get(`${API_BASE_URL}?${params}`);
    const data = apiRes.data;

    if (process.env.NODE_ENV === 'development') {
      console.log(`Requesting: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

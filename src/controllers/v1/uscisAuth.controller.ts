import { fetchSecrets } from "../../config/doSecrets";

import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { redisClient } from '../../config/redis'; // Adjust the path based on your project structure
import { LoggerManager } from '../../common/logger/LoggerManager';

const OAUTH_CACHE_KEY = 'uscis_api_access_token';
const OAUTH_EXPIRE_BUFFER = 60; // seconds before expiration to refresh

interface OAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string; // Add other properties if needed
}

const fetchUSCISAccessToken = async (): Promise<string> => {
  try {

    // First, check Redis cache for the token
    const cachedToken = redisClient ? await redisClient.get(OAUTH_CACHE_KEY) : null;

    if (cachedToken) {
      LoggerManager.info(`USCIS OAuth token retrieved from cache`);
      return cachedToken;
    }


    const secrets = await fetchSecrets('tracker-secrets');

    const USCIS_OAUTH_TOKEN_URL = 'https://api-int.uscis.gov/oauth/accesstoken';
    const USCIS_API_CLIENT_ID = process.env.USCIS_CLIENT_ID || secrets.client_id;
    const USCIS_API_CLIENT_SECRET = process.env.USCIS_CLIENT_SECRET || secrets.client_secret;

    // Otherwise, fetch a new token

    const data = qs.stringify({
      'client_id': USCIS_API_CLIENT_ID,
      'client_secret': USCIS_API_CLIENT_SECRET,
      'grant_type': 'client_credentials'
    });

    const response: AxiosResponse<OAuthResponse> = await axios.post(
      USCIS_OAUTH_TOKEN_URL,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Cache the token, expire slightly earlier than actual expiration
    await redisClient.set(
      OAUTH_CACHE_KEY,
      access_token,
      'EX',
      expires_in - OAUTH_EXPIRE_BUFFER
    );

    return access_token;
  } catch (error: any) { // Type the error as any or AxiosError if you have it installed
    LoggerManager.error(`${error.response?.data || error.message}`);
    throw new Error('USCIS OAuth authentication failed');
  }
};

export { fetchUSCISAccessToken };
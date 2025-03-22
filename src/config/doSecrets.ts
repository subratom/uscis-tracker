import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
import dotenv from 'dotenv';
import vault from 'node-vault';

dotenv.config();


const DO_API_TOKEN = process.env.DO_API_TOKEN || 'dop_v1_010c1ffb20c5a48945d0c85c135ed28085a7a103b53a36c09c6a2aefa75ec225';

if(!DO_API_TOKEN) {
  throw new Error('DO_API_TOKEN is missing');
}

const doApi = axios.create({
  baseURL: 'https://api.digitalocean.com/v2',
  headers: {
    Authorization: `Bearer ${DO_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
}); 

export const fetchSecrets = async(secretName: string): Promise<Record<string, string>> => {
  try {
    const vaultClient = vault({
      apiVersion: 'v1',
      endpoint: 'http://vault:8200',
      token: 'myroot'
    });
    
    const secret = await vaultClient.read(`secret/data/${secretName}`);
    return secret.data.data;
  } catch (error) {
    console.error('Error fetching Vault secret:', error);
  }
}


// export const fetchSecrets = async (secretName: string): Promise<Record<string, string>> => {
//   try {
//     //const response = await doApi.get('/secrets/${secretName}');
//     //console.log(response.data.secret);
//     console.log('Fetching DigitalOcean secret:', secretName);
//     return {
//       MONGO_URI: 'mongodb://localhost:27017/uscis',
//       DO_API_TOKEN: DO_API_TOKEN
//     };
//       // POSTGRES_HOST: 'localhost',;
//     //console.log(response.data.account);
//     console.log('Fetching DigitalOcean account');
//     //return;
//   } catch (error) {
//     console.error('Error fetching DigitalOcean account:', error);
//   }
// }

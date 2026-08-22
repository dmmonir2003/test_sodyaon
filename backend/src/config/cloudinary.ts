import dns from 'dns';
import https from 'https';

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const agent = new https.Agent({
  family: 4,
  keepAlive: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
  agent: agent,
});

export default cloudinary;

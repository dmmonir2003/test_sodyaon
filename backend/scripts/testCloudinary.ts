import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import cloudinary from '../src/config/cloudinary';
import fs from 'fs';

async function runTest() {
  console.log('Testing Cloudinary via backend config module...');
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API Key:', process.env.CLOUDINARY_API_KEY);

  const testFilePath = path.join(__dirname, 'temp_test.png');
  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  fs.writeFileSync(testFilePath, Buffer.from(base64Image, 'base64'));

  try {
    const result = await cloudinary.uploader.upload(testFilePath, {
      folder: 'sodayon',
      resource_type: 'image',
    });

    console.log('\n=========================================');
    console.log('🎉 CLOUDINARY UPLOAD SUCCESSFUL!');
    console.log('=========================================');
    console.log('Public ID: ', result.public_id);
    console.log('Format:    ', result.format);
    console.log('Width:     ', result.width);
    console.log('Height:    ', result.height);
    console.log('URL:       ', result.secure_url);
    console.log('=========================================\n');
  } catch (error: any) {
    console.error('❌ Cloudinary Upload Error:', error);
  } finally {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  }
}

runTest();

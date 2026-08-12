import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './modules/user/user.model';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing!');
    process.exit(1);
  }

  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected!');

  try {
    const collections = await mongoose.connection.db!.collections();
    const usersCollection = collections.find(c => c.collectionName === 'users');

    if (usersCollection) {
      console.log('Existing indexes on users collection:');
      const indexes = await usersCollection.indexes();
      console.log(JSON.stringify(indexes, null, 2));

      // Drop email_1 index if it exists
      if (indexes.some(idx => idx.name === 'email_1')) {
        console.log('Dropping email_1 index...');
        await usersCollection.dropIndex('email_1');
        console.log('Dropped email_1 index successfully!');
      }

      // Drop other sparse indexes just in case they are not sparse on server
      if (indexes.some(idx => idx.name === 'googleId_1')) {
        console.log('Dropping googleId_1 index...');
        await usersCollection.dropIndex('googleId_1');
      }
      if (indexes.some(idx => idx.name === 'facebookId_1')) {
        console.log('Dropping facebookId_1 index...');
        await usersCollection.dropIndex('facebookId_1');
      }
      if (indexes.some(idx => idx.name === 'phone_1')) {
        console.log('Dropping phone_1 index...');
        await usersCollection.dropIndex('phone_1');
      }
    }

    console.log('Syncing models & rebuilding indexes...');
    await User.syncIndexes();
    console.log('Indexes synced successfully!');

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected!');
  }
}

run();

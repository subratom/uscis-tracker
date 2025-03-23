import mongoose from 'mongoose';
//import { loadSecrets } from '../config/env';

export const connectMongo = async (mongoUri: string) => {
    try {
      console.log('🔗 Connecting to MongoDB...');
      if (mongoose.connection.readyState === 1) {
        console.log('✅ MongoDB already connected');
        return;
      }
  
      await mongoose.connect(mongoUri);
      console.log('✅ MongoDB connected');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
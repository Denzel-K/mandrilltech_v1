import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Check if we're in an Edge runtime environment
const isEdgeRuntime = typeof EdgeRuntime !== 'undefined';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // Skip database connection in Edge runtime
  if (isEdgeRuntime) {
    console.warn("Edge runtime detected, skipping database connection");
    return null;
  }

  // Check if MongoDB URI is defined
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined in .env.local');
    throw new Error('MongoDB connection string is missing');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    cached.promise = null;
    throw e;
  }
}

export default connectToDatabase;

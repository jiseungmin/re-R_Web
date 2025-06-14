import mongoose from 'mongoose';

/**
 * Next.js에서 MongoDB에 연결하기 위한 Mongoose 설정
 * Hot reload 시 중복 연결을 방지하기 위해 캐시를 사용합니다.
 */
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
console.log('MONGODB_URI: ', MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log(`✔️ MongoDB 연결 성공: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

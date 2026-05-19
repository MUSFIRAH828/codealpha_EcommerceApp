import mongoose from "mongoose";
import { logger } from "./logger";

let connectionPromise: Promise<void> | null = null;

export async function connectMongoDB(): Promise<void> {
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      logger.info("No MONGODB_URI set — using in-memory MongoDB (data resets on restart)");
    }

    await mongoose.connect(uri);
    logger.info("Connected to MongoDB");
  })();

  return connectionPromise;
}

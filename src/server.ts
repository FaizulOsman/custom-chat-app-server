/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

// Handling uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

// Database Connection
async function main() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);
    console.log("🔥 Database connected 🔥");

    // Start the server
    server = app.listen(config.port, () => {
      console.log(`The app is running on port: ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database`, error);
  }
  // Gracefully shutting down the server in case of unhandled rejection
  process.on("unhandledRejection", (error) => {
    console.log(error);

    if (server) {
      // Close the server and log the error
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      // If server is not available, exit the process
      process.exit(1);
    }
  });
}

main();

// Handling SIGTERM signal
process.on("SIGTERM", () => {
  console.log("SIGTERM is received.");
  if (server) {
    // Close the server gracefully
    server.close();
  }
});

import "dotenv/config";
import ExtendedClient from "./class/ExtendedClient";

const client = new ExtendedClient();

client.start();

// Handles errors and avoids crashes, better to not remove them.
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

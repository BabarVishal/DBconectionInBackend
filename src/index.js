import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.conection.js";

// Load environment variables from the .env file
dotenv.config();

// Create an Express app
const app = express();

// Connect to MongoDB
connectDB();

// Define the port
const PORT = process.env.PORT || 5000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

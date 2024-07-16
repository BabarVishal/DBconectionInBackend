// import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.conection.js";

// Load environment variables from the .env file
dotenv.config();

// Create an Express app
//const app = express();

// Connect to MongoDB
connectDB()
.then(() => {
   app.listen(process.env.PORT || 5000, () =>{
    console.log(`Server has stated in Port : ${process.env.PORT}`)
   })
})
.catch((error) =>{
console.log('MongoDB conection fail', error)
})

// Define the port
// const PORT = process.env.PORT || 5000;

// Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start the server
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

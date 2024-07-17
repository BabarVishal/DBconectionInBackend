import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.conection.js";

// Load environment variables from the .env file
dotenv.config();

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


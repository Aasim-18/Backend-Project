
import ConnectDb from "./db/DB.js";

import dotenv from "dotenv";

import app from "./app.js";
import express from "express";

dotenv.config({
   path: './env'
})



ConnectDb()
.then(() => {
app.listen(process.env.PORT || 8000, () => {
console.log(`app is running on port ${process.env.PORT}`);
})
})
.catch((error) => {
console.log("Mongo db connection failed", error)
})


import ConnectDb from "./db/DB.js";

import dotenv from "dotenv";

import app from "./app.js";


dotenv.config({
   path: './env'
})



ConnectDb()
.then(() => {
app.listen(process.env.PORT || 8000, () => {
console.log(`app is running on PORT: ${process.env.PORT}`);
})
})
.catch((error) => {
console.log("Mongo db connection failed", error)
})






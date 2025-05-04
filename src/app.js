
  import express from "express";
  import cors from "cors";
  import cookieparser from "cookie-parser";

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "10kb" }))
app.use(express.urlencoded({extented:true, limit:"16kb"}))


export default { app }



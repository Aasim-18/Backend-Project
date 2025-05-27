import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const ConnectDb =  async () => {

   try {
 const connectionInstance = await  mongoose.connect("mongodb+srv://aasimsyed398:Aasim123@cluster0.exnr4er.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); 
console.log(`\n MongoDb Connected !! Db Host: ${connectionInstance}`)

}
 catch (error) {
   console.log("DataBase Connection error", error)
   process.exit(1)
}

}

export default  ConnectDb 

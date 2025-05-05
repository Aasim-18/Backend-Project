import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const ConnectDb =  async () => {

   try {
 const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`); 
console.log(`\n MongoDb Connected !! Db Host: ${connectionInstance}`)

}
 catch (error) {
   console.log("DataBase Connection error", error)
   process.exit(1)
}

}

export default ConnectDb

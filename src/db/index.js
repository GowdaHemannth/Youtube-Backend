import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const ConnectDB = async () => {
  try {
    const ConnectionResponse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(`MonogDB CONNECTED SUCCESFULLY IN DB PORT  ${ConnectionResponse.connection.host}`);
    
  } catch (e) {
    console.log("Something Went Wrong While Connecting the DataBase:", e);
  }
};

export default ConnectDB

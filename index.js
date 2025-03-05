import express, { urlencoded } from "express";
import loginroute from  "./routes/unlog.js"
import dt from "dotenv";
import configSession from "./routes/validationndcookies.js";

const app = express();
app.set("view engine","ejs");
app.use(urlencoded(true));



dt.config();

app.use("/",loginroute);
configSession(app);
app.listen(process.env.PORT,()=>{
  console.log("Listening on the port number :",process.env.PORT);
})
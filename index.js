import express, { urlencoded } from "express";
import loginroute from  "./routes/unlog.js"
import dt from "dotenv";
import {dirname} from "path"
import { fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import faceapi from 'face-api.js';
export const app = express();
app.set("view engine","ejs");
app.use(urlencoded(true));
app.use(express.json({ limit: '10mb' })); // Increase limit for large images
app.use('',express.static(__dirname+ '/public'));
app.use('/models',express.static(__dirname+'/models'));

app.use('',express.static(__dirname+'/stylesheet'));

dt.config();

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
  console.log("Face Recognition Models Loaded.");
}
loadModels();


app.use("/",loginroute);
//configSession(app);
app.listen(process.env.PORT,()=>{
  console.log("Listening on the port number :",process.env.PORT);
})
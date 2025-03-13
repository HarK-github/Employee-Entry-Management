import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

const loginroute = express.Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const STYLESHEET_DIR = path.join(process.cwd(), "stylesheet");

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
// Serve images dynamically
loginroute.get("/image/:name", (req, res) => {
    const filePath = path.join(process.cwd(), "stylesheet", req.params.name);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Attendance log array
let attendanceLog = [];

// ------------------- ROUTES -------------------
loginroute.get("/", (req, res) => {
    res.redirect("/home");
});

loginroute.get("/home", (req, res) => res.render("home"));
loginroute.get("/login", (req, res) => res.render("login"));

// ------------------- Render User Profile with Attendance -------------------
loginroute.get("/userpro", (req, res) => {
    res.render("userprofile", { attendanceLog });
});
loginroute.get("/updateimg", (req, res) => res.render("updtimg"));

loginroute.get("/pdfsummary", (req, res) => {
    res.render("pdfsummary");
});
// ------------------- Handle Attendance Data -------------------
loginroute.post('/attendance', (req, res) => {
    const { status } = req.body;
    const timestamp = new Date().toLocaleString();

    attendanceLog.push({ status, timestamp });

    console.log(`Attendance recorded: ${status} at ${timestamp}`);
    res.status(200).json({ message: "Attendance recorded." });
});

// Serve attendance records in JSON format
loginroute.get('/attendance-log', (req, res) => {
    res.json(attendanceLog);
});

// ------------------- PROFILE IMAGE UPLOAD -------------------
loginroute.post("/uploadprofile", (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "No image received" });

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const filePath = path.join(STYLESHEET_DIR, "/user.png");

    fs.writeFile(filePath, base64Data, "base64", (err) => {
        if (err) {
            console.error("Error saving profile image:", err);
            return res.status(500).json({ error: "Failed to save image" });
        }
        res.json({ message: "Profile image saved", path: filePath });
    });
});

// ------------------- LOGIN HANDLING -------------------
loginroute.post("/login", (req, res) => {
    const { uname, pwd } = req.body;
    
    if (!uname || !pwd) {
        return res.status(400).json({ error: "Username and password required" });
    }

    res.redirect("/userpro");
});

export default loginroute;

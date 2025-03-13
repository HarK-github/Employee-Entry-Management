import express from "express";
import path from "path";
import fs from "fs";
import canvas from "canvas";
import faceapi from "face-api.js";
import multer from "multer";

const loginroute = express.Router();

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

const STYLESHEET_DIR = path.join(process.cwd(), "stylesheet");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `image_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// ------------------- ROUTES -------------------

loginroute.get("/", (req, res) => {
    res.redirect("/home");
});

// Serve images dynamically
loginroute.get("/image/:name", (req, res) => {
    const filePath = path.join(process.cwd(), "stylesheet", req.params.name);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

loginroute.get("/home", (req, res) => res.render("home"));
loginroute.get("/login", (req, res) => res.render("login"));
loginroute.get("/userpro", (req, res) => res.render("userprofile"));
loginroute.get("/updateimg", (req, res) => res.render("updtimg"));

// ------------------- FACE REGISTRATION -------------------
let knownFaceDescriptor = null;

// loginroute.post("/upload", upload.single("image"), async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const imgPath = req.file.path;
    
//     try {
//         const img = await canvas.loadImage(imgPath);
//         const detections = await faceapi.detectSingleFace(img)
//             .withFaceLandmarks()
//             .withFaceDescriptor();

//         fs.unlinkSync(imgPath); // Delete file after processing

//         if (!detections) {
//             return res.status(400).json({ error: "No face detected" });
//         }

//         knownFaceDescriptor = detections.descriptor;
//         res.json({ message: "Face registered successfully." });
//     } catch (error) {
//         console.error("Error processing image:", error);
//         res.status(500).json({ error: "Server error" });
//     }//
//});

// ------------------- FACE RECOGNITION -------------------
loginroute.post("/recognize", async (req, res) => {
    // if (!knownFaceDescriptor) return res.status(400).json({ error: "No registered face." });

    // try {
    //     const receivedDescriptor = new Float32Array(req.body.descriptor);
    //     const distance = faceapi.euclideanDistance(receivedDescriptor, knownFaceDescriptor);

    //     if (distance < 0.6) {
    //         res.json({ result: "Face Matched ✅" });
    //     } else {
    //         res.json({ result: "Face Not Recognized ❌" });
    //     }
    // } catch (error) {
    //     console.error("Error recognizing face:", error);
    //     res.status(500).json({ error: "Server error" });
    // }
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

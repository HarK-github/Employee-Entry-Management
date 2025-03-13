const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');

let referenceDescriptor = null; // Store user descriptor
let detectionInterval = null;   // Prevent multiple intervals

async function waitForFaceAPI() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (window.faceapi) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}

window.addEventListener("load", async () => {
    try {
        console.log("Waiting for Face API to load...");
        await waitForFaceAPI();
        console.log("Face API is now loaded!");

        // Load models
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

        console.log("Face API Models Loaded Successfully!");

        // Load the reference face descriptor
        await loadReferenceImage();

        // Start camera only after models are loaded
        await startCamera();
    } catch (error) {
        console.error("Error loading Face API:", error);
    }
});

// Load reference image and compute descriptor
async function loadReferenceImage() {
    const img = await faceapi.fetchImage('/upload/user.png');
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!detection) {
        console.error("No face found in reference image!");
        return;
    }

    referenceDescriptor = detection.descriptor;
    console.log("Reference face descriptor loaded.");
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        console.log("Camera access granted.");
    } catch (error) {
        console.error("Error accessing the camera", error);
    }
}

async function detectFaces() {
    if (!video || video.readyState !== 4 || !referenceDescriptor) return;

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceLandmarks(canvas, detections);

    if (detections.length > 0) {
        compareFaces(detections[0].descriptor);
    } else {
        console.log("No face detected.");
    }
}

// Compare detected face with the stored descriptor
function compareFaces(liveDescriptor) {
    const distance = faceapi.euclideanDistance(referenceDescriptor, liveDescriptor);
    console.log(`Face match distance: ${distance.toFixed(4)}`);

    if (distance < 0.5) { // Threshold for recognition
        console.log("✅ Present");
    } else {
        console.log("❌ Not Present");
    }
}

// Start/stop face detection
captureButton.addEventListener('click', () => {
    if (detectionInterval) {
        clearInterval(detectionInterval);
        detectionInterval = null;
        console.log("Face detection stopped.");
    } else {
        detectionInterval = setInterval(detectFaces, 5000);
        console.log("Face detection started.");
    }
});

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const stopCaptureButton = document.getElementById('stopCaptureButton');

let referenceDescriptor = null;
let detectionInterval = null;
let logUpdateInterval = null; // Log update interval
function logStatus(message) {
    const statusContainer = document.getElementById('status');
    const logEntry = `<div style="padding: 10px; border-bottom: 1px solid #333;">${message}</div>`;
    statusContainer.insertAdjacentHTML('beforeend', logEntry);
    statusContainer.scrollTop = statusContainer.scrollHeight; // Auto-scroll 
}
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
        logStatus("Waiting for Face API to load...");
        await waitForFaceAPI();
        logStatus("Face API is now loaded!");

        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

        logStatus("Face API Models Loaded Successfully!");

        await loadReferenceImage();
        await startCamera();
    } catch (error) {
        console.error("Error loading Face API:", error);
    }
});

// Load reference image and compute descriptor
async function loadReferenceImage() {
    const img = await faceapi.fetchImage('/user.png');
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!detection) {
        console.error("No face found in reference image!");
        return;
    }

    referenceDescriptor = detection.descriptor;
    logStatus("Reference face descriptor loaded.");
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        logStatus("Camera access granted.");
    } catch (error) {
        console.error("Error accessing the camera", error);
    }
}

// Detect faces and compare
async function detectFaces() {
    if (!video || video.readyState !== 4 || !referenceDescriptor) {
        await markAbsent();
        return;
    }

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (detections.length > 0) {
        compareFaces(detections[0].descriptor);
    } else {
        await markAbsent();
    }
}

// Compare faces and send status
async function compareFaces(liveDescriptor) {
    const distance = faceapi.euclideanDistance(referenceDescriptor, liveDescriptor);
    const status = distance < 0.5 ? "Present" : "Absent";

    await sendAttendanceStatus(status);
    logStatus(`Face match distance: ${distance.toFixed(4)}, Status: ${status}`);
}

// Mark as Absent when no face detected
async function markAbsent() {
    await sendAttendanceStatus("Absent");
    logStatus("No face detected. Marking as Absent.");
}

// Send attendance status to server
async function sendAttendanceStatus(status) {
    await fetch('/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
}

// Update attendance log
async function updateAttendanceLog() {
    try {
        const response = await fetch('/attendance-log');
        if (!response.ok) throw new Error("Failed to fetch attendance log");

        const data = await response.json();
        const logContainer = document.getElementById('attendanceLog');
        logContainer.innerHTML = ""; // Clear old records

        data.forEach(entry => {
            const row = `
                <div class="status-box" style="background-color: #141b23; color: white; padding: 15px; border-radius: 10px; width: 100%; display: flex; flex-direction: column; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span><strong>Status:</strong> ${entry.status}</span>
                        <span><strong>Time:</strong> ${entry.timestamp}</span>
                    </div>
                </div>`;
            logContainer.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error("Error fetching attendance log:", error);
    }
}

// Start detection and log update
captureButton.addEventListener('click', () => {
    if (!detectionInterval) {
        detectionInterval = setInterval(detectFaces, 5000);
        logUpdateInterval = setInterval(updateAttendanceLog, 5000);
        logStatus("Face detection started.");
    }
});

// Stop detection and log update
stopCaptureButton.addEventListener('click', () => {
    if (detectionInterval) {
        clearInterval(detectionInterval);
        detectionInterval = null;
    }
    if (logUpdateInterval) {
        clearInterval(logUpdateInterval);
        logUpdateInterval = null;
    }
    logStatus("Face detection stopped.");
});

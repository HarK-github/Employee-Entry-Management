const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
    async function waitForFaceAPI() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (window.faceapi) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100); // Check every 100ms
        });
    }
    
    window.addEventListener("load", async () => {
        try {
            console.log("Waiting for Face API to load...");
    
            // Wait until face-api.js is fully loaded
            await waitForFaceAPI();
            console.log("Face API is now loaded!");
    
            // Load the face-api models before using them
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    
            console.log("Face API Models Loaded Successfully!");
        } catch (error) {
            console.error("Error loading Face API:", error);
        }
    });
    
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Request video
            const video = document.getElementById('video');
            video.srcObject = stream;
            console.log("Camera access granted.");
        } catch (error) {
            console.error("Error accessing the camera", error);
        }
    }

    async function detectFaces() {
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
            sendFaceData(detections[0].descriptor);
        }
    }

    function sendFaceData(descriptor) {
        fetch('/recognize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descriptor })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Recognition Result: ${data.result}`);
        })
        .catch(error => console.error('Error:', error));
    }

    captureButton.addEventListener('click', () => {
        setInterval(detectFaces, 5000);
    });

    startCamera();
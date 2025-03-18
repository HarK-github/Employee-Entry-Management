

# **Employee Entry Management System**  

🚀 **Revolutionize employee attendance tracking with real-time face recognition!**  

This web application leverages **cutting-edge face recognition technology** to record employee presence in real-time, log entries, and generate exportable **PDF reports**. Perfect for modern workplaces!  

---

## **✨ Key Features**  
✅ **Upload User Image for Recognition**  
✅ Real-time **face recognition** with high accuracy  
✅ Automatic logging of entry timestamps  
✅ Export logs to **PDF format** for easy reporting  
✅ Intuitive web-based interface  

---

## **🚀 Deployment Instructions**  

### **Prerequisites**  
Before you begin, ensure the following are installed on your system:  
- **Node.js** (Download from [nodejs.org](https://nodejs.org))  
- **npm** (Comes bundled with Node.js)  

---

### **🛠️ Installation Steps**  

1. **Clone the Repository** (If using Git):  
   ```sh
   git clone https://github.com/your-username/Employee-Entry-Management.git
   cd Employee-Entry-Management
   ```

2. **Install Dependencies:**  
   ```sh
   npm install
   ```

3. **Setup Environment Variables:**  
   - Create a `.env` file in the project root directory.  
   - Add the following configuration:  
     ```js
     PORT=8080
     ```

4. **Start the Server:**  
   ```sh
   node index.js
   ```

5. **Access the Application:**  
   - Open your browser and navigate to:  
     ```
     http://localhost:8080
     ```

---

### **📸 Usage Guide**  

1. **Click Login to Enter:**  
   - Note: Authentication is currently a dummy page for demonstration purposes.  
   <img src="./readmefiles/step1.png" alt="Login Page" width="400">

2. **Allow Web Camera Access:**  
   - Grant camera access when prompted by your browser.  
   <img src="./readmefiles/step2.png" alt="Camera Access Prompt" width="400">

3. **Upload User Image for Face Recognition:**  
   - Navigate to:  
     ```
     http://localhost:8080/updateimg
     ```  
   - Upload your profile image (e.g., "user.png") to the designated folder (e.g., `/uploads`).  
   - This image will be used for **face matching** during entry detection.  
   - Click **Upload** to proceed.  
   <img src="./readmefiles/step3.png" alt="Upload Image" width="400">

4. **Start Face Recognition:**  
   - Click **Start Capture** to begin real-time face recognition.  
   - The system will detect your presence and update the **Work History** section.  

5. **Download Work Report as PDF:**  
   - Click **Download Report** to export the attendance log as a PDF.  
   - The PDF will be saved to your device.  
   <img src="./readmefiles/step4.png" alt="Download Report" width="400">

---

## **💻 Technology Stack**  
- **Frontend:** HTML, CSS, JavaScript, EJS  
- **Backend:** Node.js, Express.js  
- **Face Recognition:** `face-api.js`  

---

<h3 align="left">🛠️ Languages and Tools:</h3>
<p align="left">
  <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40" style="margin: 10px;"/>
  </a> 
  <a href="https://expressjs.com" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40" style="margin: 10px;"/>
  </a> 
  <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40" style="margin: 10px;"/>
  </a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40" style="margin: 10px;"/>
  </a> 
  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40" style="margin: 10px;"/>
  </a>
</p>

---

## **🚀 Future Enhancements**  
- ✅ Add user authentication for secure access  
- ✅ Store logs in a database for long-term tracking  
- ✅ Generate detailed analytics and insights  
---

## **🤝 Contributions Welcome!**  
Feel free to open an **issue** or submit a **pull request** to contribute to this project. Let’s build something amazing together! 🚀  
---

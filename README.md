Here's the **updated `README.md`** with an additional step instructing users to **first upload their image** before starting face recognition.  

---

# **Employee Entry Management**  

This web application uses **face recognition** to record employee presence in real-time and logs their entries. The logs can be viewed and exported as a **PDF report**.  

## **Features**  
✅ **Upload User Image for Recognition**  
✅ Real-time **face recognition**  
✅ Automatic logging of entry timestamps  
✅ Export logs to **PDF format**  
✅ Web-based interface  

---

## **Deployment Instructions**  

### **Prerequisites**  
Ensure the following are installed on your system:  
- **Node.js** (Download from [nodejs.org](https://nodejs.org))  
- **npm** (Comes with Node.js)  

### **Installation Steps**  

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
   - Create a `.env` file in the project root directory  
   - Add the following configuration:  
     ```
     PORT=8080
     ```

4. **Start the Server:**  
   ```sh
   node index.js
   ```

5. **Upload User Image for Face Recognition:**  
   - Upload your profile image : http://localhost:8080/updateimg? to run face recognition on. Alternatively before starting the application, **upload the user image** to the designated folder (e.g., `/uploads`) as "user.png". 
   - This image will be used for **face matching** when detecting entries.  

6. **Access the Web App:**  
   - Open your browser and go to:  
     ```
     http://localhost:8080
     ```

---

## **Technology Stack**  
- **Frontend:** HTML, CSS, JavaScript, EJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (if applicable)  
- **Face Recognition:** `face-api.js`  


<h3 align="left">Languages and Tools:</h3>
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


## **Future Enhancements**  
- ✅ Add user authentication  
- ✅ Store logs in a database  
- ✅ Generate detailed analytics  

📌 **Contributions are welcome!** Feel free to open an issue or pull request. 🚀  

Let me know if you need any modifications! 😊
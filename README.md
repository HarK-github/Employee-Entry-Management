<br>

# **Employee Entry Management System**  
<br>

🚀 **Revolutionize employee attendance tracking with real-time face recognition!**



This web application leverages **cutting-edge face recognition technology** to record employee presence in real-time, log entries, and generate exportable **PDF reports**. Perfect for modern workplaces! 
## **Upcoming Features (Click to Jump ↓)**  
 Future Enhancements with Blockchain Integration
- [1. Immutable Attendance Logs](#1-immutable-attendance-logs)
- [2. Tamper-Proof Audit Trails](#2-tamper-proof-audit-trails)
- [3. Decentralized Access Control](#3-decentralized-access-control)
- [4. Smart Contracts for Payroll Automation](#4-smart-contracts-for-payroll-automation)

---

## ** Key Features**  
✅ **Upload User Image for Recognition**  
✅ Real-time **face recognition** with high accuracy  
✅ Automatic logging of entry timestamps  
✅ Export logs to **PDF format** for easy reporting  
✅ Intuitive web-based interface  

---

## **Deployment Instructions**  

### **Prerequisites**  
Before you begin, ensure the following are installed on your system:  
- **Node.js** (Download from [nodejs.org](https://nodejs.org))  
- **npm** (Comes bundled with Node.js)  

---

### **🛠️ Installation Steps**  

1. **Clone the Repository** (If using Git):  
   ```sh
   git clone https://github.com/your-username/Employee-Entry-Management.git
   cd Employee-Entry-Managementhttps://github.com/HarK-github/Employee-Entry-Management.githttps://github.com/HarK-github/Employee-Entry-Management.git
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

## **Future Enhancements with Blockchain Integration**

###  1. **Immutable Attendance Logs**
- Every employee check-in is **hashed** (timestamp + user ID + device fingerprint) and recorded on-chain.
- Ensures a **tamper-proof and verifiable** record of attendance—ideal for audits and compliance.
- ✅ **Tech Stack:**  
  - `Hyperledger Fabric` for private enterprise environments  
  - `Ethereum (Goerli or Sepolia testnet)` for public prototyping  

---

###  2. **Tamper-Proof Audit Trails**
- Any manual intervention (e.g., HR edits, late log justifications) is also hashed and stored on the blockchain.
- Enables a fully transparent, **non-repudiable log of access/modifications**, with full traceability of who did what and when.
- Makes post-incident investigations easy and trustworthy.

---

### 3. **Decentralized Access Control**
- Leverage **smart contracts** to manage role-based access:
  - Employees, HR, Admins each have specific permissions.
- Use **wallet-based authentication** (e.g., MetaMask) to verify identities and sign actions.
- Eliminates reliance on traditional username/password systems.

---

###  4. **Smart Contracts for Payroll Automation**
- Seamlessly link attendance data with payroll through smart contracts.
- If attendance meets policy thresholds (e.g., minimum check-ins), the contract auto-approves salary release.

```cpp
// Solidity-style pseudocode for payroll logic
if (employeeCheckIns[employeeId][month] >= requiredDays) {
    payrollContract.releaseSalary(employeeWallet);
}
```
---

---

<h3 align="middle">🛠️ Languages and Tools:</h3>
<p align="middle">
 <p align="center"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"> <img src="https://img.shields.io/badge/Blockchain-121D33?style=for-the-badge&logo=hyperledger&logoColor=white" alt="Blockchain"> <img src="https://img.shields.io/badge/face--api.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="FaceAPI"> </p>
</p>


---

## **👨‍💻 Developed By**  

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hark-github">
        <img src="https://avatars.githubusercontent.com/hark-github" width="100px;" alt="Your Name"/>
        <br />
        <sub><b>Harshit Kandpal</b></sub>
      </a>
      <br />
      <a href="https://github.com/hark-github" title="GitHub">👨‍💻</a>
      <a href="https://www.linkedin.com/in/harshit-k-a746a1310/" title="LinkedIn">🔗</a>
    </td>
  </tr>
</table>



## **🤝 Contributions Welcome!**  
Feel free to open an **issue** or submit a **pull request** to contribute to this project. Let’s build something amazing together!   
---


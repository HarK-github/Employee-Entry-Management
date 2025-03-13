document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;

    document.getElementById("downloadPdfButton").addEventListener("click", async () => {
        await generateWorkSummaryPDF();
    });

    async function generateWorkSummaryPDF() {
        try {
            // Dummy user details (Replace with actual user data from backend if needed)
            const userProfile = {
                name: "John Doe",
                email: "johndoe@example.com",
                profileImage: "/user.png", // Ensure this path is correct
            };

            // Fetch attendance data
            const response = await fetch('/attendance-log');
            if (!response.ok) throw new Error("Failed to fetch attendance log");

            const attendanceData = await response.json();
            if (attendanceData.length === 0) {
                alert("No attendance records available!");
                return;
            }

            const doc = new jsPDF();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Work Hours Summary", 15, 15);

            // User Details
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Name: ${userProfile.name}`, 15, 25);
            doc.text(`Email: ${userProfile.email}`, 15, 35);

            // Load and add the profile image
            const img = new Image();
            img.src = userProfile.profileImage;

            img.onload = function () {
                doc.addImage(img, "PNG", 140, 15, 50, 50); // Positioning the image

                let yPosition = 70; // Move below the profile image

                attendanceData.forEach((entry, index) => {
                    if (yPosition > 270) { // Prevent page overflow
                        doc.addPage();
                        yPosition = 15;
                    }

                    doc.text(`${index + 1}. ${entry.status} - ${entry.timestamp}`, 15, yPosition);
                    yPosition += 10;
                });

                doc.save("Work_Hours_Summary.pdf");
            };
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    }
});

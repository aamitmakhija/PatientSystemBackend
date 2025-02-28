![image](https://github.com/user-attachments/assets/0629b7ef-343c-4811-b83a-5267df89ec70)# DevOpS_PatientSystemBackend - Group 1 Submission
A code to build api system for patient registration and managment system
# DevOpS_PatientSystemBackend
A code to build api system for patient registration and managment system
Patient Information System

Overview

The Patient Information System (PIS) is a web application designed to manage patient records, including their personal details, medical history, and appointments. This system supports various roles such as Admin, Doctor, Nurse, and Clerk for managing and accessing patient data.

Features
	•	Role-based Authentication: Admin, Doctor, Nurse, and Clerk roles.
	•	CRUD operations for Patients: Add, update, delete, and view patient details.
	•	Admin Capabilities: Admins can manage users and assign roles.
	•	JWT Authentication: Secure access to routes based on user roles.

Prerequisites

Before running the application, ensure that you have the following installed:
	•	Node.js: Ensure you have Node.js installed (version 14 or higher).
	•	MongoDB: Ensure that MongoDB is running locally or you are using MongoDB Atlas for cloud-based databases.


Deployment Guide

Step 1: Clone the Repository

Clone the repository to your local machine:
git clone https://github.com/aamitmakhija/PatientSystemBackend.git
cd PatientSystemBackend

Step 2(optional as dockerized) : Install Dependencies:  

2.1 npm install 

2.2 Configure Environment: Create a .env file with database and authentication secrets.

		MONGODB_URL="MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/?retryWrites=true&w=majority&appName=<app-name>"
		PORT="3000"
		JWT_SECRET="your_jwt_secret_key_here"

2.3 Start MongoDB: Ensure MongoDB is running locally or via a cloud service.

2.4 Run the Server: node server.js



[image](https://github.com/user-attachments/assets/743977ad-4fb1-479b-b731-38c1690dab58)


Step 4: Start the Application

The application should now be accessible at http://localhost:5001.


API Endpoints (Use Postman export file included in submission)


1. User Authentication
	•	POST /api/auth/login: Login route for authenticating users. Accepts username and password as the request body. Returns a JWT token for access.
	•	GET /api/protected: Protected route that requires a valid JWT token to access. Only authorized users can access this.

2. Patient Management (Admin, Doctor, Nurse, Clerk)
	•	POST /api/patients/register: Register a new patient. Only authorized roles can access this.
	•	PUT /api/patients/update/:id: Update details of an existing patient.
	•	GET /api/patients/view/:id: View details of a specific patient.
	•	DELETE /api/patients/delete/:id: Delete a specific patient record.

3. Admin Management (Admin only)
	•	POST /api/admin/createUser: Admins can create a new user (Doctor, Nurse, Clerk).
	•	PUT /api/admin/updateUser/:id: Admins can update existing user roles.
	•	DELETE /api/admin/deleteUser/:id: Admins can delete a user.

    Contributing

Feel free to fork the repository, make changes, and submit a pull request.
	1.	Fork the repository.
	2.	Create a new branch for your feature (git checkout -b feature/your-feature).
	3.	Make your changes and commit them (git commit -m "Your commit message").
	4.	Push to your forked repository (git push origin feature/your-feature).
	5.	Open a pull request to merge your changes into the main branch.

API Testing 
Click on send to login for Admin role first (assuming no user created)
Copy & paste generated token in enviorement (e.g {{token_admin}} {{token_clerk}} {{token_doctoer}} {{token_nurse}} {{token_pathologist}}


Contact

For any queries or suggestions, feel free to contact:
	•	Email: amit_makhija@outlook.com or steambeka@gmail.com or rejoizjs@gmail.com or zstepmoon@mail.ru or ahmedfayazyousuf@gmail.com





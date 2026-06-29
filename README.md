MediCare Connect – Hospital Appointment & Healthcare Management System


Dear Instructor,
It was a very critical more I thought. I spends too much time to create this assignment. I was wasting time about thought to manage apis and database. I will improve myself as possible as I can.
I hope you will ignore the management systems of unstructured coding.
-Monir Hossen
-CodeByMonir

Project Overview and Discussion
What is MediCare Connect?
MediCare Connect is a modern healthcare management platform that connects patients with doctors and hospitals through a centralized online system. Patients can book appointments, manage medical records, make payments, and receive healthcare services efficiently.
Doctors can manage schedules, appointments, and patient consultations, while administrators can oversee the entire healthcare ecosystem.

Why Should We Develop This Project?
Traditional appointment systems often involve long waiting times, manual paperwork, and poor communication between patients and healthcare providers.
MediCare Connect aims to:
Digitize appointment booking.
Reduce patient waiting time.
Improve doctor schedule management.
Maintain healthcare records securely.
Provide a seamless healthcare experience.

#Roles:


*Patient
Creates account   --done
Searches doctors      --done
Books appointments   --done
Makes payments   --done
Views appointment history   --done
Reviews doctors   --done



*Doctor
Creates professional profile   --done
Manages schedules   --done
Accepts or rejects appointments   --done
Updates consultation status   --done


*Admin
Manages users    --done
Verifies doctors    --done
Oversees appointments    --done
Monitors payments    --done
Generates reports    --did'nt understand

Similar Websites / Design Inspiration
Apollo 24/7
Novant Health
UsNews

Data Design


Collection 1: Users    --done

Fields:
name
email
role
Photo
phone
gender
createdAt
status

Collection 2: Doctors   --done

Fields:
doctorName
specialization
qualifications
experience
consultationFee
hospitalName
profileImage
availableDays
availableSlots
verificationStatus

Collection 3: Appointments   --done

Fields:
patientId
doctorId
appointmentDate
appointmentTime
appointmentStatus
symptoms
paymentStatus

Collection 4: Reviews    --done

Fields:
patientId
doctorId
rating
reviewText
createdAt

Collection 5: Payments   --done

Fields:
appointmentId
patientId
doctorId
amount
transactionId
paymentDate

Collection 6: Prescriptions   --done

Fields:
doctorId
patientId
appointmentId
diagnosis
medications
notes
createdAt

Ensure the Following Things to Get 100% Mark

Minimum 20 meaningful commits on Client Side.   --done
Minimum 12 meaningful commits on Server Side.   --done
Meaningful commit messages.   --done
Professional README file.   --done
Environment variables for Firebase configuration.    --done(BetterAuth)
Environment variables for MongoDB credentials.   --done
Responsive design.
Proper validation.
Secure API routes.
JWT implementation.
Role-based authorization.   --done
No copied design.   --done

Deployment Guideline
No CORS issues.   --done
No 404 errors.
No 504 errors.
The server must work properly in production.
All private routes must work after page refresh.   --done
Live site should remain fully functional.        --did'nt understand
Logged-in users must remain authenticated after reload.       --did'nt understand

Layout & Page Structure

Navbar   --done

Must Include:
Logo
Home
Find Doctors
About Us
Contact Us
Dashboard
Login/Register
User Profile Dropdown

Footer   --done

Must Include:
Logo
Quick Links
Contact Information
Emergency Hotline
Social Media Links
Copyright



Main Pages

Public Pages   --done
Home
Find Doctors
Doctor Details
About Us
Contact Us
Login
Register
Private Pages
Dashboard
Profile

Authentication System   --done

Register
Fields:
Name
Email
Photo URL/Photo Upload
Password
Requirements:
Strong password validation (At least 6 characters including at least one number and one special character)
Success notification

Login
Requirements:
Email & Password Login
Google Login
JWT Authentication
Error Handling



Home Page   --done
Banner Section
Must Include:
Healthcare-themed banner
Call-to-action button

Featured Doctors (Dynamic)   --done
Display doctors from the database.
Information:
Name
Specialization
Experience
Consultation Fee

Medical Specializations (Static)   --done
Examples:
Cardiology
Neurology
Orthopedics
Pediatrics
Dermatology

Platform Statistics (Dynamic)   --done
Display:
Total Doctors
Total Patients
Total Appointments
Total Reviews

Framer Motion Requirement   --done
Implement animation in at least two sections



Extra Section 1 (Dynamic)   --done

Patient Success Stories
Show real patient testimonials. (Hint : you can fetch data from reviews collection)

Extra Section 2 (Static)
Why Choose MediCare Connect
Display healthcare benefits and platform advantages.

Dashboard Layout
Patient Dashboard
Dashboard Overview
Display:
Upcoming Appointments
Appointment History
Total Payments
Favorite Doctors


MY Profile—
My Appointments
CRUD Features:
View Appointment 
Reschedule Appointment
Cancel Appointment

Payment History
Display:
Paid Appointments
Transaction Records

My Reviews
CRUD Features:
Add Review
Update Review
Delete Review

Doctor Dashboard
Dashboard Overview
Display:
Total Patients
Today's Appointments
Reviews Received

Manage Schedule
CRUD Features:
Add Schedule
Update Schedule
Remove Schedule

Appointment Requests
Features:
Accept Appointment
Reject Appointment
Mark Completed (After marking as complete, navigate to the prescription management route)

Prescription Management
CRUD Features:
Create Prescription
Update Prescription

Profile Management
Update:
Qualifications
Experience
Consultation Fee
Available Slots

Admin Dashboard
Dashboard Overview

Manage Users
Features:
View Users
Delete User
Suspend User

Manage Doctors
Features:
Verify Doctor (if  someone registers as a doctor, their status will not be verified initially. Only Admin can verify the doctors)
Reject Doctor Verification
Update Doctor Status (Admin can also cancel verification of the verified doctors)

Manage Appointments
Features:
View All Appointments
Monitor Appointment Status

Payment Management
Features:
View Payment Records

Analytics
Display:
Doctor Performance (Rating based)
Total Patients
Total Doctors
Total Appointments
*** Use Recharts 

Payment System
Integrate Stripe Payment Gateway.
Patients must pay consultation fees before confirming appointments.
Payment status must be stored in database

Additional Requirements
Loading Page
Create a meaningful loading page for:
Route loading
Data fetching
Dashboard loading

Error Page
Custom 404 Page.
Must Include:
Illustration
Error Message
Back Home Button

Other Requirements
Toast/SweetAlert Notifications
Protected Routes
Role-Based Dashboard Access
Responsive Dashboard
Dynamic Page Titles

UI Design Requirements
Unique Design
The design must not resemble previous assignments or module projects.
Use modern healthcare-themed color palettes.

Consistency
Consistent typography
Consistent heading style
Consistent button design
Equal card sizes
Proper spacing and alignment

Dashboard UI
Full-width layout
Charts and analytics
User profile section
Responsive sidebar

Responsiveness
Must support:
Mobile Devices
Tablets
Desktop Devices

Challenge Requirements
Challenge 1
Advanced Doctor Search
Search doctors by:
Name
Specialization

Challenge 2 
Sorting Functionality
Sort doctors by:
Consultation Fee
Experience
Highest Rating

Challenge 3 
JWT Token Verification
Requirements:
Protect Private APIs
Verify Tokens in Backend
Role-Based Authorization
Documentation required in README.

Challenge 4
Pagination
Implement pagination on:
Find Doctors Page

Optional Requirements
Choose any 2–5.

Option 1
Dark/Light Theme Toggle.
Option 2
Doctor Availability Calendar.
Option 3
Email Appointment Reminders.
Option 4
Layout Change Option (Table to Card / Card to Table format)

What to Submit
Admin Credentials
Admin Email:
Admin Password:

Links
Live Site Link:
GitHub Repository (Client):
GitHub Repository (Server):

Technology Suggestions
Frontend
Next Js
Tailwind CSS
DaisyUI / HeroUI
Framer Motion
Recharts
Backend
Node.js
Express.js
MongoDB
JWT
Stripe
Authentication
Better Auth



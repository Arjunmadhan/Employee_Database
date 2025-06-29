Employee Management System:
This Employee Management System is a full-stack web application that enables users to perform complete CRUD (Create, Read, Update, Delete) operations on employee records. Built using React on the frontend and Node.js with Express on the backend, the system also integrates MySQL for data storage. The UI is developed with React and styled using Tailwind CSS to ensure a modern, clean, and responsive layout. Navigation between pages such as Dashboard, Add, Edit, and View Employee is handled using React Router.

When a user adds or edits an employee, they can upload a profile photo, which is handled on the backend using Multer — a middleware that processes multipart/form-data. The uploaded photo is stored as a BLOB in the MySQL database. Axios is used to send all API requests from the frontend to the backend. On the backend, RESTful API endpoints are created to handle fetching all employees, retrieving profile photos, adding new entries, updating existing ones, and deleting records. The employee’s photo is retrieved using a dedicated API endpoint (/api/employees/:id/photo) and rendered dynamically in both the dashboard and detailed view pages.

The system uses a unique employeeId to identify records, while a separate auto-incremented id is maintained as the database primary key. Error handling is implemented across the frontend and backend to notify users of any failure during operations like insert, update, or delete. Overall, the application is designed to be clean, user-friendly, and suitable for real-world HR or admin use cases.
Features

* Add employee with profile photo
* Edit employee details and photo
* View full employee information
* Delete employee with confirmation
* Store images as BLOBs in MySQL
* Real-time frontend updates
* Professional Tailwind UI

Frontend:
React (with Vite)
React Router DOM
Tailwind CSS
Axios

Backend:
Node.js
Express.js
Multer (for handling file uploads)
dotenv (environment variable management)
CORS (cross-origin requests)

Database:
MySQL (with image storage using LONGBLOB)

Method to run this file:
*save the project in folder command is cd path name.
*copy the link and clone the link by using git clone command.
*put cd rep name and click enter.
*add command code .


# AppointMed

**AppointMed** is a comprehensive Doctor Appointment Booking System that simplifies the process of scheduling, managing, and tracking doctor appointments. The platform is built with a robust backend and an interactive frontend to ensure a seamless user experience for administrators, doctors, and patients.

## Features

### For Patients:
- Browse available doctors by specialty, location, or rating.
- View detailed doctor profiles with qualifications, experience, and fees.
- Book appointments based on available time slots.
- Manage upcoming and past appointments.

### For Doctors:
- View a personalized dashboard for appointment schedules.
- Update availability and manage slots.
- Mark appointments as completed.

### For Administrators:
- Manage users, doctors, and appointments.
- Monitor system statistics and generate reports.

## Tech Stack

### Frontend:
- **React** (with Vite for fast builds)
- **Tailwind CSS** for responsive and modern design

### Backend:
- **Node.js** and **Express.js** for API development
- **MySQL** with **Sequelize** ORM for database management

### Tools & Libraries:
- **Axios** for HTTP requests
- **React Router** for navigation
- **Toastify** for notifications
- **Context API** for global state management

---

## Installation

### Prerequisites:
- Node.js (v14+)
- MySQL (v8+)

### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/appointmed.git
   cd appointmed/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=appointmed
   JWT_SECRET=your_jwt_secret
   ```
4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Open the frontend in your browser:
   ```
   http://localhost:5173
   ```
2. Register as a user or log in.
3. Browse doctors, book appointments, and manage them from your dashboard.
4. Administrators and doctors can access their respective dashboards for additional functionalities.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## Contact

For questions or feedback, please contact:

- shisirghimire21@gmail.com 
- https://github.com/1Shisir

---

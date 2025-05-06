# 🔐 Full-Stack Authentication System - Tutorial Series 🚀

Hey everyone! 👋 Welcome to the repository for my **Complete Authentication System** built from scratch! This project is also built step-by-step in a 2-part YouTube series. Follow along to see how it all comes together! where I walk you through building a secure and feature-rich authentication system using modern web technologies.

**Watch Part 1 (Theory) Here:** [https://youtu.be/Xpf_QwnzG_s](https://youtu.be/Xpf_QwnzG_s) 🍿
**Watch Part 2 (Project) Here:** [https://youtu.be/Xpf_QwnzG_s](https://youtu.be/Xpf_QwnzG_s) 🍿

## 🌟 Project Overview

This project demonstrates how to build a robust authentication system featuring:

*   **Frontend:** A simple Next.js (App Router) application with React and TypeScript.
*   **Backend:** A powerful Express.js API server with Node.js and TypeScript.
*   **Database:** MongoDB for storing user data and refresh tokens.
*   **Authentication Strategy:** JWT (JSON Web Tokens) for access and refresh tokens.

## ✨ Features Implemented

*   👤 **User Registration:** Securely sign up new users.
*   🔑 **User Login & Logout:** Authenticate users and manage sessions.
*   🔄 **Token Refresh:** Seamlessly refresh access tokens using refresh tokens.
*   🔒 **Protected Routes:** Middleware to protect frontend and backend routes based on authentication status.
*   👑 **Role-Based Access Control (RBAC):**
    *   Differentiate between `user` and `admin` roles.
    *   Protected admin dashboard.
*   📬 **Password Reset Flow:**
    *   "Forgot Password" functionality.
    *   Secure token generation and email dispatch (using Nodemailer with Gmail OAuth2).
    *   "Reset Password" page to update credentials.
*   🎨 **Frontend**
    *   Client-side form validation with Zod and React Hook Form.
    *   React-Context
    *   User feedback with toasts/notifications (Sonner).
    *   Styled with Tailwind CSS and Shadcn/UI components.
*   ⚙️ **Development & Production Setup:**
    *   Proxying API requests in Next.js for development and to solve cookie issues in production.
    *   Environment variable management.
    *   Preparation for deployment.

## 🛠️ Tech Stack

*   **Frontend:**
    *   ⚛️ Next.js 14+ (App Router)
    *   📘 TypeScript
    *   🎨 Tailwind CSS / ShadcnUI
    *   🧩 Axios
    *   ✨ React Hook Form
    *   ✅ Zod (for validation)
    *   🛡️ React Context (for Auth state management)
*   **Backend:**
    *   💨 Express.js
    *   📘 TypeScript
    *   💚 Node.js
    *   💾 MongoDB (with Mongoose)
    *   🔑 JWT (jsonwebtoken)
    *   🛡️ bcryptjs (for password hashing)
    *   ✉️ Nodemailer (for sending emails)
*   **Development:**
    *   📦 PNPM 

## 🚀 Getting Started Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-url>
    ```

2.  **Backend Setup (`/backend` directory):**
    *   Navigate to the `backend` folder: `cd backend`
    *   Create a `.env` file by copying `.env.example` (if you provide one, otherwise list variables). Key variables:
        *   `PORT`: e.g., (`development` / `production`)
        *   `NODE_ENV`: e.g., `production`
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `JWT_SECRET`: Secret for JWT access tokens.
        *   `JWT_REFRESH_SECRET`: Secret for JWT refresh tokens.
        *   `JWT_RESET_SECRET`: Secret for JWT password reset tokens.
        *   `ACCESS_TOKEN_EXPIRES_IN`: e.g., `1800`
        *   `REFRESH_TOKEN_EXPIRES_IN`: e.g., `604800`
        *   `EMAIL_USER`, `EMAIL_PASS`: For Nodemailer/Gmail OAuth2.
        *   `FRONTEND_URL`: e.g., `http://localhost:3000`
    *   Install dependencies: `pnpm install` (or `npm install` / `yarn install`)
    *   Run the development server: `pnpm dev` (or `npm run dev` / `yarn dev`)

3.  **Frontend Setup (`/frontend` directory):**
    *   Navigate to the `frontend` folder: `cd ../frontend` (from backend) or `cd frontend` (from root)
    *   Create a `.env.local` file. Key variables:
        *   `API_BASE_URL=http://localhost:5000` (or your backend URL if different)
    *   Install dependencies: `pnpm install` (or `npm install` / `yarn install`)
    *   Run the development server: `pnpm dev` (or `npm run dev` / `yarn dev`)

4.  Open your browser and navigate to `http://localhost:3000` (or your frontend's port).

## 🙏 Acknowledgements

*   The awesome communities behind Next.js, Express, MongoDB, and all the libraries used.
*   You, for checking out this project and tutorial! ❤️

## 💬 Contact & Feedback

I love hearing from you! If you have any questions, feedback, suggestions, or just want to say hi, feel free to reach out:

*   **Connect with me:** 
    *   Youtube: `[@yoimdiego](https://www.youtube.com/@yoimdiego)`
    *   LinkedIn: `[Diego Lauricella](https://www.linkedin.com/in/diegolauricella/)`
    *   Twitter/X: `[@yoimdiego](https://x.com/yoimdiego)`
    *   Personal Website/Portfolio: `[diegolauricella.com](https://diegolauricella.com)`

---

Happy Coding! ❤️

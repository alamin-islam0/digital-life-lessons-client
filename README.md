# 🎓 Digital Life Lessons

**Digital Life Lessons** is a modern, community-driven platform where users can share their life experiences and learn from others. It connects people through stories of success, failure, relationships, and personal growth. The platform features robust user roles, premium content access, and an interactive dashboard for managing lessons.

---

## 🚀 Live Demo

- **Live Site:** [https://digital-life-lesson.netlify.app/](https://digital-life-lesson.netlify.app/)
- **Backend Server Code:** [https://github.com/alamin-islam0/digital-life-lessons-server](https://github.com/alamin-islam0/digital-life-lessons-server)

## 🛠️ Admin & User Credentials (Demo)

To quickly explore the features, you can use these **Demo Login** buttons on the login page, or manually enter:

### **Admin (Read-Only)**

- **Email:** `alaminislam@gmail.com`
- **Password:** `Admin@2026`
  > _Note: Admin actions (managing users, lessons) are restricted in demo mode._

### **User**

- **Email:** `user@gmail.com`
- **Password:** `User@2000`

---

## ✨ Features

### 🔹 **General Features**

- **Authentication:** Secure Email/Password login & Google Social Login (Firebase).
- **Responsive Design:** Fully responsive UI built with **Tailwind CSS** and **DaisyUI**, optimized for Mobile, Tablet, and Desktop.
- **Dark/Light Mode:** Seamless theme switching with persistent user preference.
- **Animations:** Smooth transitions using **AOS (Animate On Scroll)** and **Lottie** animations.

### 🔹 **User Features**

- **Browse Lessons:** View public lessons with filtering and search capabilities.
- **Create & Manage:** Users can write, edit, and delete their own lessons.
- **Dashboard:** A personalized dashboard to track my lessons.
- **Profile Management:** Update user profile information.

### 🔹 **Premium Features (Stripe Integration)**

- **Subscription:** Users can upgrade to **Premium Membership**.
- **Exclusive Content:** Access to premium-only lessons.
- **Recognition:** Special "Premium" badge on profile and comments.

### 🔹 **Admin Features**

- **User Management:** View all users, manage roles (promote to Admin), and ban users.
- **Lesson Management:** Review, approve, or remove published lessons.
- **Analytics:** View platform statistics (total users, lessons, views).

---

## 💻 Tech Stack

### **Frontend**

- **React.js** (Vite)
- **React Router DOM** (Navigation)
- **Tailwind CSS & DaisyUI** (Styling)
- **Lucide React & React Icons** (Icons)
- **Framer Motion / AOS** (Animations)
- **Swiper.js** (Sliders)
- **React Hook Form** (Form Handling)

### **Backend (Integration)**

- **Firebase Authentication** (Identity)
- **Axios** (API Requests)
- **TanStack Query** (State Management & Caching)
- **SweetAlert2** (Notifications)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/alamin-islam0/digital-life-lessons-client.git
cd digital-life-lessons-client
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add your Firebase and Backend API keys:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_Payment_Gateway_PK=your_stripe_public_key

# Firebase Config
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! If you have any ideas or improvements:

1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes.
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Made with ❤️ by <b>Alamin Islam</b></p>

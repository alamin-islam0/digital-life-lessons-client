# Digital Life Lessons 🌟

**Digital Life Lessons** is a modern, full-stack web application designed to connect people through shared experiences. It serves as a platform where users can document their life lessons, learn from others' mistakes and successes, and build a community grounded in wisdom and empathy.

Designed with a premium user experience in mind, the platform features a responsive interface, dark/light mode, and seamless content discovery tools.

## 🚀 Key Features

### 👤 User Experience
*   **Authentication & Authorization:** Secure login and registration using Email/Password and Google Social Login.
*   **User Dashboard:** specialized dashboards for standard users and administrators.
*   **Profile Management:** Users can update their profiles and manage their account details.
*   **Dark/Light Mode:** Fully integrated theme toggler for optimal reading comfort in any environment.

### 📚 Lesson Management
*   **Create & Share:** Users can easily draft and publish their own life lessons.
*   **Discovery:** Advanced search, filtering (by Category, Emotional Tone), and sorting (Newest, Oldest, Most Liked, Most Saved).
*   **Premium Content:** Exclusive "Premium" lessons accessible only to subscribed members.
*   **Interaction:** Users can **Like**, **Save (Favorite)**, and **Comment** on lessons to engage with the community.
*   **Reporting System:** Users can report inappropriate content for admin review.

### 💼 Membership & Payments
*   **Tiered Access:** Free and Premium membership tiers.
*   **Stripe Integration:** Secure payment processing for upgrading to Premium membership.

### 🛡️ Admin Capabilities
*   **User Management:** Admins can view all users, manage roles (promote to admin), and ban users if necessary.
*   **Content Moderation:** Overview of all lessons and ability to manage reported content.
*   **Statistics:** Visual dashboard displaying site-wide metrics (Total Users, Lessons, Sales).

## 🛠️ Technologies Used

### Frontend
*   **React.js:** Core UI library.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **DaisyUI:** Component library for Tailwind.
*   **React Router:** For seamless client-side navigation.
*   **TanStack Query (React Query):** For efficient server state management and data fetching.
*   **Axios:** HTTP client.
*   **Framer Motion / AOS:** For smooth animations.
*   **Lucide React:** Modern, lightweight icon set.
*   **Recharts:** For data visualization on dashboards.

### Backend (Assumed context)
*   **Node.js & Express.js:** REST API architecture.
*   **MongoDB:** NoSQL database for flexible data storage.
*   **Firebase Authentication:** Secure user identity management.
*   **Stripe API:** Payment processing.

## 📦 How to Run Locally

Follow these steps to set up the project locally on your machine.

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn
*   A MongoDB database URI
*   Firebase Project configuration
*   Stripe Account (for payments)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/digital-life-lessons-client.git
    cd digital-life-lessons-client
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add the following keys:
    ```env
    # Firebase Configuration
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_firebase_auth_domain
    VITE_projectId=your_firebase_project_id
    VITE_storageBucket=your_firebase_storage_bucket
    VITE_messagingSenderId=your_firebase_messaging_sender_id
    VITE_appId=your_firebase_app_id

    # Backend API URL
    VITE_API_URL=http://localhost:5001/api

    # Stripe (Public Key)
    VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
    ```

4.  **Run the Application**
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173`.

---

## 🌟 Acknowledgements
This project was built to demonstrate advanced React patterns, secure authentication flows, and payment integration. Special thanks to the open-source community for the amazing tools and libraries used in this project.

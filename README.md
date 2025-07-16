      
# ARIA - Adaptive Reasoning & Intelligence Assistant

Welcome to the full-stack repository for ARIA, an integrated AI ecosystem designed as a human-AI symbiosis engine. This project combines a React frontend with a robust Node.js backend to create a seamless user experience.

---

## 👥 Group Members

*   **Gathigi Moses Muiruri** - `gathimoses@gmail.com`
*   **Isaiah Odongo** - `odongoreagan19@gmail.com`
*   **Keren Hapuch Ntinyari** - `kerenhapuch68@gmail.com`
*   **Jebichi Joyce** - `jebichiijoyce@gmail.com`
*   **Palpable Smart** - `palpable237@gmail.com`

---

---

## 🔗 Live Application Links (For Reviewers)

To best review this project, please use the live deployed applications.

*   **Live Frontend Application:**
    *   **URL:** `[Your Live Frontend URL Here - e.g., https://aria-frontend.onrender.com]`
    *   **Instructions:** Visit this URL to register, log in, and interact with the application.

*   **Live Backend API:**
    *   **URL:** `[Your Live Backend API URL Here - e.g., https://aria-backend.onrender.com]`
    *   **Note:** This is the base URL for the API. It is not meant to be visited directly in a browser. The frontend application above is already configured to communicate with it.

---

## 📖 Project Overview

ARIA (Adaptive Reasoning & Intelligence Assistant) is not just a tool—it's an AI partner designed to think with you, grow with you, and help you thrive. The core mission is to enhance human flourishing by providing an ambient and ethical intelligence that adapts to a user's life.

*   **The Frontend** is a modern, responsive React application. It provides the user interface for registering, logging in, entering personal data (like sleep and stress levels), and viewing AI-generated insights.

*   **The Backend** is a scalable Node.js server that acts as the brain of the operation. It handles user authentication, securely stores data in MongoDB, and interfaces with the Google Gemini API and Pinecone vector database to perform complex analysis and enable semantic memory.

---

## 🏗️ System Architecture

The project follows a classic and robust full-stack architecture, ensuring a clear separation of concerns between the client and server.

```text
+----------------+      +---------------------+      +--------------------+
|                |      |                     |      | Google Gemini API  |
| React Frontend |----->|  Node.js API Server |----->|  - Insights        |
| (Client-side)  |      |  (Express.js)       |      |  - Embeddings      |
|                |      |                     |      +--------------------+
+----------------+      +----------+----------+
                                   |
                         +---------+---------+
                         |                   |
                         v                   v
                  +----------------+   +--------------------+
                  | MongoDB        |   | Pinecone           |
                  | (User Data)    |   | (Vector Database)  |
                  +----------------+   +--------------------+
```

## 🛠️ Technology Stack

| Area      | Technology                                    |
| :-------- | :-------------------------------------------- |
| **Frontend**  | React, Axios, CSS                             |
| **Backend**   | Node.js, Express.js                           |
| **Database**  | MongoDB (with Mongoose), Pinecone             |
| **AI Engine** | Google Gemini (for insights & embeddings)     |
| **Auth**      | JSON Web Tokens (JWT), bcryptjs               |
| **Testing**   | Jest, Supertest                               |

---

## 🚀 How to Run Locally

To set up the full application on your local machine, you will need to run **both the backend and the frontend** in separate terminals.

### Backend Setup

1.  **Navigate to the Backend Directory:**
    ```bash
    # Assuming you are in the root directory
    cd aria-backend 
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create `.env` File:**
    Create a file named `.env` and add your credentials.
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    MONGO_URI_TEST=your_mongodb_test_database_string
    GEMINI_API_KEY=your_google_gemini_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    JWT_SECRET=your_long_random_jwt_secret_key
    ```

4.  **Run the Backend Server:**
    ```bash
    npm run dev
    ```
    The backend API will be running at `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the Frontend Directory:**
    ```bash
    # Assuming you are in the root directory
    cd aria-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create `.env.local` File:**
    Create a file named `.env.local` and point it to your local backend API.
    ```env
    REACT_APP_ARIA_API_URL=http://localhost:5001
    ```

4.  **Run the Frontend Application:**
    ```bash
    npm start
    ```
    The frontend will open in your browser at `http://localhost:3000`.

---

## ✅ Reviewer's Guide: How to Test the Full Application

To see the core functionality of ARIA in action, please follow these steps on the **live frontend application**.

1.  **Register a New Account:**
    *   Navigate to the registration page.
    *   Create a new user with a valid email and password.

2.  **Log In:**
    *   After registering, log in with your new credentials. You will be redirected to the main dashboard.

3.  **Log Health Data:**
    *   Find the section for logging data.
    *   Submit at least two entries: one for **Sleep** (e.g., 420 minutes) and one for **Stress** (e.g., a level of 7).

4.  **Generate an AI Insight:**
    *   Click the button to "Analyze" or "Get Insight".
    *   This action sends the data you just logged to the backend, which then queries the **Google Gemini API**.
    *   Observe the AI-generated feedback that appears on the screen. This demonstrates the complete, end-to-end flow of the application.

---

## License

This project is licensed under the MIT License.

    
---
title: "Brgy. San Antonio Community Hub"
date: 2024-10-01
oneliner: "A full-stack web application for a local government unit, enhancing communication with a React frontend, Node.js backend, and an AI chatbot."
category: "Academic"
stack: ["React", "Material UI", "Node.js", "Express.js", "Firebase Admin SDK", "Genkit (Gemini)", "Firebase Firestore", "Firebase Authentication", "Docker", "Google Cloud Run", "Git"]
video_url: "https://www.youtube.com/embed/xqIp5v3NNJ8"
repo_url: "https://www.github.com/kyleconciso/brgy-san-antonio"
---

## Overview
The "Brgy. San Antonio Community Hub" is a comprehensive web application designed to serve as the main online platform for Barangay San Antonio, Candon City. It aims to enhance communication, streamline services, and improve community engagement between residents and barangay officials. The project incorporates modern web technologies, AI-powered features, and accessibility options to cater to a diverse user base.

## Architecture and Structure
The system employs a client-server architecture with a clear separation of concerns between the frontend and backend.

### Client (Frontend)
A Single-Page Application (SPA) built with React, located in the `client/` directory. The structure is organized for scalability:

*   `components/`: Contains reusable UI elements like layouts, navigation, and widgets.
*   `pages/`: Holds the main application screens (Admin, Public, User).
*   `api/`: Manages client-side API call functions that interact with the Express backend.
*   `contexts/`: Manages global state, such as `AuthContext` for user authentication.
*   `hooks/`: Contains custom React hooks like `useApi` and `useAuth` to abstract complex logic.
*   `App.js`: The main application component that defines routing and the overall layout.

### Server (Backend)
A Node.js Express application located in the `server/` directory. Key files and logic include:

*   `app.js`: Initializes the Firebase Admin SDK and sets up all middleware and routes.
*   **Middleware:** Implements `authenticate` middleware to verify Firebase ID tokens on protected routes, and `isAdmin` / `isEmployeeOrAdmin` for role-based authorization.
*   **REST API:** Defines a comprehensive set of RESTful routes under `/api/v1/` for Authentication, Content Management (pages, articles), a Ticket System, User Management, and the AI Chatbot.

## Key Features
*   **User Authentication & Authorization:** Secure registration and login using Firebase Authentication. The backend enforces role-based access control (ADMIN, EMPLOYEE, RESIDENT) for different API endpoints.
*   **Content Management System (CMS):** Admins and employees can dynamically manage web content through a dashboard. A generic `ManagementPage` React component is used for CRUD operations across different content types (articles, pages, forms), promoting code reusability. A rich text editor (`react-quill`) is integrated for dynamic content creation.
*   **Ticket/Concern System:** Logged-in residents can submit tickets which are then managed by staff. Staff can update ticket statuses (OPEN, IN_PROGRESS, CLOSED) and communicate with residents via an integrated messaging system within the ticket.
*   **AI Chatbot:** A "Barangay Assistant" powered by Google Genkit and Gemini is trained on the public data in the Firestore database. It maintains conversational context to provide relevant answers to common queries about the barangay.

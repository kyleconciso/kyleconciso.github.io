---
title: "Aling Narcing E-commerce"
date: 2024-09-27
oneliner: "An Android e-commerce app integrated with a Java inventory system via WebSockets for real-time data."
category: "Academic"
stack: ["Android (Kotlin)", "XML (UI)", "Java", "WebSocket", "JSON", "Java Object Serialization"]
video_url: "https://www.youtube.com/embed/ImTx_bgaVyA"
repo_url: "https://www.github.com/kyleconciso/aling-narcing-ecommerce"
---

## Overview
The "Aling Narcing E-commerce" project is a full-stack system that integrates a mobile e-commerce application with an existing Java-based inventory management system. It provides a seamless online shopping experience with real-time product information and transaction capabilities.

## Architecture and Structure
The project follows a client-server architecture.

### Mobile Client (Android App)
This is the user-facing component. The UI Layer is developed using Android XML for layouts, with Kotlin handling the logic and interactivity. It communicates with the Java backend server via defined API endpoints using WebSockets for real-time data exchange.

### Backend Server (Java Application)
This runs in the background and acts as the central hub. The core Java application manages product stock, quantities, and details. It exposes various endpoints (e.g., for GET inventory, login, register) to serve requests from the mobile client and logs these interactions. For the Data Layer, it utilizes Java Object Serialization to persist Inventory and Accounts data to files.

## Key Features
*   **User Account Management:** Customers can register for new accounts and log in securely. The server handles validation for incorrect credentials and non-existent users.
*   **Real-time Product Management:** The app displays a real-time product list with a search bar for filtering. Users can view detailed information for each product.
*   **Full E-commerce Functionality:** Supports a complete shopping workflow, including specifying item quantity, adding to a cart, selecting payment and fulfillment methods (delivery or pickup), and completing checkout.
*   **Order Confirmation:** Upon a successful order, the user receives a confirmation and a detailed order summary/receipt.

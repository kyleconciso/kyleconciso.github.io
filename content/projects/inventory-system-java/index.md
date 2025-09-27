---
title: "Inventory System Java"
date: 2024-09-22
oneliner: "A Java Swing desktop application for inventory, account, and sales management with role-based access."
category: "Academic"
stack: ["Java", "javax.swing", "FlatLaf", "Java Object Serialization", "Apache Ant"]
video_url: "https://www.youtube.com/embed/AXI4nSz5l2s"
repo_url: "https://www.github.com/kyleconciso/inventory-system-java"
---

## Overview
This is a Java Swing desktop application designed to manage inventory, user accounts, and sales transactions for a retail store. It features role-based access control and uses a modern look-and-feel library for its UI.

## Architecture and Structure
The application follows a modular structure, separating the UI from the core logic.

*   **Application UI Layer (`app/`):** Contains all the Swing forms (`.java` and `.form` files), including main frames like `Login.java`, `CheckoutPanel.java`, and `InventoryManagement.java`, as well as various dialogs for adding/editing data.
*   **Core Logic Layer (`libs/core/`):** Contains the business logic and data management classes.
    *   `Accounts.java` & `Inventory.java`: Manage collections of User and Product objects, respectively.
    *   `AppStateManager.java`: A utility class that handles the loading and saving of the application's state (inventory, accounts, cart) by reading/writing serialized objects to `.dat` files.
    *   `Cart.java`, `Product.java`, `User.java`: Model classes representing the main entities of the system.
*   **Error Handling Layer (`libs/errors/`):** Defines custom exception classes like `InvalidUserPassword` and `OverdrawError` for robust error handling.

## Key Features
*   **User Authentication and Roles:** A login screen differentiates between Admin (full access) and User/Cashier (limited access) roles.
*   **Full-Featured Inventory and User Management:** Complete CRUD functionality for both products and user accounts (for admins).
*   **Data Persistence:** All application data is saved to and loaded from `.dat` files using Java Object Serialization, ensuring data is retained between application runs.

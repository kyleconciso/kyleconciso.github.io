---
title: "Java H2 Employee Database App"
date: 2024-09-21
oneliner: "A Java Swing desktop application adhering to MVC, managing employee data with JPA/Hibernate and an embedded H2 database."
category: "Academic"
stack: ["Java", "javax.swing", "H2 Database", "JPA (Hibernate)", "Apache Maven"]
video_url: "https://www.youtube.com/embed/8-i4PHMxCXU"
repo_url: "https://www.github.com/kyleconciso/employee-database-java"
---

## Overview
This is a Java Swing desktop application for managing employee data. It strictly adheres to the Model-View-Controller (MVC) architectural pattern and uses JPA/Hibernate for database interactions with an embedded H2 database.

## Architecture (MVC Pattern)
*   **Model:** Consists of an `Employee.java` JPA Entity class, an `EmployeeRepository.java` for direct database operations using JPA's `EntityManager`, and an `AppModel.java`. The AppModel holds the list of employees and crucially uses `PropertyChangeSupport` to notify the view of data changes, implementing the Observer pattern.
*   **View:** Comprises two Swing forms: `AppView.java`, the main window with a `JTable` to display employees, and `InsertView.java`, a dialog for adding/editing records. `AppView` registers as a `PropertyChangeListener` to the `AppModel` to enable automatic UI updates.
*   **Controller:** The `AppController.java` acts as the mediator. It handles user interactions from the views (button clicks), translates them into model operations (e.g., calling `appModel.persist()`), and manages the visibility of the different views.

## Key Features
*   **Strict MVC Implementation:** Clear separation of concerns between data, presentation, and control logic.
*   **Dynamic UI Updates:** The main employee list automatically refreshes when data changes, thanks to the observer pattern implementation.
*   **JPA/Hibernate Integration:** Uses modern ORM practices for database interaction, configured via `persistence.xml`.
*   **Database Seeding:** On the first run, the application automatically populates the H2 database with 20 sample employee records.

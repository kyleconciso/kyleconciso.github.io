---
title: "Dog Adoption MySQL Spring"
date: 2024-09-24
oneliner: "A full-stack web application for dog adoption, featuring an Angular frontend and a Spring Boot (Java) backend with JPA and MySQL."
category: "Academic, Self-Learning"
stack: ["Angular", "Spring Boot (Java)", "MySQL", "JPA (Hibernate)", "Maven"]
video_url: "https://www.youtube.com/embed/cH2ttRd1eUE"
repo_url: "https://www.github.com/kyleconciso/dog-adoption"
---

## Overview
This is a full-stack application for a dog adoption agency, featuring an Angular frontend and a Spring Boot backend. It provides functionalities for users to browse available dogs and submit adoption requests, while administrators can manage the pet listings and process adoption applications.

## Architecture and Structure
The project adopts a classic client-server architecture, with the Spring Boot application following an MVC (Model-View-Controller) pattern for its backend.

### Backend (Spring Boot Server)
*   **Controllers:** The `AdoptionController` manages API endpoints for adoption requests, while the `DogController` handles API endpoints for dog listings (CRUD operations).
*   **Models:** Data models like `Adoption` and `Dog` are defined as classes with JPA annotations to map them to database tables.
*   **Repositories:** Interfaces such as `AdoptionRepository` extend Spring's `JpaRepository` to leverage automatic CRUD operations without writing boilerplate code.
*   **Services:** Classes like `AdoptionService` and `DogService` contain the core business logic, separating it from the controller layer.

### Frontend (Angular Application)
*   **User Interface:** Designed with reusable Angular components. It includes dedicated sections like `AdminComponent` and `UserComponent` for different user roles.
*   **Routing:** Defines the navigation paths between application pages for a seamless single-page application experience.

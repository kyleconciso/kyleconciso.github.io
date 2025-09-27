---
title: "Vet Clinic App"
date: 2024-09-26
oneliner: "A full-stack mobile application for a vet clinic, featuring a Spring Boot backend and an Android (Jetpack Compose) client."
category: "Academic"
stack: ["Spring Boot", "Java", "JPA", "H2 DB", "Android", "Jetpack Compose", "Kotlin"]
video_url: "https://www.youtube.com/embed/HnkRQcFimBY"
repo_url: "https://github.com/kyleconciso/vet-clinic-app"
---

## Overview
This is a full-stack mobile application for a veterinary clinic, designed to manage pet adoptions. The system consists of a Spring Boot server that provides a REST API and an Android client application built with Jetpack Compose. It supports distinct roles for regular users and administrators.

## Architecture

### Backend (Spring Boot)
*   **Security:** The `SecurityConfig` class uses Spring Security to define a `SecurityFilterChain`. This chain configures endpoint permissions, allowing public access (`/public/**`) while restricting actions like pet management (`/api/dogs/**`) to admin roles. Passwords are hashed before being stored.
*   **REST API:** The `AuthController`, `AdoptionRequestController`, and `DogController` handle all API endpoints for their respective domains.
*   **Database:** An in-memory H2 database is used for fast data persistence, managed via Spring Data JPA repositories which extend `JpaRepository`.

### Frontend (Android)
*   **UI:** Built entirely with Jetpack Compose. Reusable UI elements like `DogCard` are defined as `@Composable` functions that are state-driven, automatically re-rendering when their input data changes.
*   **API Communication:** Retrofit is used to create a typesafe HTTP client interface (`DogAdoptionApi.kt`) for consuming the Spring Boot REST API.
*   **State Management:** The app is structured with ViewModels (`AdminViewModel`, `UserViewModel`, `SharedViewModel`) to hold and manage UI-related data and business logic, separating it from the UI components.
*   **Navigation:** A `NavGraph` composable defines the different screens (Login, Register, Home, etc.) and the navigation flow between them.

## Functionality
*   **User Account:** Users can register, log in, view available pets, and submit adoption requests. They can also view the status of their own requests (Pending, Approved, Rejected).
*   **Admin Account:** Admins can perform all user actions, as well as manage the pet listings (add, edit, delete pets). They can view all adoption requests from all users and update their status.

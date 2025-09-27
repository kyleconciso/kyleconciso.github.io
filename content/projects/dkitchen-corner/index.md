---
title: "DKitchen Corner Bootstrap"
date: 2024-09-25
oneliner: "A responsive, multi-page static website for a Filipino cuisine restaurant, built with HTML, CSS, JavaScript, and Bootstrap 5."
category: "Academic, Self-Learning"
stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5.3", "lightbox.js", "typewriter.js"]
demo_url: "https://dkitchen-corner.netlify.app"
repo_url: "https://www.github.com/kyleconciso/dkitchen-corner"
---

## Overview
This project is a responsive, professional website for a Filipino cuisine restaurant. The website serves as an online presence to provide customers with essential information, including its menu, events, and contact details. It is built with a focus on user-friendliness using the Bootstrap framework and is hosted on Netlify.

## Website Structure
The website is organized into four main pages, accessible via a responsive navigation bar:

*   **About Page (`index.html`):** Features a prominent hero section with a dynamically typed welcome message (using `typewriter.js`) and sections highlighting unique aspects of the restaurant.
*   **Menu Page (`menu.html`):** Displays a Bootstrap carousel for meal categories and presents menu items in a card-based layout.
*   **Events Page (`events.html`):** Includes tables for upcoming/past events and an interactive image gallery using an "image grid" that triggers a `lightbox.js` modal.
*   **Contact Us Page (`contact.html`):** Contains a contact form and an embedded Google Maps iframe for the restaurant's location.

## Key JavaScript Functionality
The site is enhanced with several JavaScript libraries to create a dynamic user experience:

*   **`typewriter.js`:** Targets the `h1.app-typing` element on the homepage and cycles through a predefined list of phrases with a typing and erasing effect.
*   **`lightbox.js`:** Initializes a Bootstrap modal (`#lightbox-modal`). When an image in the `.image-grid` is clicked, it dynamically creates and populates a Bootstrap carousel within the modal, allowing users to navigate through all images in the grid.

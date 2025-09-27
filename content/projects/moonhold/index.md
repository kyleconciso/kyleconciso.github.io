---
title: "Moonhold"
date: 2024-09-29
oneliner: "A 3D survival game for a game jam, featuring custom spherical gravity, procedural planets, and a C# backend in Godot."
category: "Game Jam"
stack: ["Godot Engine", "C#", "GLSL"]
video_url: "https://www.youtube.com/embed/H3IBSqES7IU"
repo_url: "https://www.github.com/Cedeli/Moonhold"
---

## Project Overview
"Moonhold" is a Godot Engine game developed for the MGC Summer Gamejam 2025. The core premise involves players surviving an alien horde on a celestial body until their ship is ready for ignition. The game features a 3D environment, custom physics and gravity systems tailored for spherical worlds, procedural planet generation, and a robust C# backend for game logic, UI, and system management.

## My Role & Contributions
This project was created by a team of three for the MGC Summer Gamejam 2025. As the project's architect, I was specifically responsible for the following:

*   **Core Systems Architecture:** I designed and implemented the game's core architecture, including all foundational manager systems in C# (scene, audio, input, settings).
*   **Game & Entity Logic:** I developed the primary game loop and the C# scripts for all major game entities (Player, Alien, Ship, Items), defining their behaviors, state management, and interaction logic.
*   **UI Implementation:** I was responsible for scripting the UI scenes, including the main menu, HUD, and pause screens, and connecting them to the backend game logic.

## Architecture
The codebase follows a modular design, leveraging Godot's node-based architecture and C# scripting. Key components are organized into logical directories, promoting separation of concerns and reusability. The project uses autoloads (singletons) for global systems like `AudioManager`, `SettingsManager`, and `SceneManager`.

### High-Level Structure:
*   **Core/:** Foundational systems for application-wide management (Audio, Settings, Scene transitions, Context).
*   **Input/:** Dedicated input handling system, abstracting input sources and providing buffering capabilities.
*   **Entity/:** Game objects (Player, Enemies, Ship, Celestial Bodies, Items, Projectiles) with their unique logic and behaviors.
*   **Scenes/:** Defines the game's flow and UI screens (Main Menu, Game, HUD, etc.).
*   **Assets/:** All game resources including 3D models, audio, textures, and custom shaders.
*   **Util/:** Helper classes and resource definitions, particularly for procedural generation parameters.

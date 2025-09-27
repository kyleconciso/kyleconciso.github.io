---
title: "Simple Minesweepers"
date: 2024-09-18
oneliner: "A Java Swing desktop application of the classic Minesweeper game, featuring a customizable board, timer, sound effects, and persistent player statistics."
category: "Academic"
stack: ["Java", "javax.swing", "FlatLaf", "Java Object Serialization"]
video_url: "https://www.youtube.com/embed/c6WGnhwvS3g"
repo_url: "https://www.github.com/kyleconciso/simple-minesweepers"
---

## Overview
"Simple Minesweepers" is a Java Swing desktop application implementing the classic Minesweeper game. It features a customizable game board, a timer, sound effects, and persistent player statistics, with a modern dark-mode aesthetic provided by the FlatLaf library.

## Architecture and Structure
The project is organized into distinct packages for clear separation of concerns:

*   **Application UI Layer (`App/`):** Contains the main Swing forms, including `Start.java` (the menu), `Gameplay.java` (the main game screen), and `Statistics.java` (the leaderboard and stats view).
*   **Minesweeper Game Logic (`Libs/Minesweeper/`):**
    *   `MinesweeperCell.java`: A model class representing a single cell on the board.
    *   `MinesweeperGame.java`: The core game engine. It manages the 2D array of cells and contains the main game logic, including the `sweep()` method, which is a recursive flood-fill algorithm to automatically reveal adjacent empty cells.
*   **Statistics Management (`Libs/Minesweeper/Statistics/`):**
    *   `MinesweeperRecord.java`: A serializable data class for individual game results.
    *   `MinesweeperStatistics.java`: A Singleton class responsible for loading and saving all game records to `statistics.dat` using Java Object Serialization.
*   **Utility Functions (`Libs/Util/`):** Contains helper classes for playing sounds (`SoundPlayer.java`), displaying animated GIFs (`ConfettiEffect.java`), and formatting time.

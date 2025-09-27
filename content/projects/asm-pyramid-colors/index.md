---
title: "ASM Pyramid and Colors"
date: 2024-09-23
oneliner: "A set of two x86 Assembly Language programs demonstrating console output for pattern generation and basic graphics."
category: "Academic, Self-Learning"
stack: ["x86 Assembly", "DOS BIOS (int 10H)", "DOS Services (int 21H)"]
video_url: "https://www.youtube.com/embed/eh8ZevjQiRs"
repo_url: "https://www.github.com/kyleconciso/asm-pyramid-colors"
---

## Overview
This project consists of two separate x86 Assembly language programs for a DOS environment. Each program demonstrates fundamental concepts in low-level programming: one for iterative pattern generation (a numerical pyramid) and another for basic graphical output (colored squares) using BIOS and DOS interrupts.

## Projects

### 1. Pyramid Drawing
#### Logic Breakdown
This program draws a right-aligned pyramid of numbers on the console. It uses nested loops controlled by the `CX` register. The outer loop manages the rows, a second loop prints an increasing number of spaces for indentation, and a third loop prints a decreasing sequence of incrementing digits (e.g., '0123...', '012...', '01...'). `PUSH CX` and `POP CX` are used to save and restore the outer loop's counter to prevent interference from the nested loops. Character output is handled by loading the character into the `DL` register and calling DOS interrupt `int 21h` with `AH=2`.

### 2. Color Squares
#### Logic Breakdown
This program demonstrates basic graphics in text mode by manipulating the screen buffer via BIOS video services (`int 10H`). First, it clears the entire screen by setting the function to scroll/clear (`MOV AH, 6`), targeting the whole window (`MOV AL, 0`), and setting the video attribute in the `BH` register to blue (`00010001b`). Then, it draws two solid red squares by setting the video attribute to red (`01000001b`) and calling `int 10H` again for specific screen coordinate ranges defined by the `CH/CL` (top-left) and `DH/DL` (bottom-right) registers.

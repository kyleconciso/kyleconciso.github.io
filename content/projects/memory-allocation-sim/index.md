---
title: "Memory Allocation First Fit Simulation"
date: 2024-09-20
oneliner: "An interactive Jupyter Notebook simulating memory allocation (First Fit) and CPU scheduling (Round Robin) with real-time visualization."
category: "Academic, Self-Learning"
stack: ["Python", "Numpy", "ipywidgets", "matplotlib"]
video_url: "https://www.youtube.com/embed/VpMAYYD40QE"
repo_url: "https://www.github.com/kyleconciso/mem-allocation-first-fit-simulation"
---

## Overview
This project is a Python-based interactive Jupyter Notebook that simulates memory allocation using the First Fit algorithm and Round-Robin CPU scheduling. It features a GUI built with ipywidgets, matplotlib for real-time visualization, and a benchmarking component to analyze performance.

## Core Logic and Classes
*   **`Process` Class:** Represents a job with attributes for size and remaining execution time.
*   **`MemoryNode` Class:** Inherits from a generic doubly linked list `Node` class to represent individual memory blocks (either free or allocated to a `Process`).
*   **`Memory` Class:** The memory manager. It maintains a linked list of `MemoryNode`s and implements the core algorithms:
    *   `allocate(process)`: Implements the **First Fit** algorithm by traversing the list to find the first free block large enough.
    *   `coalesce()`: Merges adjacent free memory blocks to reduce external fragmentation.
    *   `compact()`: Rearranges memory by moving all allocated blocks to one end.
*   **`Processor` Class:** The CPU scheduler. Its `run()` method contains the main simulation loop, implementing **Round-Robin** scheduling with a time quantum of 1. It orchestrates process allocation, execution, deallocation, and triggers memory management routines at specified intervals.

## Interactive Components
*   **UI (ipywidgets):** An interface built with sliders, text inputs, and buttons allows users to configure simulation parameters like memory size, number of processes, and the timing intervals for compaction and coalescing.
*   **Visualization (matplotlib):** At each time step, a horizontal bar chart is generated to represent the memory state, with different colors for allocated and free blocks, providing a clear visual trace of the simulation.

---
title: "OS CPU Scheduling"
date: 2024-09-19
oneliner: "A collection of C programs implementing various CPU scheduling algorithms (FCFS, SJF, SRTF, RR) and a secure file locking mechanism."
category: "Academic, Self-Learning"
stack: ["C", "UNIX/Linux System Calls (fcntl)"]
video_url: "https://www.youtube.com/embed/XEMlzQb2xQE"
repo_url: "https://www.github.com/kyleconciso/os-cpu-scheduling-c"
---

## Overview
This project consists of five separate C programs, each implementing a fundamental concept in operating systems: four CPU scheduling algorithms and a secure file locking mechanism. They provide practical examples of process management and concurrency control in a UNIX-like environment.

## Implementations

### Scheduling Algorithms
*   **First-Come, First-Served (FCFS):** A non-preemptive algorithm where processes are executed in their arrival order.
*   **Shortest Job First (SJF):** A non-preemptive algorithm that sorts processes by burst time and executes the shortest first.
*   **Shortest Remaining Time First (SRTF):** The preemptive version of SJF. The main logic is a `while` loop that continues until all processes are complete. In each time unit, it finds the arrived process with the minimum remaining time and executes it for one unit.
*   **Round Robin (RR):** A preemptive algorithm where each process gets a fixed time quantum. The logic iterates through the process list, executing each for one quantum or until completion, then moving to the next.

### Secure File Locking
This program demonstrates resource protection using the `fcntl()` system call. The key logic involves:

1.  Opening a file descriptor for the target file.
2.  Setting a lock type to exclusive write lock (`F_WRLCK`).
3.  Calling `fcntl(fd, F_SETLKW, &myFlock)`. The `F_SETLKW` (SET Lock Wait) flag is crucial, as it makes the call a blocking operation. If another process holds the lock, this process will wait indefinitely until the lock is released.
4.  Once the lock is acquired, the process holds it until the user provides input to release it by setting the lock type to `F_UNLCK`.

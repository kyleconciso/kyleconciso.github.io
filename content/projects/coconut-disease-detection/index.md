---
title: "Enhanced Coconut Disease Detection with Lightweight Hybrid VIT-CNN"
date: 2024-09-17
oneliner: "An ongoing thesis research project to improve early disease detection in agriculture by designing and benchmarking a lightweight hybrid VIT-CNN model."
category: "Academic, Thesis/Research"
stack: ["Python", "PyTorch", "TensorFlow", "Vision Transformer (VIT)", "CNN", "MobileViTv3"]
repo_url: "https://www.github.com/kyleconciso/ViT-CNN-Coconut-Disease"
---

## Overview
This is an ongoing thesis project focused on improving the early detection of diseases in coconut trees. The core of the project is the design, training, and benchmarking of a lightweight hybrid Vision Transformer (VIT) and Convolutional Neural Network (CNN) model. The goal is to create a model that is both highly accurate and efficient enough for deployment on resource-constrained devices for in-field analysis.

## Project Methodology
*   **Design a Hybrid Model:** Develop and implement a lightweight hybrid neural network architecture (specifically MobileViTv3) that leverages the strengths of both VITs (for understanding global image context) and CNNs (for extracting local features like textures and edges). This hybrid approach aims to achieve higher accuracy than either model could alone, while maintaining a small footprint.
*   **Build a Specialized Dataset:** Create and augment a specialized four-class dataset for coconut diseases. This involves gathering a base of images and then applying data augmentation techniques (e.g., rotation, scaling, flipping) to increase the dataset's size and diversity, which helps prevent overfitting and improves the model's ability to generalize.
*   **Benchmark Performance:** Rigorously test and validate the model's performance using metrics like accuracy, precision, recall, and F1-score to confirm its effectiveness for deployment on edge devices.
*   **Improve Early Detection:** The ultimate aim is to provide a tool that can help farmers identify diseases earlier, enabling quicker intervention and potentially reducing crop loss.

## Interactive Demonstration
You can run the web-based evaluation portal to execute live client-side inference using the optimized hybrid model configurations (featuring precomputed Grad-CAM attention visualizations):

👉 **[Launch Model Demonstration & Evaluation Portal](demo/)**

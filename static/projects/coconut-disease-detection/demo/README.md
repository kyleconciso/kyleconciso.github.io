# CocoShield: Coconut Disease Classifier Web App

CocoShield is a highly optimized, client-side web application designed to classify coconut leaf diseases using state-of-the-art hybrid Vision Transformer (ViT) and CNN models (such as MobileViTv3, MobileNetV3, and EfficientNet-B0).

Inference is executed **entirely in the user's browser** using ONNX Runtime Web.

## Features

- **Edge Inference**: Runs 100% client-side. No backend server is required.
- **Model Selection**: Switch between multiple trained models (MobileViTv3-XXS, XS, S, MobileNetV3, and EfficientNet-B0) to compare performance and speed.
- **Multiple Inputs**:
  - **Upload**: Drag and drop or browse local image files.
  - **Camera**: Access the device camera to capture real-time frames (ideal for mobile devices in the field).
  - **Samples**: Test the system immediately using preset disease sample images.
- **Actionable Diagnosis**: Displays the predicted disease, severity level, description, and an immediate step-by-step treatment action plan.

## Directory Structure

```text
endgame/app/
├── index.html        # App structure and CDN imports
├── index.css         # Glassmorphic, dark-mode design system
├── index.js          # Preprocessing, ONNX runtime execution, and UI logic
├── models/           # Exported ONNX model graph and weights (.onnx & .onnx.data)
└── samples/          # Sample disease images for testing
```

## How to Run Locally

Because the application fetches ONNX models and WebAssembly binaries, browsers block these requests under the `file://` protocol due to CORS security policies. You must serve the folder using a local web server.

### Using Python (Quickest)

1. Open your terminal.
2. Navigate to this directory:
   ```bash
   cd /home/kyle/Projects/ViT-CNN-Coconut-Disease/paper/final/endgame/app
   ```
3. Start the server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`.

### Using Node.js / npm

If you have `http-server` installed globally:
```bash
npx http-server -p 8000
```

---

## How to Deploy on GitHub Pages

Since the application consists entirely of static assets, it is perfectly suited for hosting on **GitHub Pages** for free.

### Step 1: Create a GitHub Repository
If you haven't already, initialize git in your project, create a repository on GitHub, and push your code:
```bash
git init
git add .
git commit -m "Initialize project and CocoShield web app"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar under the "Code and automation" section, click on **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select "Deploy from a branch".
   - **Branch**: Select `main` (or the branch you pushed to) and specify the directory path `/paper/final/endgame/app` (or configure your repository structure so that the `app/` folder is at the root of a branch like `gh-pages`).

### Alternative: Deploying via `gh-pages` npm package
If you want to isolate the web application to its own branch for clean hosting:

1. Install the `gh-pages` CLI tool:
   ```bash
   npm install -g gh-pages
   ```
2. Run the deployment command pointing to the app directory:
   ```bash
   gh-pages -d /home/kyle/Projects/ViT-CNN-Coconut-Disease/paper/final/endgame/app
   ```
This will automatically create a `gh-pages` branch in your repository and push the static files there. GitHub will then publish it under `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

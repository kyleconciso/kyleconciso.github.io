const CLASSES = ['Bud Rot', 'Gray Leaf Spot', 'Leaf Rot', 'Stem Bleeding'];

const MODEL_CONFIGS = {
    'mobilevitv3_xxs': { size: 256, path: 'models/mobilevitv3_xxs.onnx' },
    'mobilevitv3_xs': { size: 256, path: 'models/mobilevitv3_xs.onnx' },
    'mobilevitv3_s': { size: 256, path: 'models/mobilevitv3_s.onnx' },
    'mobilenetv3_small_100': { size: 224, path: 'models/mobilenetv3_small_100.onnx' },
    'efficientnet_b0': { size: 224, path: 'models/efficientnet_b0.onnx' }
};

let activeTab = 'upload-tab';
let currentModelName = 'mobilevitv3_xs';
let currentImageElement = null;
const sessionCache = {};
let stream = null;
let isPresetSample = false;
let currentSamplePath = null;
let currentViewMode = 'original'; 

let modelSelect, specArch, specParams, specFlops, specF1, specSize;
let tabBtns, tabContents;
let dropzone, fileInput;
let video, canvasCapture, viewfinder, startCameraBtn, captureBtn;
let sampleItems;
let imagePreview, previewPlaceholder, imageDimensions;
let modelStatus, statusText;
let predictionsList;
let inspectionControls, btnViewOriginal, btnViewGradcam, gradcamNote;

document.addEventListener('DOMContentLoaded', () => {

    modelSelect = document.getElementById('model-select');
    specArch = document.getElementById('spec-arch');
    specParams = document.getElementById('spec-params');
    specFlops = document.getElementById('spec-flops');
    specF1 = document.getElementById('spec-f1');
    specSize = document.getElementById('spec-size');

    tabBtns = document.querySelectorAll('.tab-btn');
    tabContents = document.querySelectorAll('.tab-content');

    dropzone = document.getElementById('dropzone');
    fileInput = document.getElementById('file-input');

    video = document.getElementById('video');
    canvasCapture = document.getElementById('canvas-capture');
    viewfinder = document.getElementById('camera-viewfinder');
    startCameraBtn = document.getElementById('start-camera');
    captureBtn = document.getElementById('capture-btn');

    sampleItems = document.querySelectorAll('.sample-card');

    imagePreview = document.getElementById('image-preview');
    previewPlaceholder = document.getElementById('preview-placeholder');
    imageDimensions = document.getElementById('image-dimensions');

    modelStatus = document.getElementById('model-status');
    statusText = document.getElementById('status-text');

    predictionsList = document.getElementById('predictions-list');

    inspectionControls = document.getElementById('inspection-controls');
    btnViewOriginal = document.getElementById('btn-view-original');
    btnViewGradcam = document.getElementById('btn-view-gradcam');
    gradcamNote = document.getElementById('gradcam-note');

    btnViewOriginal.addEventListener('click', () => {
        if (currentViewMode === 'original') return;
        currentViewMode = 'original';
        btnViewOriginal.classList.add('active');
        btnViewGradcam.classList.remove('active');
        if (currentImageElement) {
            imagePreview.src = currentImageElement.src;
        }
    });

    btnViewGradcam.addEventListener('click', () => {
        if (currentViewMode === 'gradcam') return;
        if (!isPresetSample || !currentSamplePath) return;
        currentViewMode = 'gradcam';
        btnViewGradcam.classList.add('active');
        btnViewOriginal.classList.remove('active');
        imagePreview.src = currentSamplePath.replace('_sample.jpg', '_gradcam.jpg');
    });

    modelSelect.addEventListener('change', (e) => {
        const option = e.target.options[e.target.selectedIndex];
        currentModelName = e.target.value;

        specParams.textContent = option.dataset.params;
        specFlops.textContent = option.dataset.flops + " GFLOPs";
        specF1.textContent = option.dataset.f1;
        specSize.textContent = option.dataset.size;

        if (currentModelName.startsWith('mobilevit')) {
            specArch.textContent = 'MobileViTv3 (Hybrid)';
        } else if (currentModelName.includes('mobilenet')) {
            specArch.textContent = 'MobileNetV3 (CNN Baseline)';
        } else {
            specArch.textContent = 'EfficientNet-B0 (CNN Baseline)';
        }

        showToast(`Loaded Configuration: ${currentModelName}`, 'success');

        if (currentImageElement) {
            classifyImage(currentImageElement);
        }
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUploadedFile(e.target.files[0]);
        }
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUploadedFile(e.dataTransfer.files[0]);
        }
    });

    startCameraBtn.addEventListener('click', toggleCamera);
    captureBtn.addEventListener('click', captureFrame);

    sampleItems.forEach(item => {
        item.addEventListener('click', () => {
            sampleItems.forEach(s => s.classList.remove('selected'));
            item.classList.add('selected');

            const imagePath = item.dataset.path;

            updateStatus('loading', 'Loading preset sample...');

            const img = new Image();

            img.src = imagePath;
            img.onload = () => {
                showPreview(img, true, imagePath);
                classifyImage(img);
            };
            img.onerror = () => {
                showToast(`Failed to load evaluation sample: ${imagePath}`, 'error');
                updateStatus('error', 'Sample loading failed');
            };
        });
    });
});

function switchTab(tabId) {
    activeTab = tabId;

    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    if (tabId !== 'camera-tab' && stream) {
        stopCamera();
    }
}

function handleUploadedFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Invalid file type. Please upload an image.', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            showPreview(img, false, null);
            classifyImage(img);
        };
    };
    reader.readAsDataURL(file);
}

async function toggleCamera() {
    if (stream) {
        stopCamera();
    } else {
        try {
            updateStatus('loading', 'Initializing camera hardware...');
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
                audio: false
            });

            video.srcObject = stream;
            video.style.display = 'block';
            viewfinder.innerHTML = '';
            viewfinder.appendChild(video);

            startCameraBtn.textContent = 'Deactivate Camera';
            startCameraBtn.classList.replace('btn-secondary', 'btn-secondary'); 
            captureBtn.disabled = false;
            updateStatus('info', 'Video capture active. Position target in field of view.');
        } catch (err) {
            console.error('Camera access failed:', err);
            showToast('Unable to initialize video hardware.', 'error');
            updateStatus('error', 'Camera initialization failed');
        }
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    video.srcObject = null;
    video.style.display = 'none';

    viewfinder.innerHTML = `
        <i class="fa-solid fa-camera camera-placeholder-icon"></i>
        <span>Camera stream inactive</span>
    `;

    startCameraBtn.textContent = 'Initialize Camera';
    captureBtn.disabled = true;
    updateStatus('info', 'Video hardware inactive');
}

function captureFrame() {
    if (!stream) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvasCapture.width = size;
    canvasCapture.height = size;

    const ctx = canvasCapture.getContext('2d');

    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;

    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

    const imgDataUrl = canvasCapture.toDataURL('image/jpeg');
    const img = new Image();
    img.src = imgDataUrl;
    img.onload = () => {
        showPreview(img, false, null);
        classifyImage(img);
        stopCamera();
        showToast('Frame captured successfully.', 'success');
    };
}

function showPreview(img, isSample = false, samplePath = null) {
    currentImageElement = img;
    isPresetSample = isSample;
    currentSamplePath = samplePath;

    if (isSample) {
        currentViewMode = 'gradcam';
        btnViewGradcam.disabled = false;
        btnViewGradcam.classList.add('active');
        btnViewOriginal.classList.remove('active');
        gradcamNote.style.display = 'none';

        imagePreview.src = samplePath.replace('_sample.jpg', '_gradcam.jpg');
    } else {
        currentViewMode = 'original';
        btnViewGradcam.disabled = true;
        btnViewGradcam.classList.remove('active');
        btnViewOriginal.classList.add('active');
        gradcamNote.style.display = 'block';

        imagePreview.src = img.src;
    }

    inspectionControls.style.display = 'flex';
    imagePreview.style.display = 'block';
    previewPlaceholder.style.display = 'none';

    imageDimensions.textContent = `${img.naturalWidth} x ${img.naturalHeight} px`;
    imageDimensions.style.display = 'block';
}

async function classifyImage(img) {
    const config = MODEL_CONFIGS[currentModelName];
    if (!config) return;

    updateStatus('loading', `Loading model ${currentModelName}.onnx...`);

    try {

        let session = sessionCache[currentModelName];
        if (!session) {

            const options = { executionProviders: ['wasm'] };
            session = await ort.InferenceSession.create(config.path, options);
            sessionCache[currentModelName] = session;
        }

        updateStatus('loading', 'Pre-processing input image tensor...');

        const size = config.size;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const minDim = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - minDim) / 2;
        const sy = (img.naturalHeight - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size);
        const floatData = new Float32Array(1 * 3 * size * size);

        const mean = [0.485, 0.456, 0.406];
        const std = [0.229, 0.224, 0.225];

        const channelLength = size * size;
        for (let i = 0; i < channelLength; i++) {
            const r = imgData.data[i * 4];
            const g = imgData.data[i * 4 + 1];
            const b = imgData.data[i * 4 + 2];

            floatData[i] = (r / 255.0 - mean[0]) / std[0]; 
            floatData[channelLength + i] = (g / 255.0 - mean[1]) / std[1]; 
            floatData[2 * channelLength + i] = (b / 255.0 - mean[2]) / std[2]; 
        }

        const inputTensor = new ort.Tensor('float32', floatData, [1, 3, size, size]);

        updateStatus('loading', 'Executing WebAssembly inference pipeline...');

        const startTime = performance.now();
        const feeds = { input: inputTensor };
        const results = await session.run(feeds);
        const endTime = performance.now();

        const latency = (endTime - startTime).toFixed(1);
        const logits = results.output.data;

        const maxLogit = Math.max(...logits);
        const exps = Array.from(logits).map(x => Math.exp(x - maxLogit));
        const sumExps = exps.reduce((a, b) => a + b, 0);
        const probs = exps.map(x => x / sumExps);

        renderResults(probs);
        updateStatus('success', `Inference finished: Latency = ${latency} ms | Provider = WASM`);

    } catch (err) {
        console.error('Classification error:', err);
        updateStatus('error', `Inference failed: ${err.message}`);
        showToast('Error executing model evaluation.', 'error');
    }
}

function renderResults(probs) {
    predictionsList.innerHTML = '';

    const sortedIndices = probs
        .map((prob, idx) => ({ prob, idx }))
        .sort((a, b) => b.prob - a.prob);

    sortedIndices.forEach(({ prob, idx }, orderIdx) => {
        const className = CLASSES[idx];
        const isHighest = orderIdx === 0;

        const row = document.createElement('div');
        row.className = `pred-row ${isHighest ? 'highest' : ''}`;

        const pct = (prob * 100).toFixed(2);
        row.innerHTML = `
            <div class="pred-info">
                <span class="class-name">${className}</span>
                <span class="pred-val">${pct}%</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: 0%"></div>
            </div>
        `;

        predictionsList.appendChild(row);

        setTimeout(() => {
            row.querySelector('.progress-bar-fill').style.width = `${pct}%`;
        }, 50);
    });

    predictionsList.style.display = 'flex';
}

function updateStatus(type, message) {
    statusText.textContent = message;

    const indicator = modelStatus.querySelector('.status-indicator');
    indicator.className = 'status-indicator fa-solid';

    switch (type) {
        case 'loading':
            indicator.classList.add('fa-spinner', 'loading');
            break;
        case 'success':
            indicator.classList.add('fa-circle-check', 'success');
            break;
        case 'error':
            indicator.classList.add('fa-circle-exclamation', 'error');
            break;
        case 'info':
        default:
            indicator.classList.add('fa-circle-dot');
            break;
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Fonctionnalités : pinceau, gomme, couleurs, taille variable
// ==================== SÉLECTION DES ÉLÉMENTS ====================
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

// Configuration initiale du canvas
let drawing = false;
let currentTool = 'brush'; // 'brush' ou 'eraser'
let currentColor = '#000000';
let brushSize = 5;

// Éléments DOM
const brushBtn = document.getElementById('brushBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const brushSizeInput = document.getElementById('brushSize');
const sizeValueSpan = document.getElementById('sizeValue');
const customColorPicker = document.getElementById('customColor');

// ==================== INITIALISATION ====================
function initCanvas() {
    // Configuration du contexte de dessin
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

// Appliquer les paramètres actuels
function applySettings() {
    if (currentTool === 'eraser') {
        ctx.strokeStyle = '#FFFFFF';
    } else {
        ctx.strokeStyle = currentColor;
    }
    ctx.lineWidth = brushSize;
}

// ==================== DESSIN ====================
function startDrawing(e) {
    drawing = true;
    const pos = getMousePosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!drawing) return;
    const pos = getMousePosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// Obtenir la position exacte de la souris sur le canvas
function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if (e.touches) {
        // Pour le tactile
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    return { x: Math.min(Math.max(0, x), canvas.width), y: Math.min(Math.max(0, y), canvas.height) };
}

// ==================== OUTILS ====================
function setBrush() {
    currentTool = 'brush';
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    applySettings();
}

function setEraser() {
    currentTool = 'eraser';
    eraserBtn.classList.add('active');
    brushBtn.classList.remove('active');
    applySettings();
}

function clearCanvas() {
    if (confirm('🗑️ Voulez-vous vraiment tout effacer ?')) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'mon-dessin.png';
    link.href = canvas.toDataURL();
    link.click();
}

// ==================== COULEURS ====================
function setColor(color) {
    currentColor = color;
    customColorPicker.value = color;
    if (currentTool === 'brush') {
        applySettings();
    }
}

// ==================== TAILLE PINCEAU ====================
function updateBrushSize() {
    brushSize = parseInt(brushSizeInput.value);
    sizeValueSpan.textContent = brushSize + 'px';
    applySettings();
}

// ==================== RACCOURCIS CLAVIER ====================
function handleKeyboard(e) {
    const key = e.key.toLowerCase();
    
    switch(key) {
        case 'b':
            setBrush();
            break;
        case 'e':
            setEraser();
            break;
        case 'c':
            clearCanvas();
            break;
        case 's':
            saveCanvas();
            break;
        case '+':
        case '=':
            brushSize = Math.min(50, brushSize + 2);
            brushSizeInput.value = brushSize;
            updateBrushSize();
            break;
        case '-':
            brushSize = Math.max(1, brushSize - 2);
            brushSizeInput.value = brushSize;
            updateBrushSize();
            break;
    }
}

// ==================== ÉVÉNEMENTS ====================
// Souris
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Tactile (mobile)
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Boutons
brushBtn.addEventListener('click', setBrush);
eraserBtn.addEventListener('click', setEraser);
clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveCanvas);

// Taille
brushSizeInput.addEventListener('input', updateBrushSize);

// Couleurs prédéfinies
document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', () => {
        const color = box.getAttribute('data-color');
        setColor(color);
    });
});

// Couleur personnalisée
customColorPicker.addEventListener('input', (e) => {
    setColor(e.target.value);
});

// Raccourcis clavier
document.addEventListener('keydown', handleKeyboard);

// ==================== LANCEMENT ====================
initCanvas();
applySettings();

// Ajustement pour mobile : empêcher le scroll pendant le dessin
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
});




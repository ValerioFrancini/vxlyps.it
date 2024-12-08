// script.js

const canvas = document.getElementById('canvas');
const draggables = document.querySelectorAll('.draggable');
const resetBtn = document.getElementById('reset-btn');

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;
let zoomLevel = 1;

// Dragging canvas
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
});

// Zooming canvas
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    zoomLevel += e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
    zoomLevel = Math.max(0.5, Math.min(zoomLevel, 3)); // Limit zoom range between 0.5 and 3
    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
});

// Reset canvas
resetBtn.addEventListener('click', () => {
    offsetX = 0;
    offsetY = 0;
    zoomLevel = 1;
    canvas.style.transform = `translate(0, 0) scale(1)`;
});

// Clickable images with fade-out effect
draggables.forEach((image) => {
    image.addEventListener('click', (e) => {
        e.stopPropagation();
        image.classList.add('fade-out');
        setTimeout(() => {
            image.classList.remove('fade-out');
        }, 1000); // Reset the image after 1 second
    });
});

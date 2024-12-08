const canvas = document.getElementById("canvas");
const images = document.querySelectorAll(".draggable");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

// Enable canvas dragging
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - canvas.offsetLeft;
  startY = e.pageY - canvas.offsetTop;
  scrollLeft = window.scrollX;
  scrollTop = window.scrollY;
  canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
  canvas.style.cursor = "grab";
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
  canvas.style.cursor = "grab";
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - canvas.offsetLeft;
  const y = e.pageY - canvas.offsetTop;
  const walkX = x - startX;
  const walkY = y - startY;
  window.scrollTo(scrollLeft - walkX, scrollTop - walkY);
});

// Handle image clicks to zoom
images.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = img.src;
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

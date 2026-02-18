// Cursore personalizzato con movimento smooth
(function () {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  const lag = 0.18; // più basso = più lento

  function updateCursorPosition() {
    cursorX += (mouseX - cursorX) * lag;
    cursorY += (mouseY - cursorY) * lag;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(updateCursorPosition);
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Gestione stato interattivo su link e bottoni
  const interactiveSelectors = [
    "a",
    "button",
    "[role='button']",
    "input",
    "textarea",
    "select",
  ];

  function setInteractiveState(active) {
    if (!cursor) return;
    if (active) {
      cursor.classList.add("cursor-interactive");
    } else {
      cursor.classList.remove("cursor-interactive");
    }
  }

  interactiveSelectors.forEach((selector) => {
    document.addEventListener(
      "mouseover",
      (e) => {
        if (e.target.closest(selector)) {
          setInteractiveState(true);
        }
      },
      true
    );

    document.addEventListener(
      "mouseout",
      (e) => {
        if (e.target.closest(selector)) {
          setInteractiveState(false);
        }
      },
      true
    );
  });

  // Nascondi cursore custom quando si esce dalla finestra
  window.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  window.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  // Imposta anno nel footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Avvia animazione
  requestAnimationFrame(updateCursorPosition);
})();

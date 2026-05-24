/* =========================================
   PROJECT MODAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalShortDesc = document.getElementById("modalShortDesc");
  const modalShortDesc2 = document.getElementById("modalShortDesc2");
  const modalLongDesc = document.getElementById("modalLongDesc");
  const modalTools = document.getElementById("modalTools");

  const modalThumbnail = document.getElementById("modalThumbnail");
  const modalDashboardImage = document.getElementById("modalDashboardImage");

  const prevBtn = document.getElementById("dashPrev");
  const nextBtn = document.getElementById("dashNext");
  const modalDownload = document.getElementById("modalDownload");

  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  const PLACEHOLDER_IMAGE = "assets/images/placeholder.png";

  let shots = [];
  let currentIndex = 0;

  /* LIGHTBOX ZOOM */
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  let initialPinchDistance = 0;
  let initialScale = 1;

  /* MOBILE LIGHTBOX SWIPE */
  let lightboxTouchStartX = 0;
  let lightboxTouchEndX = 0;

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;

    if (lightboxImage) {
      lightboxImage.style.transform =
        "translate(0px, 0px) scale(1)";
      lightboxImage.style.cursor = "grab";
    }
  }

  function updateZoom() {
    if (!lightboxImage) return;

    lightboxImage.style.transform =
      `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function getDistance(t1, t2) {
    return Math.hypot(
      t2.clientX - t1.clientX,
      t2.clientY - t1.clientY
    );
  }

  /* IMAGE FALLBACK */
  if (modalDashboardImage) {
    modalDashboardImage.onerror = () => {
      modalDashboardImage.src = PLACEHOLDER_IMAGE;
    };
  }

  if (modalThumbnail) {
    modalThumbnail.onerror = () => {
      modalThumbnail.src = PLACEHOLDER_IMAGE;
    };
  }

  /* LIGHTBOX */
  function openLightbox(src) {
    if (!lightbox || !lightboxImage || !src) return;

    lightboxImage.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    resetZoom();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    resetZoom();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* MOUSE WHEEL ZOOM */
  if (lightboxImage) {
    lightboxImage.addEventListener("wheel", (e) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      scale += delta;

      if (scale < 1) scale = 1;
      if (scale > 5) scale = 5;

      updateZoom();
    });
  }

  /* DESKTOP DRAG PAN */
  if (lightboxImage) {
    lightboxImage.addEventListener("mousedown", (e) => {
      if (scale <= 1) return;

      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;

      lightboxImage.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      translateX = e.clientX - startX;
      translateY = e.clientY - startY;

      updateZoom();
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;

      if (lightboxImage) {
        lightboxImage.style.cursor = "grab";
      }
    });
  }

  /* MOBILE PINCH + SWIPE LIGHTBOX */
  if (lightboxImage) {
    lightboxImage.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        initialPinchDistance = getDistance(
          e.touches[0],
          e.touches[1]
        );
        initialScale = scale;
      }

      if (e.touches.length === 1) {
        lightboxTouchStartX = e.touches[0].screenX;

        if (scale > 1) {
          startX = e.touches[0].clientX - translateX;
          startY = e.touches[0].clientY - translateY;
        }
      }
    });

    lightboxImage.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const currentDistance = getDistance(
          e.touches[0],
          e.touches[1]
        );

        scale =
          initialScale *
          (currentDistance / initialPinchDistance);

        if (scale < 1) scale = 1;
        if (scale > 5) scale = 5;

        updateZoom();
      }

      if (e.touches.length === 1 && scale > 1) {
        e.preventDefault();

        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;

        updateZoom();
      }
    });

    lightboxImage.addEventListener("touchend", (e) => {
      if (scale > 1) return;
      if (shots.length <= 1) return;

      lightboxTouchEndX = e.changedTouches[0].screenX;

      const swipeDistance =
        lightboxTouchStartX - lightboxTouchEndX;

      if (
        swipeDistance > 50 &&
        currentIndex < shots.length - 1
      ) {
        currentIndex++;
        lightboxImage.src = shots[currentIndex].img;
        resetZoom();
      }

      if (
        swipeDistance < -50 &&
        currentIndex > 0
      ) {
        currentIndex--;
        lightboxImage.src = shots[currentIndex].img;
        resetZoom();
      }
    });
  }

  /* ARROWS */
  function updateArrows() {
    if (!prevBtn || !nextBtn) return;

    if (shots.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }

    prevBtn.style.display =
      currentIndex > 0 ? "flex" : "none";

    nextBtn.style.display =
      currentIndex < shots.length - 1
        ? "flex"
        : "none";
  }

  function loadDashboardImage(index) {
    if (!shots.length) {
      modalDashboardImage.src = PLACEHOLDER_IMAGE;
      return;
    }

    modalDashboardImage.src =
      shots[index]?.img || PLACEHOLDER_IMAGE;

    updateArrows();
  }

  function resetModal() {
    shots = [];
    currentIndex = 0;

    modalTitle.textContent = "";
    modalCategory.textContent = "";
    modalShortDesc.textContent = "";
    modalShortDesc2.textContent = "";
    modalLongDesc.textContent = "";

    modalTools.innerHTML = "";

    modalThumbnail.src = PLACEHOLDER_IMAGE;
    modalDashboardImage.src = PLACEHOLDER_IMAGE;

    modalDownload.href = "#";

    updateArrows();
  }

  /* OPEN MODAL */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-view-btn");
    if (!btn) return;

    resetModal();

    modalTitle.textContent =
      btn.dataset.title || "Project";

    modalCategory.textContent =
      btn.dataset.category || "Project";

    modalShortDesc.textContent =
      btn.dataset.short || "";

    modalShortDesc2.textContent =
      btn.dataset.short2 || "";

    modalLongDesc.textContent =
      btn.dataset.long || "";

    if (btn.dataset.tools) {
      const toolList = btn.dataset.tools.split(",");

      toolList.forEach((toolSrc) => {
        const img = document.createElement("img");
        img.src = toolSrc.trim();
        img.alt = "Tool";
        img.loading = "lazy";
        modalTools.appendChild(img);
      });
    }

    modalThumbnail.src =
      btn.dataset.thumb || PLACEHOLDER_IMAGE;

    modalThumbnail.onclick = () => {
      currentIndex = 0;
      openLightbox(modalThumbnail.src);
    };

    try {
      shots = JSON.parse(
        btn.dataset.shots || "[]"
      ).filter((shot) => shot.img);
    } catch {
      shots = [];
    }

    currentIndex = 0;
    loadDashboardImage(currentIndex);

    modalDownload.href =
      btn.dataset.download || "#";

    const bootstrapModal =
      new bootstrap.Modal(projectModal);

    bootstrapModal.show();
  });

  /* PREVIEW CLICK */
  if (modalDashboardImage) {
    modalDashboardImage.addEventListener("click", () => {
      openLightbox(
        shots[currentIndex]?.img ||
        modalDashboardImage.src
      );
    });
  }

  /* PREV */
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      loadDashboardImage(currentIndex);
    });
  }

  /* NEXT */
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex >= shots.length - 1) return;
      currentIndex++;
      loadDashboardImage(currentIndex);
    });
  }

  /* MODAL PREVIEW SWIPE */
  let touchStartX = 0;
  let touchEndX = 0;

  if (modalDashboardImage) {
    modalDashboardImage.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) return;
      touchStartX = e.changedTouches[0].screenX;
    });

    modalDashboardImage.addEventListener("touchend", (e) => {
      if (scale > 1) return;

      touchEndX = e.changedTouches[0].screenX;

      const swipeDistance = touchStartX - touchEndX;

      if (
        swipeDistance > 50 &&
        currentIndex < shots.length - 1
      ) {
        nextBtn?.click();
      }

      if (
        swipeDistance < -50 &&
        currentIndex > 0
      ) {
        prevBtn?.click();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  projectModal.addEventListener("hidden.bs.modal", () => {
    resetModal();
    closeLightbox();
  });
});

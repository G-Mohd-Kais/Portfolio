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

  const PLACEHOLDER_IMAGE = "assets/images/placeholder.png";

  let shots = [];
  let currentIndex = 0;

  /* =========================================
     IMAGE FALLBACK
  ========================================= */

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

  /* =========================================
     UPDATE ARROWS
  ========================================= */

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

  /* =========================================
     LOAD DASHBOARD IMAGE
  ========================================= */

  function loadDashboardImage(index) {
    if (!shots.length) {
      modalDashboardImage.src = PLACEHOLDER_IMAGE;
      return;
    }

    modalDashboardImage.src =
      shots[index]?.img || PLACEHOLDER_IMAGE;

    updateArrows();
  }

  /* =========================================
     RESET MODAL
  ========================================= */

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

  /* =========================================
     OPEN MODAL
  ========================================= */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-view-btn");

    if (!btn) return;

    resetModal();

    /* TEXT */
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

    /* TOOLS */
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

    /* THUMBNAIL */
    modalThumbnail.src =
      btn.dataset.thumb || PLACEHOLDER_IMAGE;

    /* DASHBOARD SHOTS */
    try {
      shots = JSON.parse(
        btn.dataset.shots || "[]"
      ).filter((shot) => shot.img);
    } catch (error) {
      shots = [];
      console.error("Invalid shots JSON:", error);
    }

    currentIndex = 0;

    loadDashboardImage(currentIndex);

    /* DOWNLOAD LINK */
    modalDownload.href =
      btn.dataset.download || "#";

    /* OPEN */
    const bootstrapModal =
      new bootstrap.Modal(projectModal);

    bootstrapModal.show();
  });

  /* =========================================
     PREVIOUS
  ========================================= */

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex <= 0) return;

      currentIndex--;
      loadDashboardImage(currentIndex);
    });
  }

  /* =========================================
     NEXT
  ========================================= */

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex >= shots.length - 1) return;

      currentIndex++;
      loadDashboardImage(currentIndex);
    });
  }

  /* =========================================
     CLEANUP ON CLOSE
  ========================================= */

  projectModal.addEventListener(
    "hidden.bs.modal",
    resetModal
  );
});
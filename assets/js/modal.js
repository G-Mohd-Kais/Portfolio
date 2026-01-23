document.addEventListener("DOMContentLoaded", function () {

  const projectModal = document.getElementById("projectModal");

  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalShortDesc = document.getElementById("modalShortDesc");
  const modalShortDesc2 = document.getElementById("modalShortDesc2");
  const modalLongDesc = document.getElementById("modalLongDesc");
  const modalTools = document.getElementById("modalTools");

  const modalThumbnail = document.getElementById("modalThumbnail");
  const modalDashboardImage = document.getElementById("modalDashboardImage");

  modalDashboardImage.onerror = () => {
  modalDashboardImage.src = "assets/images/placeholder.png";
  };

  const prevBtn = document.getElementById("dashPrev");
  const nextBtn = document.getElementById("dashNext");
  const modalDownload = document.getElementById("modalDownload");

  let shots = [];
  let currentIndex = 0;

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".project-view-btn");
    if (!btn) return;

    // Text content
    modalTitle.textContent = btn.dataset.title;
    modalCategory.textContent = btn.dataset.category;
    modalShortDesc.textContent = btn.dataset.short;
    modalShortDesc2.textContent = btn.dataset.short2 || "";
    modalLongDesc.textContent = btn.dataset.long;

    // Tools
    modalTools.innerHTML = "";
    btn.dataset.tools.split(",").forEach(src => {
      const img = document.createElement("img");
      img.src = src.trim();
      img.style.width = "32px";
      modalTools.appendChild(img);
    });

    // Thumbnail (separate image)
    modalThumbnail.src = btn.dataset.thumb || "";

    // Dashboard images
    shots = JSON.parse(btn.dataset.shots || "[]").filter(s => s.img);
    currentIndex = 0;

    if (shots.length > 0) {
      modalDashboardImage.src = shots[0].img;
    }

    // Download
    modalDownload.href = btn.dataset.download || "#";

    updateArrows();

    new bootstrap.Modal(projectModal).show();
  });

  function updateArrows() {
    prevBtn.style.display = currentIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentIndex < shots.length - 1 ? "block" : "none";
  }

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      modalDashboardImage.src = shots[currentIndex].img;
      updateArrows();
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < shots.length - 1) {
      currentIndex++;
      modalDashboardImage.src = shots[currentIndex].img;
      updateArrows();
    }
  };

});

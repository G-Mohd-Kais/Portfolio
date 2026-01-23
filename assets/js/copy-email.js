const emailBox = document.querySelector(".email-box");
const toast = document.getElementById("copyToast");

if (emailBox && toast) {
  emailBox.addEventListener("click", () => {
    navigator.clipboard.writeText("gmohammedkais@gmail.com");

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 1500);
  });
}

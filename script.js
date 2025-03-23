// =====================
// PDF.js Worker Path Fix
// =====================
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";

// =====================
// Show PDF Preview on Hover
// =====================
let previewTimeout;

function showPreview(pdfUrl) {
    const preview = document.getElementById("pdf-preview");
    const canvas = document.getElementById("pdf-canvas");
    const ctx = canvas.getContext("2d");

    // Center preview on screen
    preview.style.top = "50%";
    preview.style.left = "50%";
    preview.style.transform = "translate(-50%, -50%)";
    preview.style.display = "block";

    // Load and render the PDF
    pdfjsLib
        .getDocument(pdfUrl)
        .promise.then(function (pdf) {
            pdf.getPage(1).then(function (page) {
                const scale = 0.75; // Zoom level for better quality
                const viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                page.render(renderContext);
            });
        })
        .catch(function (error) {
            console.error("Error loading PDF:", error);
        });
}

// =====================
// Hide PDF Preview with Delay
// =====================
function hidePreview() {
    previewTimeout = setTimeout(() => {
        document.getElementById("pdf-preview").style.display = "none";
    }, 200); // Small delay to prevent flickering
}

// =====================
// Cancel Hide on Re-Enter
// =====================
function cancelHide() {
    clearTimeout(previewTimeout);
}

// =====================
// AJAX Form Submission
// =====================
$(document).ready(function () {
    $("#contact-form").submit(function (e) {
        e.preventDefault(); // Prevent default form submission

        // Disable submit button to prevent duplicate requests
        $("#submit-btn").attr("disabled", true).text("Sending...");

        // Collect form data
        var formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: "POST",
            url: "send_mail.php", // PHP script to handle email sending
            data: formData,
            success: function (response) {
                // Show success message
                $("#message-status").html(
                    `<div class="alert alert-success">✅ ${response}</div>`
                );
                $("#contact-form")[0].reset(); // Reset form after submission

                // Clear message after 5 seconds
                setTimeout(function () {
                    $("#message-status").html("");
                }, 5000);
            },
            error: function (xhr, status, error) {
                // Show error message if request fails
                $("#message-status").html(
                    `<div class="alert alert-danger">❌ Failed to send message. Error: ${error}</div>`
                );

                // Clear error message after 5 seconds
                setTimeout(function () {
                    $("#message-status").html("");
                }, 5000);
            },
            complete: function () {
                // Re-enable submit button after request completes
                $("#submit-btn").attr("disabled", false).text("Send");
            },
        });
    });
});

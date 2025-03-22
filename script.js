<script>
    // Show PDF preview on hover
    function showPreview(pdfUrl, event) {
        const preview = document.getElementById('pdf-preview');
        const canvas = document.getElementById('pdf-canvas');
        const ctx = canvas.getContext('2d');

        // Set preview position near the cursor
        preview.style.top = `${event.pageY + 10}px`;  // <-- Correct position
        preview.style.left = `${event.pageX + 10}px`; // <-- Correct position
        preview.style.display = 'block';

        // Load and render the PDF
        pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
            pdf.getPage(1).then(function(page) {
                const scale = 1.0; // Set zoom level
                const viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                page.render(renderContext);
            });
        });
    }

    // Hide preview on mouse out
    function hidePreview() {
        document.getElementById('pdf-preview').style.display = 'none';
    }
</script>

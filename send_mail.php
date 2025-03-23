<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Your Gmail Configuration
    $to = "mohdkais730@gmail.com";  // Replace with your Gmail address
    $subject = "New Contact Form Submission";
    $body = "You have received a new message from: $email\n\nMessage:\n$message";

    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send Email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>
                alert('✅ Message sent successfully!');
                window.location.href = 'index.html'; // Redirect to homepage or any other page
              </script>";
    } else {
        echo "<script>
                alert('❌ Failed to send message. Please try again later.');
                window.location.href = 'index.html'; // Redirect to homepage or any other page
              </script>";
    }
} else {
    echo "<script>
            alert('❗ Invalid Request!');
            window.location.href = 'index.html';
          </script>";
}
?>

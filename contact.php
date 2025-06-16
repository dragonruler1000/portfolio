<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"] ?? "");

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form correctly.";
        exit;
    }

    // ✅ Cloudflare Turnstile Verification
    $turnstileSecret = '0x4AAAAAABhPZY6boooJyIX2X0neXi_HJso'; // Replace with your real secret key
    $token = $_POST['cf-turnstile-response'] ?? '';

    if (!$token) {
        http_response_code(400);
        echo "Turnstile verification failed. Please try again.";
        exit;
    }

    $verifyResponse = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify", false, stream_context_create([
        "http" => [
            "method"  => "POST",
            "header"  => "Content-type: application/x-www-form-urlencoded",
            "content" => http_build_query([
                'secret' => $turnstileSecret,
                'response' => $token,
                'remoteip' => $_SERVER['REMOTE_ADDR'] ?? null
            ])
        ]
    ]));

    $verification = json_decode($verifyResponse, true);
    if (!$verification["success"]) {
        http_response_code(403);
        echo "Human verification failed. Please try again.";
        exit;
    }

    // ✅ Email Handling
    $recipient = "contactme@me.minecraftchest2.us";
    $subject = "New contact from $name";

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, please try again later.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission.";
}
?>

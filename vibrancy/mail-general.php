<?php

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING); 
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$EmailTo = 'dearjohnm@gmail.com';
$Subject = "Vibrancy Website | General Inquiry from " . $name;
$headers = "From: " . $name . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

// validation
$validationOK=true;
if (!$validationOK) {
	http_response_code(500);
	echo 'Something went wrong.  Your message was not sent.  Please try again later';
}

// prepare email body text
$Body = '<html><body>';
$Body .= "<h3>Name:</h3>";
$Body .= "<p>" . $name . "</p>";
$Body .= "<h3>Email:</h3>";
$Body .= "<p>" . $email;
$Body .= "<h3>Message:</h3>";
$Body .= "<p>" . $message . "</p>";
$Body .= '</body></html>';

// send email 
$success = mail($EmailTo, $Subject, $Body, $headers);

// redirect to success page 
if ($success){
    http_response_code(200);
    echo 'Your message was sent successfully!';
}
else{
	http_response_code(500);
    echo 'Something went wrong.  Your message was not sent.  Please try again later';
}
?>
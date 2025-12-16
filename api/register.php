<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $fullName = $_POST["fullName"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $fullName, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Email already exists"]);
    }

    $stmt->close();
    $conn->close();
}
?>

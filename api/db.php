<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "wellness_tracker";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}
?>

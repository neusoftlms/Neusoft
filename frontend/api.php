<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "neusoft_lms";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    
    // File upload handling
    $imagePath = 'uploads/' . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
    
    $contentPath = 'uploads/' . basename($_FILES['content']['name']);
    move_uploaded_file($_FILES['content']['tmp_name'], $contentPath);

    $sql = "INSERT INTO courses (title, category, description, image_url, content_url) 
            VALUES ('$title', '$category', '$description', '$imagePath', '$contentPath')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Course created successfully"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM courses ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $courses = [];
    
    while($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
    
    echo json_encode($courses);
}

$conn->close();
?>

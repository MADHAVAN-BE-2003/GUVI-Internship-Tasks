<?php
require '../vendor/autoload.php';
header('Content-Type: application/json');

$servername = "sql12.freemysqlhosting.net";
$username = "sql12722312";
$password = "78bUiRQrYB";
$dbname = "sql12722312";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

try {
    $redis = new Predis\Client('rediss://red-cqhqq7qju9rs738qf4eg:xXFV7lEd0sBhbjpSzuFEHw74NEKZv5yv@singapore-redis.render.com:6379');
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to connect to Redis: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password, email FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $session_token = bin2hex(random_bytes(32));
        $redis->set("session:$session_token", $user['id']);
        $redis->expire("session:$session_token", 3600);

        echo json_encode([
            "status" => "success",
            "token" => $session_token,
            "email" => $user['email']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
}
?>
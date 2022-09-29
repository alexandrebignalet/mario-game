<?php
session_start();
$mysqli = new mysqli("db", "sauron", "example", "gandalf");


if (count($_POST) > 0) {
    $username = $_SESSION["mage-name"];
    $score = $_POST["score"];

    $sql = "INSERT INTO scores (score, username) VALUES(" . $score . ", '" . $username . "');";
    if ($mysqli->query($sql) !== TRUE) {
        echo "Error creating table: " . $mysqli->error;
    }
    $_POST = array();
}
?>
<script type="text/javascript">
    window.location.replace("http://localhost");
</script>
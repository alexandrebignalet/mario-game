<?php

$mysqli = new mysqli("db", "sauron", "example", "gandalf");

// WARNING REMOVE THIS IF IT BUGS
//truncate($mysqli);

initDatabase($mysqli);
$scores = fetchScores($mysqli, "miguel");

function initDatabase($mysqli) {
    $sql = "CREATE TABLE IF NOT EXISTS scores (game_id MEDIUMINT NOT NULL AUTO_INCREMENT, score MEDIUMINT NOT NULL, username CHAR(100) NOT NULL, PRIMARY KEY (game_id));";
    if ($mysqli->query($sql) !== TRUE) {
        echo "Error creating table: " . $mysqli->error;
    }
}

function truncate($conn) {
    $conn->query("TRUNCATE TABLE scores");
}

function fetchScores($mysqli, $username) {
    $scores = [];

    $sql = "SELECT * FROM scores where username = '".$username."';";

    if ($result = $mysqli->query($sql)) {
        while ($data = $result->fetch_object()) {
            $scores[] = $data;
        }
    }
    return $scores;
}

foreach ($scores as $score) {
    echo "<br>";
    echo $score->score . " " . $score->username;
    echo "<br>";
}
?>

<button type="button" onclick="pushscore('miguel', 100)">push</button>

<form name="score-form" method="post" action="add_score.php" >
    <input type="text" name="username" id="username" hidden />
    <input type="number" name="score" id="score" hidden />
    <button id="push-score" type="submit" style="display: none"></button>
</form>

<script type="text/javascript">

    function pushscore(userName, score) {
        console.log("clicked");
        const button = document.querySelector('#push-score');
        const nameInput = document.querySelector('#username');
        const scoreInput = document.querySelector('#score');

        nameInput.value = userName;
        scoreInput.value = score;
        button.click();
    }

</script>
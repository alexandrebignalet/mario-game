<?php

session_start();
$currentUser = $_SESSION["mage-name"];

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Run poor fool</title>
    <link rel="stylesheet" href="style.css">
  </head> 

  <body>

    <?php if(!isset($currentUser)): ?>
    <div id="startName">
      <form name="user-form" action="add_user.php" method="post" class="form-example">
        <div class="form-example">
          <label for="name">Votre nom de magicien: </label>
          <input type="text" id="username" name="mage-name" required>
          <button id="start" type="submit"> Valider </button>
        </div>
    </div>
    <?php endif; ?>
    


    <div id="endScreen" onclick="restart()">
    </div>
    <?php if(isset($currentUser)): ?>
    <div id="menu">
      <div id="start-screen" onclick="start()">
      <button id="start"  >Lancer une partie</button>  
      </div> 
      <div id="historic">
      <button id="start" >Historiques des scores</button>
      </div>
      <div id="tutoriel" onclick="historyGame()">
      <button id="start" >Histoire du jeu</button>
      </div>
    </div>
    <?php endif; ?>
    
    
    <canvas id="canvas"></canvas>
    
    
    <script src="./js/canvas.js"></script>
  
  </body>
</html>


<form name="score-form" id="pluiscore" method="post" action="add_score.php" >
    <input type="text" name="username" id="username" hidden />
    <input type="number" name="score" id="score" hidden />
    <button id="push-score" type="submit" hidden>TTOTOT </button>
</form>

<script type="text/javascript">

    function pushscore(userName, score) {
    
        const button = document.querySelector('#push-score');
        const nameInput = document.querySelector('#username');
        const scoreInput = document.querySelector('#score');

        nameInput.value = userName;
        scoreInput.value = score;
        button.click();
    }

</script>
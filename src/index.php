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


    <?php if(isset($isGameOver)): ?>

        <div id="endScreen" onclick="restart()">
            <div id="gameOver">Game over noob <br/>score :  </div>

            <form name="restart-form" action="restart.php" method="post" class="form-example">
                <input id="start" type="submit" value="Continuer"/>
            </form>
        </div>
    <?php endif; ?>

    <?php if(isset($currentUser) && !$isGameOver): ?>
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

    <div id="historic">
        <ul>
            <?php
                foreach ($scores as $score) {
                    echo "<li>".$score->score . " " . $score->username."</li>";
                }
            ?>
        </ul>
    </div>


    <form name="score-form" method="post" action="add_score.php" >
        <input type="number" name="score" id="score" hidden />
        <button id="push-score" type="submit" hidden></button>
    </form>

    <script type="text/javascript">

        function pushscore(score) {
            const button = document.querySelector('#push-score');
            const scoreInput = document.querySelector('#score');

            scoreInput.value = score;
            button.click();
        }

    </script>
    <script src="./js/canvas.js"></script>
  </body>

</html>



<?php
session_start();

if (count($_POST) > 0) {
    $username = $_POST["mage-name"];
    
    
    $_SESSION["mage-name"]=$username;
   
}
?>

<script type="text/javascript">
    window.location.replace("http://localhost");
</script>

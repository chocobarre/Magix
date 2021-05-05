<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
        <link rel="stylesheet" type="text/css" href="css/lobby.css"/>
        <script defer src="js/lobby.js"></script>
    </head>

    <body>
        <div id="container">
            <div id="logo"></div>
            <div id="chat">
                <iframe style="width:1500px;height:500px;border:0" onload="applyStyles(this)" 
                    src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
                </iframe>
            </div>
            <div id="buttons">
                <a href="?training=true">
                    <button id="training" name="training"></button>
                </a>
                <a href="?play=true">
                    <button id="play" name="play"></button>
                </a>
                <a href="?logout=true">
                    <button id="quit" name="quit"></button>
                </a>
            </div>
        </div>
    </body>

    <footer>
    </footer>
</html>
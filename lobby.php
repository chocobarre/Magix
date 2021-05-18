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
    <div id="raven"></div>
    <body>
        <div id="container">
            <div id="logo">
                <div id="head" onclick="raven()"></div>
            </div>
            <div id="chat">
                <iframe style="width:1100px;height:562px;border:0" onload="applyStyles(this)" 
                    src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>/large">
                </iframe>
                <iframe style="width:1100px;height:562px;border:0" onload="applyStyles(this)" 
                    src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>/large">
                </iframe>
            </div>
            <div id="buttons">
                <a href="?training=true"><button id="training" name="training"></button></a>
                <a href="?play=true"><button id="play" name="play"></button></a>
                <a href="?coop=true"><button id="coop" name="coop"></button></a>
                <a href="?guide=true"><button id="guide" name="guide"></button></a>
                <a href="?logout=true"><button id="quit" name="quit"></button></a>
            </div>
        </div>
    </body>
    <footer>
    </footer>
</html>
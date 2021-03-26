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
            <div id="logo">
            </div>
            <div>
                <iframe style="width:700px;height:240px;border:0" onload="applyStyles(this)" 
                    src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
                </iframe>
            </div>
            <div id="buttons">
                <a href="board.php">
                    <button id="pratique" type="submit"></button>
                </a>
                <button id="jouer" type="submit"></button>
                <a href="?logout=true">
                    <button id="quitter" type="submit"></button>
                </a>
            </div>
        </div>
    </body>

    <footer>
    </footer>
</html>
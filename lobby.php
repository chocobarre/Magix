<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
    </head>
    <body>
        <div>
            <div>
                <a href="?logout=true">Disconnect</a>
            </div>
        </div>
    </body>
    <footer>
    </footer>
</html>
<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
        <script src="js/index.js"></script>
        <link rel="stylesheet" type="text/css" href="css/index.css"/>
    </head>

    <body>
        <canvas id="canvas" class="canvas" width="2560" height="1440"></canvas>

        <div id="container">
            <div id="top"></div>
            <div id="login-container">
                <form action="index.php" method="post">
                    <div>
                        <label>U S E R N A M E</label>
                        <input id="username" name="username" type="text">
                    </div>
                    <div>
                        <label>P A S S W O R D</label>
                        <input id="password" name="password" type="password">
                    </div>
                    <div>
                        <button id="connect" onclick="rememberUser()" type="submit"></button>
                    </div>
                </form>
            </div>
            <div id="bottom"></div>
        </div>
    </body>

    <footer>
    </footer>
</html>
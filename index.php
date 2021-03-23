<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
        <link rel="stylesheet" type="text/css" href="css/index.css"/>
    </head>

    <body>
        <canvas id="canvas" data-full="true" class="canvas" width="1500" height="1100"></canvas>

        <div id="container">
            <div id="login-container">
                <form action="index.php" method="post">
                    <div>
                        <label>USERNAME</label>
                        <input id="username" name="username" type="text" value="" required="">
                    </div>
                    <div>
                        <label>PASSWORD</label>
                        <input id="password" name="password" type="password" value="" required="">
                    </div>
                    <div>
                        <button id="connect" type="submit"></button>
                    </div>
                </form>
            </div>
        </div>
    </body>

    <footer>
    </footer>
</html>
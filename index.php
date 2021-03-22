<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
		<link rel="stylesheet" href="css/global.css"/>
    </head>
    <body>
        <canvas id="canvas" data-full="true" class="full-canvas" width="1500" height="1100"></canvas>

        <div id="background">
            <div class="login-container">
                <form action="index.php" method="post">
                    <?php 
                        if ($data["hasConnectionError"]) {
                            ?>
                            <div class="error-div"><Strong>Error : </Strong>&nbsp;Your username and/or password is incorrect.</div>
                            <?php
                        }
                    ?>

                    <div>
                        <label>Username</label>
                        <input id="username" name="username" type="text" value="" required="">
                    </div>
                    <div>
                        <label>Password</label>
                        <input id="password" name="password" type="password" value="" required="">
                    </div>
                    <div>
                        <button class="connect" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
    <footer>
    </footer>
</html>
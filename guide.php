<?php
    require_once("action/GuideAction.php");

    $action = new GuideAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
        <link rel="stylesheet" type="text/css" href="css/guide.css"/>
    </head>

    <body>
        <div id="container">
            <div id="gauche">
                <div id="top">
                    <div id="titre"><?= $data["article"]["article_name"] ?></div>
                    <div id="auteur">By <?= $data["article"]["username"] ?></div>
                    <div id="contenu"><?= $data["article"]["article_text"] ?></div>
                </div>
                <div id="middle">
                    <form action="guide.php" method="post">
                        <div>
                            <label>Nom :</label>
                            <input id="username" name="username" type="text" value="" required="">
                        </div>
                        <div>
                            <label>Password :</label>
                            <input id="password" name="password" type="password" value="" required="">
                        </div>
                        <div>
                            <button id="connect" type="submit">SEND</button>
                        </div>
                    </form>
                </div>
                <div id="bottom"></div>
            </div>
            <div id="millieu"></div>
            <div id="droite">
                <div id="droite-top">Articles</div>
                <div id="droite-bottom">
                    <div id="menu">
                        <ul>
                            <?php
                                if (!empty($data["articles"])) {
                                    foreach ($data["articles"] as $element) { ?>
                                        <li><div><a href="?selectedArticles"><?= $element["article_name"] ?></a></div></li>
                                <?php
                                    }
                                }
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <footer>
    </footer>

</html>
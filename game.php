<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Magix</title>
        <link rel="stylesheet" type="text/css" href="css/game.css"/>
        <script defer src="js/game.js"></script>
    </head>

    <body>
        <div id="game">

            <div id="opponent-UI">
                <div id="opponent-cards-in-hand">
                    <div>
                    </div>
                </div>
                <div id="opponent-status">
                    <div id="opponent-hp">
                    </div>
                    <div id="opponent-image">
                        Image
                    </div>
                    <div id="opponent-mana">
                    </div>
                </div>
                <div id="opponent-cards-in-deck">
                    <div>
                    </div>
                </div>
            </div>

            <div id="board">
            </div>

            <div id="player-UI">
                <div id="player-status">
                    <div id="player-hp">
                    </div>
                    <div id="player-mana">
                    </div>
                    <div id="player-cards-in-deck">
                    </div>
                </div>
                <div id="player-cards-in-hand">
                </div>
                <div id="power-turn-timer">
                    <div id="hero-power">
                        <button id="btn-hero-power" type="submit"></button>
                    </div>
                    <div id="end-turn">
                        <a href="?endturn=true">
                            <button id="btn-end-turn"></button>
                        </a>
                    </div>
                    <div id="timer">
                        Timer
                    </div>
                </div>
            </div>

        </div>
    </body>

    <footer>
    </footer>
</html>
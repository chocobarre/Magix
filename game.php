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
            <div id="top">

                <div id="opponent-UI">
                    <div id="opponent-cards-in-hand"></div>
                </div>

                <div id="opponent-status">
                    <div id="left"></div>
                    <div id="middle">
                        <div id="opponent-mana"></div>
                        <div id="opponent-hp"></div>
                        <div id="opponent-cards-in-deck"></div>
                    </div>
                    <div id="right"></div>
                </div>

                <div id="board">
                    <div id="opponent-board"></div>
                    <template id="cards-template">
                        <div class="cost"></div>
                        <div class="img"></div>
                        <div class="id"></div>
                        <div class="mechanics"></div>
                        <div class="stats">
                            <div class="atk"></div>
                            <div class="hp"></div>
                        </div>
                    </template>
                    <div id="status-text"></div>
                    <div id="player-board"></div>
                    <template id="cards-template">
                        <div class="cost"></div>
                        <div class="img"></div>
                        <div class="id"></div>
                        <div class="mechanics"></div>
                        <div class="stats">
                            <div class="atk"></div>
                            <div class="hp"></div>
                        </div>
                    </template>
                </div>
                
                <div id="player-status">
                    <div id="left"></div>
                    <div id="middle">
                        <div id="player-mana"></div>
                        <div id="player-hp"></div>
                        <div id="player-cards-in-deck"></div>
                    </div>
                    <div id="right"></div>
                </div>

                <div id="player-UI">
                    <div id="player-cards-in-hand"></div>
                    <template id="cards-template">
                        <div class="cost"></div>
                        <div class="img"></div>
                        <div class="id"></div>
                        <div class="mechanics"></div>
                        <div class="stats">
                            <div class="atk"></div>
                            <div class="hp"></div>
                        </div>
                    </template>
                    <div id="power-turn-timer">
                        <div id="hero-power"><button onclick="heroPower()" id="btn-hero-power"></button></div>
                        <div id="end-turn"><button onclick="endTurn()" id="btn-end-turn"></button></div>
                        <div id="timer"></div>
                    </div>
                </div>

            </div>
        </div>
    </body>

    <footer>
    </footer>
</html>
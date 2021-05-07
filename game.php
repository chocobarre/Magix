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

                <div id="opponent-hand"></div>
                <div id="opponent-UI-middle">
                    <img id="img-middle" src="images/hp.png" alt="Opponent HP">
                </div>
                <div id="opponent-UI-right"></div>

            </div>

            <div id="big-board">

                <div id="board-left">
                    <div id="opponent-status">
                        <div id="opponent-name"></div>
                        <div id="opponent-hp"></div>
                        <div id="opponent-mana"></div>
                        <div id="opponent-hero-power"></div>
                    </div>
                    <div id="player-status">
                        <div id="player-name">Chocobar</div>
                        <div id="player-hp"></div>
                        <div id="player-mana"></div>
                    </div>
                    <div id="hero-power"><button onclick="heroPower()" id="btn-hero-power"></button></div>
                </div>

                <div id="board-middle">
                    <div id="opponent-board"></div>
                    <div id="status-text">
                        <div id="status-left"></div>
                        <div id="status-middle"></div>
                        <div id="status-right">
                            <div id="end-turn"><button onclick="endTurn()" id="btn-end-turn"></button></div>
                        </div>
                    </div>
                    <div id="player-board"></div>
                </div>

                <div id="board-right">
                    <div id="opponent-cards-in-deck"></div>
                    <div id="player-cards-in-deck"></div>
                </div>
            </div>

            <div id="player-UI">
                <div id="player-hand"></div>
            </div>
        </div>
    </body>

    <template id="opponent-cards-template-hand"></template>

    <template id="opponent-cards-template">
        <div class="img"></div>
        <div class="mechanics"></div>
        <div class="cost-atk-hp">
            <div class="cost"></div>
            <div class="atk"></div>
            <div class="hp"></div>
        </div>
    </template>

    <template id="cards-template">
        <div class="img"></div>
        <div class="mechanics"></div>
        <div class="state"></div>
        <div class="cost-atk-hp">
            <div class="cost"></div>
            <div class="atk"></div>
            <div class="hp"></div>
        </div>
    </template>

</html>
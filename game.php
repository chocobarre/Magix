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
                    <div id="opponent-UI-middle-left"></div>
                    <div id="opponent-UI-middle-middle"></div>
                    <div id="opponent-UI-middle-right"></div>
                </div>
                <div id="opponent-UI-right"></div>

            </div>

            <div id="big-board">

                <div id="board-left">
                    <div id="player-status">
                        <div id="player-name">Chocobar</div>
                        <div id="player-hp"></div>
                        <div id="player-mana"></div>
                        <div id="hero-power"><button onclick="heroPower()" id="btn-hero-power"></button></div>
                    </div>
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
                    <div id="opponent-cards-in-deck">
                        <div id="opponent-card-left"></div>
                        <div id="opponent-card-middle"></div>
                        <div id="opponent-card-right"></div>
                    </div>
                    <div id="player-cards-in-deck">
                        <div id="player-card-left"></div>
                        <div id="player-card-middle"></div>
                        <div id="player-card-right"></div>
                    </div>
                </div>
            </div>

            <div id="player-UI">
                <div id="player-hand"></div>
            </div>
        </div>
    </body>

    <template id="opponent-cards-template-hand"></template>

    <template id="opponent-cards-template">
        <div class="state-cost">
            <div class="state-cost-first"></div>
            <div class="state"></div>
            <div class="cost"></div>
        </div>
        <div class="img"></div>
        <div class="mechanics"></div>
        <div class="stats">
            <div class="atk-hp"></div>
        </div>
    </template>

    <template id="cards-template">
        <div class="state-cost">
            <div class="state-cost-first"></div>
            <div class="state"></div>
            <div class="cost"></div>
        </div>
        <div class="img"></div>
        <div class="mechanics"></div>
        <div class="stats">
            <div class="atk-hp"></div>
        </div>
    </template>

</html>
const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // contient les cartes/état du jeu.
        //console.log(data.opponent)

        if (data == "WAITING") {
            // Waiting on opponent
        } else if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
            // Won game or lost game
        } else {
            update(data);
        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

let btnHeroPower = document.querySelector("#btn-hero-power");
let btnEndTurn = document.querySelector("#btn-end-turn");

const update = data => {
    // Opponent UI
    document.querySelector("#opponent-hp").innerText = data.opponent.hp;
    document.querySelector("#opponent-mana").innerText = data.opponent.mp;
    document.querySelector("#opponent-cards-in-deck").innerText = data.opponent.remainingCardsCount;

    // Player UI
    document.querySelector("#player-hp").innerText = data.hp;
    document.querySelector("#player-mana").innerText = data.mp;
    document.querySelector("#player-cards-in-deck").innerText = data.remainingCardsCount;
    document.querySelector("#timer").innerText = data.remainingTurnTime;
}

btnHeroPower.onclick = () => {
    heroPower();
}

btnEndTurn.onclick = () => {
    endTurn();
}

const heroPower = () => {
    let formData = new FormData();
    formData.append("type", "HERO_POWER");
    
    fetch("ajax-action.php", {
        method : "POST",
        credentials: "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data !== "object") {
            if (data == "GAME_NOT_FOUND") {
                // fin de la partie
                if (data == "HERO_POWER_ALREADY_USED") {
                    if (data == "NOT_ENOUGH_ENERGY") {

                    }
                }
            }
        }
        else {
            update(data);
        }
    })
}

const endTurn = () => {
    let formData = new FormData();
    formData.append("type", "END_TURN");
    
    fetch("ajax-action.php", {
        method : "POST",
        credentials: "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data !== "object") {
            if (data == "GAME_NOT_FOUND") {
                // fin de la partie
            }
        }
        else {
            update(data);
        }
    })
}
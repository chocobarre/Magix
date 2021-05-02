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
            document.querySelector("#status-text").innerHTML = "WAITING FOR OPPONENT...";
        } else if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
            if (data == "LAST_GAME_WON")
                document.querySelector("#status-text").innerHTML = "VICTORY";
            else if (data == "LAST_GAME_LOST")
                document.querySelector("#status-text").innerHTML = "DEFEAT";
        } else {
            document.querySelector("#status-text").innerHTML = "";
            update(data);
            createCard(data["hand"], "#cards-template");
            refreshCards(data["board"], "#cards-template");
            refreshOpponentCards(data["opponent"]["board"], "#cards-template");
        }

        if (data.yourTurn == true) {
            document.querySelector("#status-text").innerHTML = "Your Turn";
        } else if (data.yourTurn == false) {
            document.querySelector("#status-text").innerHTML = "Opponent Turn";
        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

let btnHeroPower = document.querySelector("#btn-hero-power");
let btnEndTurn = document.querySelector("#btn-end-turn");

btnHeroPower.onclick = () => {
    heroPower();
}

btnEndTurn.onclick = () => {
    endTurn();
}

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

function createCard(data, hand) {
    let cards = data;
    let templateHTML = document.querySelector(hand).innerHTML;
    
    document.querySelector("#player-cards-in-hand").innerHTML = "";

    cards.forEach(element => {
        let div = document.createElement("div");

        div.onclick = () => {
            let formData = new FormData();
            formData.append("type", "PLAY");
            formData.append("uid", element["uid"]); 
            
            fetch("ajax-action.php", {
                method : "POST",
                credentials: "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    if (data == "GAME_NOT_FOUND") {
                        
                    }
                }
                else {
                    update(data);
                }
            })
        }

        div.className = "cards";
        div.innerHTML = templateHTML;
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".img").innerText = "Image";
        div.querySelector(".id").innerText = element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".atk").innerText = element["atk"];
        div.querySelector(".hp").innerText = element["hp"];
        /*<img class='cardImg' src='./images/" +id+ ".jpg'>*/
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = element["state"];*/

        document.getElementById("player-cards-in-hand").append(div);
    })
}

function refreshCards(data, board) {
    let cards = data;
    let templateHTML = document.querySelector(board).innerHTML;
    
    document.querySelector("#player-board").innerHTML = "";

    cards.forEach(element => {
        let div = document.createElement("div");

        div.onclick = () => {
            let formData = new FormData();
            formData.append("type", "PLAY");
            formData.append("uid", element["uid"]); 
            
            fetch("ajax-action.php", {
                method : "POST",
                credentials: "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    if (data == "GAME_NOT_FOUND") {
                        
                    }
                }
                else {
                    update(data);
                }
            })
        }

        div.className = "cards";
        div.innerHTML = templateHTML;
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".img").innerText = "Image";
        div.querySelector(".id").innerText = element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".atk").innerText = element["atk"];
        div.querySelector(".hp").innerText = element["hp"];
        /*<img class='cardImg' src='./images/" +id+ ".jpg'>*/
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = "State: " + element["state"];*/

        document.getElementById("player-board").append(div);
    })
}

function refreshOpponentCards(data, board) {
    let cards = data;
    let templateHTML = document.querySelector(board).innerHTML;
    
    document.querySelector("#opponent-board").innerHTML = "";

    cards.forEach(element => {
        let div = document.createElement("div");

        div.onclick = () => {
            let formData = new FormData();
            formData.append("type", "PLAY");
            formData.append("uid", element["uid"]); 
            
            fetch("ajax-action.php", {
                method : "POST",
                credentials: "include",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    if (data == "GAME_NOT_FOUND") {
                        
                    }
                }
                else {
                    update(data);
                }
            })
        }

        div.className = "cards";
        div.innerHTML = templateHTML;
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".img").innerText = "Image";
        div.querySelector(".id").innerText = element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".atk").innerText = element["atk"];
        div.querySelector(".hp").innerText = element["hp"];
        /*<img class='cardImg' src='./images/" +id+ ".jpg'>*/
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = "State: " + element["state"];*/

        document.getElementById("opponent-board").append(div);
    })
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
            }
        }
        else {
            update(data);
        }
    })
}
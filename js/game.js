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
            document.querySelector("#status-middle").innerHTML = "Waiting for opponent...";
        } else if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
            if (data == "LAST_GAME_WON") {
                document.querySelector("#status-middle").innerHTML = "VICTORY";
                document.querySelector("#end-turn").style.visibility = "hidden";
            } else if (data == "LAST_GAME_LOST") {
                document.querySelector("#status-middle").innerHTML = "DEFEAT";
                document.querySelector("#end-turn").style.visibility = "hidden";
            }
        } else {
            document.querySelector("#status-middle").innerHTML = "";
            update(data);

            updatePlayerHand(data["hand"], "#cards-template");
            //console.log(data["opponent"]);
            updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
            updatePlayerBoard(data["board"], "#cards-template");
            updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");
        }

        if (data.yourTurn == true) {
            document.querySelector("#status-middle").innerText = "Your Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
            document.querySelector("#end-turn").style.visibility = "visible";
        } else if (data.yourTurn == false) {
            document.querySelector("#status-middle").innerText = "Opponent Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
            document.querySelector("#end-turn").style.visibility = "hidden";
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
    document.querySelector("#opponent-hp").innerText = "HP: " + data.opponent.hp;
    document.querySelector("#img-middle").innerText = data.opponent.hp;

    document.querySelector("#opponent-mana").innerText = "MP : " + data.opponent.mp;
    document.querySelector("#opponent-cards-in-deck").innerText = data.opponent.remainingCardsCount;
    document.querySelector("#opponent-name").innerText = data.opponent.heroClass;

    // Player UI
    document.querySelector("#player-hp").innerText = "HP: " + data.hp;
    document.querySelector("#player-mana").innerText = "MP: " + data.mp;
    document.querySelector("#player-cards-in-deck").innerText = data.remainingCardsCount;
}

function updatePlayerHand(data, hand) {
    let cards = data;
    let templateHTML = document.querySelector(hand).innerHTML;
    
    document.querySelector("#player-hand").innerHTML = "";

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
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];

        document.querySelector("#player-hand").append(div);
    })
}

function updateOpponentHand(data, hand) {
    let cards = data;
    let templateHTML = document.querySelector(hand).innerHTML;
    //console.log(data, hand);

    document.querySelector("#opponent-hand").innerHTML = "";

    for (i = 0; i < cards.handSize; i++) {
        let div = document.createElement("div");

        div.className = "cardsOpponentHand";
        div.innerHTML = templateHTML;

        document.querySelector("#opponent-hand").append(div);
    }
}

function updatePlayerBoard(data, board) {
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
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];

        document.querySelector("#player-board").append(div);
    })
}

function updateOpponentBoard(data, board) {
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

        div.className = "cardsOpponent";
        div.innerHTML = templateHTML;
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];

        document.querySelector("#opponent-board").append(div);
    })
}

const attacker = (uid) => {
    console.log("Attacker");
    document.querySelector("#status-middle").innerText = "Attacker";
    if (selectedCard === uid) {
        selectedCard = "";
    } else{
        selectedCard = uid;
    }
}

const target = (uid) => {
    console.log("Target");
    if (selectedCard !== "") {
        target = uid;
    }

    if (target === uid) {
        let formData = new FormData();
        formData.append("type", "ATTACK");
        formData.append("uid", selectedCard.toString()); 
        formData.append("targetuid", target.toString());
        fetch("ajax-moves.php", {
            method : "POST",
            credentials : "include",
            body : formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }

    target = "";
    selectedCard = "";
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

const applyStyles = iframe => {
	let styles = {
		fontColor : "#FFFFFF",
		backgroundColor : "rgba(0, 0, 0, 0.7)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
	}
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
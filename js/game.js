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
            document.querySelector("#status-text").innerHTML = "Waiting for opponent...";
        } else if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
            if (data == "LAST_GAME_WON")
                document.querySelector("#status-text").innerHTML = "VICTORY";
            else if (data == "LAST_GAME_LOST")
                document.querySelector("#status-text").innerHTML = "DEFEAT";
        } else {
            document.querySelector("#status-text").innerHTML = "";
            update(data);

            createHand(data["hand"], "#cards-template");
            refreshPlayerBoard(data["board"], "#cards-template");
            refreshOpponentBoard(data["opponent"]["board"], "#cards-template");
        }

        if (data.yourTurn == true) {
            document.querySelector("#status-text").innerText = "Your Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
        } else if (data.yourTurn == false) {
            document.querySelector("#status-text").innerText = "Opponent Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
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
    document.querySelector("#opponent-mana").innerText = "MP : " + data.opponent.mp;
    document.querySelector("#opponent-cards-in-deck").innerText = data.opponent.remainingCardsCount;
    document.querySelector("#opponent-name").innerText = data.className;

    // Player UI
    document.querySelector("#player-hp").innerText = "HP: " + data.hp;
    document.querySelector("#player-mana").innerText = "MP: " + data.mp;
    document.querySelector("#player-cards-in-deck").innerText = data.remainingCardsCount;
}

function createHand(data, hand) {
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
        //div.querySelector(".id").innerText = "#" + element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = "State: " + element["state"];*/

        document.getElementById("player-hand").append(div);
    })
}

function createOpponentHand(data, hand) {

}

function refreshPlayerBoard(data, board) {
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
        //div.querySelector(".id").innerText = "#" + element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = "State: " + element["state"];*/

        document.getElementById("player-board").append(div);
    })
}

function refreshOpponentBoard(data, board) {
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
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        //div.querySelector(".id").innerText = "#" + element["id"];
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = "Cost: " + element["cost"];
        div.querySelector(".atk").innerText = "ATK: " + element["atk"];
        div.querySelector(".hp").innerText = "HP: " + element["hp"];
        /*div.querySelector(".uid").innerText = "UID: " + element["uid"];
        div.querySelector(".baseHP").innerText = "BaseHP: " + element["baseHP"];
        div.querySelector(".state").innerText = "State: " + element["state"];*/

        document.getElementById("opponent-board").append(div);
    })
}

const attacker = (uid) => {
    if (selectedCard == uid) {
        selectedCard = "";
    } else {
        selectedCard = uid;
    }
}

const target = (uid) => {
    if (selectedCard != "") {
        target = uid;
    }
    
    if (target == uid) {
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
            update(data);
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
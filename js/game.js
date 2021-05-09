const state = () => {
    fetch("ajax-state.php", {
        method : "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //console.log(data.opponent)

        if (data == "WAITING") {
            document.querySelector("#status-middle").innerHTML = "Waiting for opponent...";
            document.querySelector("#end-turn").style.visibility = "hidden";
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

        setTimeout(state, 1000);
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000);
});

/*==========================================================
*
*   Variables
*
==========================================================*/

let btnHeroPower = document.querySelector("#btn-hero-power");
let btnEndTurn = document.querySelector("#btn-end-turn");
let opponentHero = document.querySelector("#opponent-UI-middle");

let attackerSelected = false;
let targetSelected = false;

let attackerCard;
let targetCard;

btnHeroPower.onclick = () => {
    heroPower();
}

btnEndTurn.onclick = () => {
    endTurn();
}

opponentHero.onclick = () => {
    if (attackerSelected == true) {
        attack(attackerCard, 0);
    } else {
        console.log("Please select an attacker!");
    }
}

/*==========================================================
*
*   Update
*
==========================================================*/

const update = data => {

    // Opponent class icons
    switch (data.opponent.heroClass) {
        case "DemonHunter":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/demon_hunter.png')";
            break;
        case "Druid":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/druid.png')";
            break;
        case "Hunter":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/hunter.png')";
            break;
        case "Mage":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/mage.png')";
            break;
        case "Paladin":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/paladin.png')";
            break;
        case "Priest":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/priest.png')";
            break;
        case "Rogue":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/rogue.png')";
            break;
        case "Shaman":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/shaman.png')";
            break;
        case "Warlock":
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/warlock.png')";
            break;
        case "Warrior":
                document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/warrior.png')";
                break;
        default:
            document.querySelector("#opponent-UI-middle-middle").style.backgroundImage = "url('./images/health.png')";
    }

    // Names
    document.querySelector("#opponent-UI-middle-middle").innerText = data.opponent.username;

    // HP
    document.querySelector("#opponent-UI-middle-left").innerText = data.opponent.hp;
    document.querySelector("#player-hp").innerText = data.hp;

    // MP
    document.querySelector("#opponent-UI-middle-right").innerText = data.opponent.mp;
    document.querySelector("#player-mana").innerText = data.mp;

    // Remaining cards in deck
    document.querySelector("#opponent-card-middle").innerText = "x " + data.opponent.remainingCardsCount;
    document.querySelector("#player-card-middle").innerText = "x " + data.remainingCardsCount;

}

/*==========================================================
*
*   Update la main du joueur
*
==========================================================*/

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
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        document.querySelector("#player-hand").append(div);

        div.style.border = "solid black 7px";

        div.onmouseenter = () => {
            div.style.border = "solid white 7px";
        }

        div.onmouseleave = () => {
            div.style.border = "solid black 7px";
        }
    })
}

/*==========================================================
*
*   Update la main de l'opponent
*
==========================================================*/

function updateOpponentHand(data, hand) {
    let cards = data;
    let templateHTML = document.querySelector(hand).innerHTML;

    document.querySelector("#opponent-hand").innerHTML = "";

    for (i = 0; i < cards.handSize; i++) {
        let div = document.createElement("div");

        div.className = "cardsOpponentHand";
        div.innerHTML = templateHTML;

        document.querySelector("#opponent-hand").append(div);
    }
}

/*==========================================================
*
*   Update le board du joueur
*
==========================================================*/

function updatePlayerBoard(data, board) {
    let cards = data;
    let templateHTML = document.querySelector(board).innerHTML;
    
    document.querySelector("#player-board").innerHTML = "";

    cards.forEach(element => {
        let div = document.createElement("div");

        div.className = "cards";
        div.innerHTML = templateHTML;
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        div.querySelector(".mechanics").innerText = element["mechanics"];

        if (element["state"] == "SLEEP") {
            div.querySelector(".state").innerText = "ZzZzZzZ";
        }
        
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        document.querySelector("#player-board").append(div);

        if (element["mechanics"] == "Taunt") {
            div.style.border = "solid grey 7px";
            //div.style.borderImageSlice = "1";
            //div.style.borderImageSource = "linear-gradient(to left, #898989, #484848)";
        } else {
            div.style.border = "solid black 7px";
        }
        
        div.onmouseenter = () => {
            div.style.border = "solid white 7px";
        }

        div.onmouseleave = () => {
            if (element["mechanics"] == "Taunt") {
                div.style.border = "solid grey 7px";
            } else {
                div.style.border = "solid black 7px";
            }
        }

        div.onclick = () => {
            attackerCard = element.uid;
            attackerSelected = true;
        }
    })
}

/*==========================================================
*
*   Update le board de l'opponent
*
==========================================================*/

function updateOpponentBoard(data, board) {
    let cards = data;
    let templateHTML = document.querySelector(board).innerHTML;
    
    document.querySelector("#opponent-board").innerHTML = "";

    cards.forEach(element => {
        let div = document.createElement("div");

        div.className = "cardsOpponent";
        div.innerHTML = templateHTML;
        div.querySelector(".img").innerHTML += "<img class='img' src='./images/test.jpg'></img>";
        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        document.querySelector("#opponent-board").append(div);

        if (element["mechanics"] == "Taunt") {
            div.style.border = "solid grey 7px";
            //div.style.borderImageSlice = "1";
            //div.style.borderImageSource = "linear-gradient(to left, #898989, #484848)";
        } else {
            div.style.border = "solid black 7px";
        }
        
        div.onmouseenter = () => {
            div.style.border = "solid white 7px";
        }

        div.onmouseleave = () => {
            if (element["mechanics"] == "Taunt") {
                div.style.border = "solid grey 7px";
            } else {
                div.style.border = "solid black 7px";
            }
        }
        
        div.onclick = () => {
            if (attackerSelected == true) {
                targetCard = element.uid;
                targetSelected = true;
                attack(attackerCard, targetCard);
            }
        }
    })
}

/*==========================================================
*
*   Attack
*
==========================================================*/

function attack(attacker, target) {
    let formData = new FormData();
    formData.append("type", "ATTACK");
    formData.append("uid", attacker);

    if (target === 0) {
        formData.append("targetuid", 0);
        console.log("#" + attackerCard + " is attacking " + "the opponent hero!");
    } else {
        formData.append("targetuid", target);
        console.log("#" + attackerCard + " is attacking #" + targetCard + "!");
    }

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

    attackerCard = null;
    targetCard = null;
    attackerSelected = false;
    targetSelected = false;
}

/*==========================================================
*
*   Hero Power
*
==========================================================*/

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

/*==========================================================
*
*   End Turn
*
==========================================================*/

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

/*==========================================================
*
*   Style pour le chat
*
==========================================================*/

const applyStyles = iframe => {
	let styles = {
		fontColor : "#FFFFFF",
		backgroundColor : "rgba(0, 0, 0, 0.7)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
	}
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
/*==========================================================
*
*   État de départ, presque tout est caché
*
==========================================================*/

document.querySelector("#end-turn").style.visibility = "hidden";
document.querySelector("#opponent-hand").style.visibility = "hidden";
document.querySelector("#opponent-UI-middle").style.visibility = "hidden";
document.querySelector("#opponent-UI-right").style.visibility = "hidden";
document.querySelector("#board-left").style.visibility = "hidden";
document.querySelector("#board-right").style.visibility = "hidden";
document.querySelector("#opponent-board").style.visibility = "hidden";
document.querySelector("#player-board").style.visibility = "hidden";
document.querySelector("#player-hand").style.visibility = "hidden";
document.querySelector("#end-turn").style.visibility = "hidden";
document.querySelector("#opponent-hand").style.visibility = "hidden";
document.querySelector("#opponent-UI-middle").style.visibility = "hidden";
document.querySelector("#opponent-UI-right").style.visibility = "hidden";
document.querySelector("#board-left").style.visibility = "hidden";
document.querySelector("#board-right").style.visibility = "hidden";
document.querySelector("#opponent-board").style.visibility = "hidden";
document.querySelector("#player-board").style.visibility = "hidden";
document.querySelector("#player-hand").style.visibility = "hidden";

const state = () => {
    fetch("ajax-state.php", {
        method : "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //console.log(data.opponent)

        if (typeof data !== "object") {

        }
        else {
        }

        if (data == "WAITING") {
            document.querySelector("#status-middle").innerText = "Searching for opponent...";
        } else if (data == "LAST_GAME_WON") {
            document.querySelector("#status-middle").innerText = "V I C T O R Y";
            hidden();
        } else if (data == "LAST_GAME_LOST") {
            document.querySelector("#status-middle").innerText = "D E F E A T";
            hidden();
        } else {
            document.querySelector("#end-turn").style.visibility = "visible";
            document.querySelector("#opponent-hand").style.visibility = "visible";
            document.querySelector("#opponent-UI-middle").style.visibility = "visible";
            document.querySelector("#opponent-UI-right").style.visibility = "visible";
            document.querySelector("#board-left").style.visibility = "visible";
            document.querySelector("#board-right").style.visibility = "visible";
            document.querySelector("#opponent-board").style.visibility = "visible";
            document.querySelector("#player-board").style.visibility = "visible";
            document.querySelector("#player-hand").style.visibility = "visible";

            update(data);
            updatePlayerHand(data["hand"], "#cards-template");
            updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
            updatePlayerBoard(data["board"], "#cards-template");
            updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");

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
        }

        if (data.yourTurn == true) {
            document.querySelector("#status-middle").innerText = "Your Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
            document.querySelector("#end-turn").style.visibility = "visible";
        } else if (data.yourTurn == false) {
            document.querySelector("#status-middle").innerText = "Opponent Turn " + "(" + data.remainingTurnTime + " seconds remaining)";
            document.querySelector("#end-turn").style.visibility = "hidden";
        }

        let hero = document.querySelector("#hero-power");

        if (data.heroPowerAlreadyUsed == true) {
            hero.style.backgroundImage = "url('./images/btn_heropower_used.png')";
            hero.onmouseenter = () => {
                document.querySelector("#hero-power").style.backgroundImage = "url('./images/btn_heropower_used.png')";
            }
            hero.onmouseleave = () => {
                document.querySelector("#hero-power").style.backgroundImage = "url('./images/btn_heropower_used.png')";
            }
        } else if (data.heroPowerAlreadyUsed == false) {
            hero.style.backgroundImage = "url('./images/btn_heropower_off.png')";
            hero.onmouseenter = () => {
                document.querySelector("#hero-power").style.backgroundImage = "url('./images/btn_heropower_on.png')";
            }
            hero.onmouseleave = () => {
                document.querySelector("#hero-power").style.backgroundImage = "url('./images/btn_heropower_off.png')";
            }
        }

        setTimeout(state, 1000);
    })
}

const hidden = () => {
    document.querySelector("#status-middle").style.fontSize = "60px";
    document.querySelector("#end-turn").style.visibility = "hidden";
    document.querySelector("#opponent-hand").style.visibility = "hidden";
    document.querySelector("#opponent-UI-middle").style.visibility = "hidden";
    document.querySelector("#opponent-UI-right").style.visibility = "hidden";
    document.querySelector("#board-left").style.visibility = "hidden";
    document.querySelector("#board-right").style.visibility = "hidden";
}

window.addEventListener("load", () => {
    setTimeout(state, 1000);
});

/*==========================================================
*
*   Variables & quelques appels de fonctions
*
==========================================================*/

let btnHeroPower = document.querySelector("#hero-power");
let btnEndTurn = document.querySelector("#end-turn");
let btnChat = document.querySelector("#chat");
let opponentHero = document.querySelector("#opponent-UI-middle");

let attackerSelected = false;
let targetSelected = false;

let attackerCard;
let targetCard;

let chatVisible = false;

btnHeroPower.onclick = () => {
    heroPower();
}

btnEndTurn.onclick = () => {
    endTurn();
}

btnChat.onclick = () => {
    if (chatVisible == false) {
        chatVisible = true;
        showChat();
    } else if (chatVisible == true) {
        chatVisible = false;
        hideChat();
    }
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
    // Names
    document.querySelector("#opponent-UI-middle-middle").innerText = data.opponent.username;
    document.querySelector("#player-name").innerText = localStorage["savedUsername"];

    // HP
    document.querySelector("#opponent-UI-middle-left").innerText = data.opponent.hp;
    document.querySelector("#player-hp").innerText = data.hp;
    document.querySelector("#opponent-UI-middle-left").style.fontSize = "20px";
    document.querySelector("#player-hp").style.fontSize = "20px";

    // MP
    document.querySelector("#opponent-UI-middle-right").innerText = data.opponent.mp;
    document.querySelector("#player-mana").innerText = data.mp;
    document.querySelector("#opponent-UI-middle-right").style.fontSize = "20px";
    document.querySelector("#player-mana").style.fontSize = "20px";

    // Remaining cards in deck
    document.querySelector("#opponent-card-right").innerText = "x " + data.opponent.remainingCardsCount;
    document.querySelector("#player-card-right").innerText = "x " + data.remainingCardsCount;
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

        div.onmouseup = () => {
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
                } else {
                    update(data);
                    updatePlayerHand(data["hand"], "#cards-template");
                    updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
                    updatePlayerBoard(data["board"], "#cards-template");
                    updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");
                }
            })
        }

        div.className = "cards";
        div.innerHTML = templateHTML;

        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        div.querySelector(".bg").style.backgroundImage = "url('./images/cards/" + element["id"] + ".jpg')";

        document.querySelector("#player-hand").append(div);
        
        div.style.border = "solid black 7px";
        div.style.boxShadow = "4px 3px 8px 1px black";

        if (element["cost"] <= document.querySelector("#player-mana").innerText) {
            div.style.boxShadow = "0px 0px 5px 5px #b2fe88";
        }

        if (element["mechanics"] == "") {
            div.querySelector(".mechanics").style.border = "0px transparent solid";
            div.querySelector(".mechanics").style.backgroundColor = "transparent";
        }

        div.onmouseenter = () => {
            div.style.boxShadow = "0px 0px 5px 5px white";
        }

        div.onmouseleave = () => {
            div.style.boxShadow = "4px 3px 8px 1px black";

            if (element["cost"] <= document.querySelector("#player-mana").innerText) {
                div.style.boxShadow = "0px 0px 5px 5px #b2fe88";
            }
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

        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        div.querySelector(".bg").style.backgroundImage = "url('./images/cards/" + element["id"] + ".jpg')";

        document.querySelector("#player-board").append(div);

        if (element["state"] != "SLEEP") {
            div.style.boxShadow = "0px 0px 5px 5px #a5fdfe";
        }

        if (element["mechanics"].indexOf("Taunt") > -1) {
            div.style.border = "solid 7px silver";
        }

        if (element["mechanics"].indexOf("Stealth") > -1) {
            div.style.opacity = "0.5";
        }

        if (element["mechanics"] == "") {
            div.querySelector(".mechanics").style.border = "0px transparent solid";
            div.querySelector(".mechanics").style.backgroundColor = "transparent";
        }
        
        div.onmouseenter = () => {
            div.style.boxShadow = "0px 0px 5px 5px white";
        }

        div.onmouseleave = () => {
            div.style.boxShadow = "4px 3px 8px 1px black";

            if (element["mechanics"].indexOf("Taunt") > -1) {
                div.style.border = "solid 7px silver";
            }

            if (element["state"] != "SLEEP") {
                div.style.boxShadow = "0px 0px 5px 5px #a5fdfe";
            }
        }

        div.onmouseup = () => {
            attackerCard = element.uid;
            attackerSelected = true;
            console.log("#" + attackerCard + " has been designated as the attacker!");
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

        div.className = "cards";
        div.innerHTML = templateHTML;

        div.style.backgroundImage = "url(./images/03.jpg)";
        div.style.backgroundPosition = "center";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundSize = "cover";

        div.querySelector(".mechanics").innerText = element["mechanics"];
        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".atk-hp").innerText = element["atk"] + "/" + element["hp"];

        div.querySelector(".bg").style.backgroundImage = "url('./images/cards/" + element["id"] + ".jpg')";

        document.querySelector("#opponent-board").append(div);

        if (element["mechanics"].indexOf("Taunt") > -1) {
            div.style.border = "solid 7px silver";
        }

        if (element["mechanics"].indexOf("Stealth") > -1) {
            div.style.opacity = "0.5";
        }

        if (element["mechanics"] == "") {
            div.querySelector(".mechanics").style.border = "0px transparent solid";
            div.querySelector(".mechanics").style.backgroundColor = "transparent";
        }
        
        div.onmouseenter = () => {
            div.style.boxShadow = "0px 0px 5px 5px white";
        }

        div.onmouseleave = () => {
            div.style.boxShadow = "4px 3px 8px 1px black";

            if (element["mechanics"].indexOf("Taunt") > -1) {
                div.style.border = "solid 7px silver";
            }
        }
        
        div.onmouseup = () => {
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
        console.log("The opponent hero has been designated as the target!");
    } else {
        formData.append("targetuid", target);
        console.log("#" + targetCard + " has been designated as the target!");
    }

    fetch("ajax-action.php", {
        method : "POST",
        credentials: "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data !== "object") {
        } else {
            update(data);
            updatePlayerHand(data["hand"], "#cards-template");
            updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
            updatePlayerBoard(data["board"], "#cards-template");
            updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");
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
        } else {
            update(data);
            updatePlayerHand(data["hand"], "#cards-template");
            updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
            updatePlayerBoard(data["board"], "#cards-template");
            updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");
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
        } else {
            update(data);
            updatePlayerHand(data["hand"], "#cards-template");
            updateOpponentHand(data["opponent"], "#opponent-cards-template-hand");
            updatePlayerBoard(data["board"], "#cards-template");
            updateOpponentBoard(data["opponent"]["board"], "#opponent-cards-template");
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
		backgroundColor : "rgba(0, 0, 0, 0.8)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 200);
}

/*==========================================================
*
*   Chat on ou off
*
==========================================================*/

const showChat = () => {
    chatVisible = true;
    document.querySelector("#chatWindow").style.display = "block";
}

const hideChat = () => {
    document.querySelector("#chatWindow").style.display = "none";
}
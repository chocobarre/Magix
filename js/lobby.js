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

let id = null;
let bird = 1;

function raven() {
	let random = Math.floor(Math.random() * 8) + 1;
	let bg = document.querySelector("#chat");
	bg.style.backgroundImage = "url('./images/" + random + ".jpg')";

	let elem = document.querySelector("#raven");
	let pos = 0;
	clearInterval(id);

	id = setInterval(frame, 10);

	function frame() {
		if (pos == 2000) {
			clearInterval(id);
			pos = -50;
		} else {
			pos++;
			elem.style.backgroundImage = "url('./images/raven" + bird + ".png')";
			elem.style.left = pos + 'px';
			bird++;

			if (bird >= 25) {
				bird = 1;
			}
		}
	}
}
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
    }, 100);
}

let canvas = null;
let ctx = null;
const CIRCLE_SIZE = 10;

let circle = {
    x : null,
    y : null,
    opacity :1
}

// Faire en sorte que lorsque l'on bouge la souris
// un carré la suit, puis si on ne la bouge plus, alors
// il disparait avec le temps.

window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    canvas.onmousemove = e => {
        let x = e.pageX - canvas.offsetLeft - CIRCLE_SIZE / 2;
        let y = e.pageY - canvas.offsetTop  - CIRCLE_SIZE / 2;

        circle.x = x;
        circle.y = y;
        circle.opacity = 1;
    }

    tick();
})

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le carré
    if (circle.x != null && circle.opacity > 0) {
        ctx.fillStyle = "rgba(255, 0, 0, " + circle.opacity + ")";
        ctx.arc(80, 115, 5, 0, 2 * Math.PI);
        ctx.arc(120, 115, 5, 0, 2 * Math.PI);
        ctx.fill();
        circle.opacity -= 0.01;
    }

    window.requestAnimationFrame(tick);
}

/*ctx.fillStyle = "red";
ctx.arc(80, 115, 5, 0, 2 * Math.PI);
ctx.arc(120, 115, 5, 0, 2 * Math.PI);
ctx.fill();
ctx.opacity -= 0.05;*/
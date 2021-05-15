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


/*ctx.fillStyle = "rgba(255, 0, 0, " + circle.opacity + ")";
ctx.arc(80, 115, 5, 0, 2 * Math.PI);
ctx.arc(120, 115, 5, 0, 2 * Math.PI);
ctx.fill();
ctx.opacity -= 0.01;*/
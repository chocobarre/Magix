const applyStyles = iframe => {
	let styles = {
		fontColor : "#FFFFFF",
		backgroundColor : "rgba(0, 0, 0, 0.7)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
	}
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
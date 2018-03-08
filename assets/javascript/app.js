var apiKey = "McNSC8SBAR4eCXtt4Ijlttss6Pasj2Pm";
function setButtons() {
	var topics = ["Death Note", "Girls Bravo", "Azumanga Daioh", "Attack on Titan", "Dragon Ball Z"];

	for (var i = 0; i < topics.length; i++) {
		var btn = $("<button class='btn btn-dark'>");
		btn.text(topics[i]);
		btn.attr("data-name", "data-" + i);
		$("#btnDiv").append(btn);


	}
}
setButtons();

var apiKey = "McNSC8SBAR4eCXtt4Ijlttss6Pasj2Pm";
var btn;
function setButtons() {
	var topics = ["Death Note", "Girls Bravo", "Azumanga Daioh", "Attack on Titan", "Dragon Ball Z"];

	for (var i = 0; i < topics.length; i++) {
		btn = $("<button class='btn btn-dark'>");
		btn.text(topics[i]);
		btn.attr("data-name", topics[i]);
		$("#btnDiv").append(btn);


	}
}
function getData() {
	console.log("hello");
	var search = $(this).attr("data-name").split(" ").join("+");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search + "&limit=10";
	console.log("url = " + queryURL);
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		console.log(response);
		for (var i = 0; i < 10; i++) {
			var img = $("<img>");
			var still_gif = response.data[i].images.fixed_height_still.url;
			var animated_gif = response.data[i].images.fixed_height.url;
			var rating = response.data[i].rating;
			console.log(rating);
			var p = $("<p>");
			console.log(still_gif);
			img.attr("src", still_gif);
			p.text("Rating: " + rating);
			$("#gifsDiv").prepend(p);
			$("#gifsDiv").prepend(img);
		}

	});
}

setButtons();
$(".btn").click(getData);

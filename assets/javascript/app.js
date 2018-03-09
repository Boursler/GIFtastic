var apiKey = "McNSC8SBAR4eCXtt4Ijlttss6Pasj2Pm";


function setButtons() {
	var topics = ["Death Note", "The Ancient Magus Bride", "Azumanga Daioh", "Attack on Titan", "Dragon Ball Z", "Unlimited Blade Works"];

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
			still_gif = response.data[i].images.fixed_height_still.url;
			animated_gif = response.data[i].images.fixed_height.url;
			var rating = response.data[i].rating;
			console.log(rating);
			var p = $("<p>");
			console.log(still_gif);
			img.attr("src", still_gif);
			img.attr("data-state", "still");
			img.attr("data-still", still_gif);
			img.attr("data-animate", animated_gif);
			img.addClass("img");

			p.text("Rating: " + rating);
			$("#gifsDiv").prepend(p);
			$("#gifsDiv").prepend(img);
		}

	});
}
function interact() {
	console.log("interact phase");
	if ($(this).attr("data-state") === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
}
// id="newButton-input
// input id="add-anime"
$("#add-anime").click(function addButton() {
	event.preventDefault();
	var newAnime = $("#newButton-input").val().trim();
	btn = $("<button class='btn btn-dark'>");
	btn.text(newAnime);
	btn.attr("data-name", newAnime);
	$("#btnDiv").append(btn);
	console.log(newAnime + "anime trying to add");
});

setButtons();
$(document).on("click", "button", getData);
$(document).on("click", "img", interact);

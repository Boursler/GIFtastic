var apiKey = "McNSC8SBAR4eCXtt4Ijlttss6Pasj2Pm";


function setButtons() {
	//create initial array of buttons
	var topics = ["Death Note", "Code Geass", "Naruto", "Attack on Titan", "Dragon Ball Z", "Unlimited Blade Works"];
	//make a button for each member of the initial array
	for (var i = 0; i < topics.length; i++) {
		makeButton(topics[i]);
	}
}

//prints a button to the page with text and data-name attribute passed-in
function makeButton(animeTitle) {
	btn = $("<button class='btn btn-dark'>");
	btn.text(animeTitle);
	btn.attr("data-name", animeTitle);
	btn.addClass("nav-item");
	$("#btnDiv").append(btn);
}

//function to make Ajax call
function getData() {
	//empty the gifsDiv so that it can be filled anew
	$("#gifsDiv").empty();
	//remove extra spaces to the left and right of the data-name attribute, then replace spaces between words with '+' for Giphy search
	var search = $(this).attr("data-name").trim().split(" ").join("+");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search + "&limit=10";
	console.log("url = " + queryURL);
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (response) {
		//callback function that takes giphy data, sets data attributes and prints to the page
		console.log(response);
		//check length of response & print if length matches 10
		if (lengthCheck(response)) {
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
				var gifContainer = $("<div id='gifContainer'>");
				$(gifContainer).prepend(p);
				$(gifContainer).prepend(img);
				$(gifContainer).addClass("col-md-6");
				$("#gifsDiv").prepend(gifContainer);
			}
		}
		else {
			//Print an error message and ask the user to select another anime
			$("#gifsDiv").text("Please choose another anime.");
		}
	});
}

function lengthCheck(response) {
	if (response.data.length === 10) {
		return true;
	}
	else {
		return false;
	}
}

function interact() {
	console.log("interact phase");
	if ($(this).attr("data-state") === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else if ($(this).attr("data-state") === "animate") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

$("#add-anime").click(function addButton() {
	event.preventDefault();
	var newAnime = $("#newButton-input").val().trim();
	makeButton(newAnime);
});

$(document).ready(function () {
	setButtons();
	$(document).on("click", "button", getData);
	$(document).on("click", "img", interact);
});

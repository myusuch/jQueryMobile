// Myungsuk Choi
// Assignment 3

var mapInfo;

$(document).on("pagebeforeshow", "#home", function() {

	// person.json
	$.getJSON("torontoWeather.json", function(data) {
		console.log(data);

		// Declare Variable
		var headerImg = data.query.results.channel.image.url;
		var lastDate = data.query.results.channel.lastBuildDate;
		var loc = data.query.results.channel.location;
		var wind = data.query.results.channel.wind;
		var atmosphere = data.query.results.channel.atmosphere;
		var astronomy = data.query.results.channel.astronomy;
		mapInfo = data.query.results.channel.item;

		// Header
		$("#header").html(
			// "<img src='" + headerImg + "'>&nbsp;&nbsp;&nbsp;&nbsp;" + lastDate
			"<img src='" + headerImg + "'><br>" + lastDate
		);

		// Location
		$("#location").html(
			"<h3 style='text-align:center;'>" + loc.city + " " + loc.country + " " + loc.region + "</h3>"
		);

		// Panel 1
		$("#windList").html(
				"<tr><td>Chill </td><td>: " + wind.chill  + "</td></tr>" +
				"<tr><td>Direction </td><td>: " + wind.direction  + "</td></tr>" +
				"<tr><td>Speed </td><td>: " + wind.speed  + "</td></tr>"
		);


		// Panel 2
		$("#atmosphereList").html(
				"<tr><td>Humidity </td><td>: " + atmosphere.humidity  + "</td></tr>" +
				"<tr><td>Pressure </td><td>: " + atmosphere.pressure  + "</td></tr>" +
				"<tr><td>Rising </td><td>: " + atmosphere.rising  + "</td></tr>" +
				"<tr><td>Visibility </td><td>: " + atmosphere.visibility  + "</td></tr>"
		);


		// Panel 3
		$("#astronomyList").html(
				"<tr><td>Sunrise </td><td>: " + astronomy.sunrise  + "</td></tr>" +
				"<tr><td>Sunset </td><td>: " + astronomy.sunset  + "</td></tr>"
		);


		// Map
		$("#mapButton").click(function() {

			$("#mapTitle").html(
				 mapInfo.title
			);

			var lat = mapInfo.lat;
			var lng = mapInfo.long;

			// fist step is set center point
			var mapCampus = new google.maps.LatLng(lat, lng);
			// Set map options
			var mapOptions = {
				center: mapCampus,
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.HYBRID
				// other options are ROADMAP, SATELLITE, TERRAIN
			}

			// draw map
			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

			// marker
			var myLoc = new google.maps.Marker( {

				map: map,
				icon: "pushpin.gif",    // optional... without will get default
				animation: google.maps.Animation.DROP,  		// or BOUNCE(optional)
				position: mapCampus

			});

		});

	});

	////////////////// person.json /////////////////////////////////////////////////////

	$.getJSON("personInfo.json", function(data) {
		console.log(data);

		//mapInfo = data.query.results.channel.item;

		var student = data.student;

		$("#aboutPic").html("<img width='100px' src='_css/images/" + student.image + "'>");
		$("#aboutDesc").html("<h4 class='aboutDetails'>Name:<br>" + student.studentName + "</h4>");
		$("#aboutDesc").append("<h4 class='aboutDetails'>Student Number:<br>" + student.studentNumber + "</h4>");
		$("#aboutDesc").append("<h4 class='aboutDetails'>Campus:<br>" + student.studentCampus + "</h4>");


	});

});


$(document).on("pagebeforeshow", "#foreCast", function() {

	// person.json
	$.getJSON("torontoWeather.json", function(data) {
		console.log(data);

	// Forecast
		var forecast = mapInfo.forecast;

		$("#foreCastDetails").html("");
		for(x=0; x<forecast.length; x++) {

			$("#foreCastDetails").append(

				"<section data-role='collapsible'>" +
					"<h2>" + forecast[x].date + "</h2>" +
					"<li>Day: " + forecast[x].day + "</li>" +
					"<li>High: " + forecast[x].high + "</li>" +
					"<li>Low: " + forecast[x].low + "</li>" +
					"<li>" + forecast[x].text + "</li>" +
				"</section>"
			);
		}
		$("#foreCastDetails").collapsibleset("refresh");
	});
});



$(document).ready(function() {


	$("#register").click(function() {

		// email
		var email = $("#email").val();
		// Type of Comments
		var type = $("input[name='type']:checked").attr("value");
		// Comment
		var comment = $("#comment").val();


		localStorage.setItem("email", email);
		localStorage.setItem("type", type);
		localStorage.setItem("comment", comment);

		alert("Your comment was saved.");

		// clear text after submit
		$("#email").val('');
		$('input[name=type]').attr('checked',false);
		$("#comment").val('');
	});


	$("#retrieve").click(function() {

		$("#localStroage").html(
			// localStorage.getItem("email") + "<br>" +
			// localStorage.getItem("type") + "<br>" +
			// localStorage.getItem("comment")

			"<tr><td>Email </td><td>: " + localStorage.getItem("email")  + "</td></tr>" +
			"<tr><td>Type </td><td>: " + localStorage.getItem("type")  + "</td></tr>" +
			"<tr><td>Comment </td><td>: " + localStorage.getItem("comment")  + "</td></tr>"

		);

	});
});

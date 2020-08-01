$(document).ready(function () {
  // sets 5 day forecast dates
  $("#dayOne h6").text(moment().date(Number).add(1, "d").format("MM/DD/YY"));
  $("#dayTwo h6").text(moment().date(Number).add(2, "d").format("MM/DD/YY"));
  $("#dayThree h6").text(moment().date(Number).add(3, "d").format("MM/DD/YY"));
  $("#dayFour h6").text(moment().date(Number).add(4, "d").format("MM/DD/YY"));
  $("#dayFive h6").text(moment().date(Number).add(5, "d").format("MM/DD/YY"));

  let cityStr;
  let cityLat;
  let cityLon;

  // create button from search entry - click on search button
  $("#searchBtn").on("click", function (event) {
    cityStr = $("#search-text-input").val();

    let weatherBtn = $("<button>");
    let hiddenDiv1 = $("<div id='hidden1'>");
    let hiddenDiv2 = $("<div id='hidden2'>");
    weatherBtn.text(cityStr);

    $("#weatherButtons").append(weatherBtn);
    $("#weatherButtons").append(hiddenDiv1);
    $("#weatherButtons").append(hiddenDiv2);

    // open weather API call for 1 day forecast
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityStr.trim() +
      "&units=imperial&appid=74cf78750ecac686f9f70dee01219c17";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response.coord.lon);
      console.log(response.coord.lat);
      cityLon = response.coord.lon;
      cityLat = response.coord.lat;

      var tempF = parseInt(response.main.temp);
      var imgIcon = response.weather[0].icon;
      // set hidden div in html with lat and lon coord to draw from for onecall api query
      $("#hidden1").text(cityLat);
      $("#hidden2").text(cityLon);

      $("#Name").text(response.name);

      $("#Date").text("Date: " + new Date().toLocaleDateString());
      // create variable for icon to feed into the URL
      $("#weatherIcon > img").attr(
        "src",
        "http://openweathermap.org/img/wn/" + imgIcon + "@2x.png"
      );

      $("#Temp").text("Temperature: " + tempF + " F");

      $("#Humidity").text("Humidity: " + response.main.humidity + "%");
      $("#WindSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
      // whatever this is will have to move to the 3rd API call...
      $("#UVIndex").text("UV Index: " + response.main[3]);
    });

    let cityLat = $("#hidden1").toString();
    let cityLon = String.valueOf($("#hidden2"));

    // open weather API call for 5 day forecast
    const queryURL5Day =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&units=imperial&appid=74cf78750ecac686f9f70dee01219c17";
    console.log(queryURL5Day);

    $.ajax({
      url: queryURL5Day,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      // console.log(cityStr);
      let results = response.list;

      for (let i = 0; i < results.length; i++) {
        // let x = i + 8; there are 8 data entries for each day.
        console.log(response.list[i]);
        var responseData = response.list[i];

        var tempF = parseInt(response.main.temp);
        $("p.card-text.temp").text("Temp: " + tempF + " F");
      }
      console.log(tempF);
    });
  });

  // end of ready statement
});

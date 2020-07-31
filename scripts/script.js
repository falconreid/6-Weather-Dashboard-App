$(document).ready(function () {
  // sets 5 day forecast dates
  $("#dayOne h6").text(moment().date(Number).add(1, "d").format("MM/DD/YY"));
  $("#dayTwo h6").text(moment().date(Number).add(2, "d").format("MM/DD/YY"));
  $("#dayThree h6").text(moment().date(Number).add(3, "d").format("MM/DD/YY"));
  $("#dayFour h6").text(moment().date(Number).add(4, "d").format("MM/DD/YY"));
  $("#dayFive h6").text(moment().date(Number).add(5, "d").format("MM/DD/YY"));

  let cityStr;
  // create button from search entry - click on search button
  $("#searchBtn").on("click", function (event) {
    cityStr = $("#search-text-input").val();

    let weatherBtn = $("<button>");
    weatherBtn.text(cityStr);

    $("#weatherButtons").append(weatherBtn);

    // open weather API call for 1 day forecast
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityStr.trim() +
      "&appid=74cf78750ecac686f9f70dee01219c17";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var Kelvin = response.main.temp;
      var Fahrenheit = (Kelvin - 273.15) * 1.8 + 32;
      var tempF = parseInt(Fahrenheit);
      var imgIcon = response.weather[0].icon;

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

    // open weather API call for 5 day forecast
    const queryURL5Day =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityStr.trim() +
      "&appid=74cf78750ecac686f9f70dee01219c17";
    console.log(queryURL5Day);

    $.ajax({
      url: queryURL5Day,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      // console.log(cityStr);
      let results = response.list;

      for (let i = 3; i < results.length; i += 8) {
        const element = results[i];
        // let x = i + 8; there are 8 data entries for each day.
        console.log(response.list[i]);
        var responseData = response.list[i];

        var Kelvin = responseData.main.temp;
        var Fahrenheit = (Kelvin - 273.15) * 1.8 + 32;
        var tempF = parseInt(Fahrenheit);
        $("p.card-text.temp").text("Temp: " + tempF + " F");
      }
      console.log(tempF);
    });
  });

  // end of ready statement
});

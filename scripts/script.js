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
  let retrievedData;

  // create button from search entry - click on search button
  // $("#searchBtn").on("click", function (event) {
  //   event.preventDefault();
  //   cityStr = $("#search-text-input").val();
  //   localStorage.setItem("Cities", JSON.stringify(cityStr));
  let dataArrayForLocalStorage = [];

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    cityStr = $("#search-text-input").val();
    dataArrayForLocalStorage.push(cityStr);
    localStorage.setItem("Cities", JSON.stringify(dataArrayForLocalStorage));

    // setting buttons
    let weatherBtn = $(
      `<button data-storage-index="${dataArrayForLocalStorage.length - 1}">`
    ).attr("class", "glow-on-hover");
    // setting div to receive lat and lon (avoid scoping problems)
    let hiddenDiv1 = $("<div id='hidden1'>");
    let hiddenDiv2 = $("<div id='hidden2'>");
    weatherBtn.text(cityStr);

    $("#weatherButtons").append(weatherBtn);
    $("#weatherButtons").append(hiddenDiv1);
    $("#weatherButtons").append(hiddenDiv2);

    $(".glow-on-hover").on("click", function (event) {
      event.preventDefault();
      retrievedData = localStorage.getItem("Cities");
      let retrievedArray = JSON.parse(retrievedData);
      let index = $(this).data("storage-index");
      console.log(retrievedArray[index]);
    });

    // open weather API call for 1 day forecast
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityStr.trim() +
      "&units=imperial&appid=74cf78750ecac686f9f70dee01219c17";

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // set longitude and latitude variable values
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

        // feeding data into temp, humidity and wind speed
        $("#Temp").text("Temperature: " + tempF + " F");
        $("#Humidity").text("Humidity: " + response.main.humidity + "%");
        $("#WindSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
      })
      .then(function () {
        // creating hidden variables in html to avoid scoping problem
        let cityLat = $("#hidden1").text();
        let cityLon = $("#hidden2").text();

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
          let results = [response.daily[0]];
          console.log(results);
          console.log(response.daily[0].feels_like.day);
          console.log(response.daily[0].humidity);
          console.log(response.daily[0].weather[0].icon);

          // Change images in the 5 day forecast
          $("#d1").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              response.daily[0].weather[0].icon +
              "@2x.png"
          );

          $("#d2").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              response.daily[1].weather[0].icon +
              "@2x.png"
          );

          $("#d3").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              response.daily[2].weather[0].icon +
              "@2x.png"
          );

          $("#d4").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              response.daily[3].weather[0].icon +
              "@2x.png"
          );

          $("#d5").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              response.daily[4].weather[0].icon +
              "@2x.png"
          );

          // set daily temperatures

          $("#temp1").text("Temp: " + response.daily[0].feels_like.day + " F");
          $("#temp2").text("Temp: " + response.daily[1].feels_like.day + " F");
          $("#temp3").text("Temp: " + response.daily[2].feels_like.day + " F");
          $("#temp4").text("Temp: " + response.daily[3].feels_like.day + " F");
          $("#temp5").text("Temp: " + response.daily[4].feels_like.day + " F");

          // set daily humidity percentage
          $("#humid1").text("Humidity: " + response.daily[0].humidity + "%");
          $("#humid2").text("Humidity: " + response.daily[1].humidity + "%");
          $("#humid3").text("Humidity: " + response.daily[2].humidity + "%");
          $("#humid4").text("Humidity: " + response.daily[3].humidity + "%");
          $("#humid5").text("Humidity: " + response.daily[4].humidity + "%");

          // UV INDEX Section...
          $("#UVIndex").text("UV Index: " + response.current.uvi);
          if (response.current.uvi <= 5) {
            $("#UVIndex").attr("class", "low");
          } else if (response.current.uvi > 5 && response.current.uvi <= 7) {
            $("#UVIndex").attr("class", "med");
          } else if (response.current.uvi >= 8) {
            $("#UVIndex").attr("class", "high");
          }

          // $(".glow-on-hover").on("click", function () {
          //   event.preventDefault();
          //   retrievedData = localStorage.getItem("Cities");
          //   console.log(JSON.parse(retrievedData));
          //   console.log("x+1");
          // });
        });
      });
  });

  // end of ready statement
});

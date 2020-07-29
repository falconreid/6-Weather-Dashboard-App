$(document).ready(function () {
  // create global variables
  let cityName = "Longmont";
  let stateName = "CO";
  let countryName = "US";

  $(this).on("click", function () {
    var cityStr = $("#search-text-input").val();
  });

  // open weather API call
  const queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName.trim() +
    "," +
    stateName.trim() +
    "," +
    countryName.trim() +
    "&appid=74cf78750ecac686f9f70dee01219c17";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(cityName);
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      let weatherBtn = $("<button></button>");
      weatherBtn.text = "cityStr";
    }
  });

  // end of ready statement
});

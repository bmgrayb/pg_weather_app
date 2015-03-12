function getWeather(){
		var city = $('#city').val();
		//window.location.href = "#aboutScreen";
		$.ajax({
		    url:'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',us&cnt=5&mode=json',
		}).done(function(data){
			var results = parseFeed(data,5);

      display(results, city);

		});
}


var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Always upper case the description string
    var weather = data.list[i].weather[0].main;
    weather = weather.charAt(0).toUpperCase() + weather.substring(1);

    var temp = data.list[i].temp.day;
    var fahr = (temp - 273.15)*1.8 + 32;

    items.push({
      weather:weather,
      temp:Math.round(fahr)
    });
  }

  // Finally return whole array
  return items;
};

function display(results, city){
$('#loc').replaceWith('<h3 id="loc" name="loc">Forecast for ' + city + '</h3>');

  var display = '<table align="center" id="display" name="display" data-role="table" class="ui-responsive"><tr><th>Forecast</th><th>Temperature</th></tr>';
  display += '<tr><td>' + results[0].weather + '</td><td>' + results[0].temp + '</td></tr>';
  display += '<tr><td>' + results[1].weather + '</td><td>' + results[1].temp + '</td></tr>';
  display += '<tr><td>' + results[2].weather + '</td><td>' + results[2].temp + '</td></tr>';
  display += '<tr><td>' + results[3].weather + '</td><td>' + results[3].temp + '</td></tr>';
  display += '<tr><td>' + results[4].weather + '</td><td>' + results[4].temp + '</td></tr>';
  display += '</table>';
  $('#display').replaceWith(display);
}
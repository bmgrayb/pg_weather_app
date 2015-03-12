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
    var desc = data.list[i].weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.substring(1);
    var time = data.list[i].dt;
    var d = new Date(0);
    d.setUTCSeconds(time);
    var day = getDayName(d);
    var temp = data.list[i].temp.day;
    var fahr = (temp - 273.15)*1.8 + 32;
    var icon = data.list[i].weather[0].icon;
    icon = $.trim(icon);

    items.push({
      weather:weather,
      desc:desc,
      temp:Math.round(fahr),
      icon:icon,
      time:day
    });
  }

  // Finally return whole array
  return items;
};

function getDayName(d){
  var weekday = new Array(7);
  weekday[0]=  "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
  return weekday[d.getDay()];
}

function display(results,city){
  $('#loc').replaceWith('<h3 id="loc" name="loc">Forecast for ' + city + '</h3>');

  var display = '<div id="display" name="display" class="ui-grid-d  addBorder" align="center">';

  display += '<div class="ui-block-a"><b>' + results[0].time.toUpperCase() + '</b><br/><br/>' + results[0].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[0].icon +'.png"><br/>' + results[0].weather.toUpperCase() + '<br/><br/>' + results[0].desc + '</div>';
  display += '<div class="ui-block-b"><b>' + results[1].time.toUpperCase() + '</b><br/><br/>' + results[1].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[1].icon +'.png"><br/>' + results[1].weather.toUpperCase() + '<br/><br/>' + results[1].desc + '</div>';
  display += '<div class="ui-block-c"><b>' + results[2].time.toUpperCase() + '</b><br/><br/>' + results[2].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[2].icon +'.png"><br/>' + results[2].weather.toUpperCase() + '<br/><br/>' + results[2].desc + '</div>';
  display += '<div class="ui-block-d"><b>' + results[3].time.toUpperCase() + '</b><br/><br/>' + results[3].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[3].icon +'.png"><br/>' + results[3].weather.toUpperCase() + '<br/><br/>' + results[3].desc + '</div>';
  display += '<div class="ui-block-e"><b>' + results[4].time.toUpperCase() + '</b><br/><br/>' + results[4].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[4].icon +'.png"><br/>' + results[4].weather.toUpperCase() + '<br/><br/>' + results[4].desc + '</div>';

  display += '</div>';

  $('#display').replaceWith(display);
}

function display1(results, city){
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
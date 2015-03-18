function getWeather(){
		var city = $('#city').val();
    var co = $('#country').val();
    var loc = city + "," + co;

    if(city === "" || city === null) return; //alert(getLocOnNull());

		$.ajax({
		    url:'http://api.openweathermap.org/data/2.5/forecast/daily?q='+loc+'&cnt=5&mode=json',
		}).done(function(data){
			var results = parseFeed(data,5);

      display(results, loc.toUpperCase());

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

function display(results,loc){
  $('#loc').replaceWith('<h3 id="loc" name="loc">Forecast for ' + loc + '</h3>');

  var display = '<div id="display" name="display" class="ui-grid-d  addBorder" align="center">';

  display += '<div class="ui-block-a"><b>' + results[0].time.toUpperCase() + '</b><br/><br/>' + results[0].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[0].icon +'.png"><br/>' + results[0].weather.toUpperCase() + '<br/><br/>' + '</div>';
  display += '<div class="ui-block-b"><b>' + results[1].time.toUpperCase() + '</b><br/><br/>' + results[1].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[1].icon +'.png"><br/>' + results[1].weather.toUpperCase() + '<br/><br/>' + '</div>';
  display += '<div class="ui-block-c"><b>' + results[2].time.toUpperCase() + '</b><br/><br/>' + results[2].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[2].icon +'.png"><br/>' + results[2].weather.toUpperCase() + '<br/><br/>' + '</div>';
  display += '<div class="ui-block-d"><b>' + results[3].time.toUpperCase() + '</b><br/><br/>' + results[3].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[3].icon +'.png"><br/>' + results[3].weather.toUpperCase() + '<br/><br/>' + '</div>';
  display += '<div class="ui-block-e"><b>' + results[4].time.toUpperCase() + '</b><br/><br/>' + results[4].temp + '&deg;<br/><img src="http://openweathermap.org/img/w/' + results[4].icon +'.png"><br/>' + results[4].weather.toUpperCase() + '<br/><br/>' + '</div>';

  display += '</div>';

  $('#display').replaceWith(display);
}

function getLocOnNull(){
  var message;
  navigator.geolocation.getCurrentPosition(getMessage, onError);
}

function getMessage(position){
  var message = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
  return message;
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(toastLocation, onError);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function toastLocation(position){
  var message = "Longitude: " + position.coords.longitude + "\n";
  message += "Latitude: " + position.coords.latitude;
  window.plugins.toast.showLongBottom(message,function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}









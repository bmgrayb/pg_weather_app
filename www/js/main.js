function sayHello(){
		var city = $('#city').val();
		//window.location.href = "#aboutScreen";
		$.ajax({
		    url:'http://api.openweathermap.org/data/2.5/forecast?q=London',
		}).done(function(data){
			var results = parseFeed(data,5);
			alert(results[0][0]);
		});
}


var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Always upper case the description string
    var title = data.list[i].weather[0].main;
    title = title.charAt(0).toUpperCase() + title.substring(1);

    // Get date/time substring
    var time = data.list[i].dt_txt;
    time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

    // Add to menu items array
    items.push({
      title:title,
      subtitle:time
    });
  }

  // Finally return whole array
  return items;
};
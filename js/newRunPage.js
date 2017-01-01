// Code for the Measure Run page.

//the origin distance.
var start; 
// the current position.
var current;
// the distance between current position with end point.
var distance;
// the distance user has travelled.
var traveled = 0;
// the end point.
var arrival;
// the time cost him to run.
var runtime = 0;
var beginTime;
var endTime;
// the map.
var map;
// the condition if the run finished.
var flag = false;
var unit = 1000;
// the condition if the run begin.
var isBegin = false; 
var index = 0;
var runList = new Array();
// indentify if this try a retry instance.
var status = localStorage.getItem("status");
var retryStart;

function init()
{
	if (status !== "retry"){
		setInterval("getLocation()", 5*unit);
	}else{
		itemIndex = JSON.parse(localStorage.getItem("index"));
		viewretryRun(itemIndex);
	}
}

// normal run:
// get the current location and mark on the map.
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }


function showPosition(position)
  {
  if (typeof(map) === "undefined"){
	  lat=position.coords.latitude;
	  lon=position.coords.longitude;
	  latlon=new google.maps.LatLng(lat, lon)
	  mapholder=document.getElementById('mapholder')
	  mapholder.style.height='250px';
	  mapholder.style.width='500px';

	  var myOptions={
	  center:latlon,zoom:14,
	  mapTypeId:google.maps.MapTypeId.ROADMAP,
	  mapTypeControl:false,
	  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	  };
	  map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
	  current=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	  }
  else{
  	  lat=position.coords.latitude;
	  lon=position.coords.longitude;
	  latlon=new google.maps.LatLng(lat, lon)
	  current=new google.maps.Marker({position:latlon, map:map, title:"Your are here!"});
  }
}

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }

function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}


function generatePos()
{
	if (status !== "retry"){
		lat=current.getPosition().lat();
	  	lon=current.getPosition().lng();
	  	latlon=new google.maps.LatLng(lat, lon)
		var length = RandomNumBoth(60, 150);
		var angle = RandomNumBoth(10, 175);
		var new_loc = google.maps.geometry.spherical.computeOffset(latlon, length, angle);
		if (typeof(arrival) == "undefined"){
			arrival=new google.maps.Marker({position:new_loc, map:map, title:"A candidate goal!"});
		}else{
			arrival=new google.maps.Marker({position:new_loc, map:map, title:"A candidate goal!"});
		}
		distance = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), arrival.getPosition());	
	   	document.getElementById('length').value = distance; 	
	   }
	else{
		alert("can't set arrival");
	}
}

// show the init distance between the begin and the end.
function showDistance() 
{
  	document.getElementById('length').value = distance;
}

function checkDistance()
{
	if (!flag){
		if (status !== "retry"){
  		distance = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), arrival.getPosition());	
  		console.log(distance);
  		if (distance < 10){
  			finishRun();
  	}
  }else{
  		distance = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), arrival);	
  		console.log(distance);
  		if (distance < 10){
  			finishRun();
  		}
  	}
  }
}

function beginRun()
{
	if (status !=="retry"){
		start = jQuery.extend(true, {}, current);
		var beginTime = new Date().getTime();
		if (typeof(arrival) === "undefined"){
			alert("please first set the end point.");
			return;
		}
		else{
			setInterval("timedCount()", unit);
			setInterval("checkDistance()", 2*unit);
			setInterval("showTraveled()", 2*unit);
		}
	}else{
		getLocation();
		setTimeout(checkStart, 5000);
	}
}

function timedCount()
 {
 	if (!flag)
	 	{
	 	runtime += 1;
	 	console.log(runtime);
	 	}
	showTime();
 }

 function finishRun () {
 	flag =true;
 	if (status !== "retry"){
	 	var endTime = new Date().getTime();
	 	// newRun = new Run(start, arrival, beginTime, endTime);
	 	var newRun = {'start_lat': start.getPosition().lat(), 'start_lon': start.getPosition().lng(),'arrival_lon': arrival.getPosition().lng(), 'arrival_lat': arrival.getPosition().lat(), 'beginTime': beginTime, 'endTime': endTime}
	 	runList[index] = newRun;
	 	index += 1;
	 	localStorage.setItem(APP_PREFIX + "-RunList", runList);
	 }else{
	 	itemIndex = JSON.parse(localStorage.getItem("index"));
	 	var endTime = new Date.getTime();
	 	var newRun = {'start_lat': start.getPosition().lat(), 'start_lon': start.getPosition().lng(),'arrival_lon': arrival.getPosition().lng(), 'arrival_lat': arrival.getPosition().lat(), 'beginTime': beginTime, 'endTime': endTime}
	 	runList[itemIndex] = newRun;
	 	localStorage.setItem(APP_PREFIX + "-RunList", runList);
	 }
 }

 function showTime(){
 	document.getElementById('time').value = runtime;
 }

 function showTraveled(){
 	if (!flag){
 		if (status !== "retry"){
 			traveled = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), start.getPosition());
 			document.getElementById('traveled').value = traveled;
 		}else{
 			traveled = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), retryStart);
 			document.getElementById('traveled').value = traveled;
 		}
 	}
 }

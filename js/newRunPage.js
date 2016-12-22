// Code for the Measure Run page.

//the origin distance.
var start; 
// the current position.
var current;
// the distance between current position with end point.
var distance;
// the map.
var map;
// the condition if the run finished.
var flag = false;
var unit = 1000;
// the condition if the run begin.
var isBegin = false; 
function init()
{
	setInterval("getLocation()", 5*unit);
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

function generatePos()
{
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

// show the init distance between the begin and the end.
function showDistance() 
{
  	document.getElementById('length').value = distance;
}

function checkDistance()
{
	if (!flag){
  		distance = google.maps.geometry.spherical.computeDistanceBetween(current.getPosition(), arrival);	
  		console.log(distance);
  		if (distance < 10){
  			finishRun();
  		}
  	}
}

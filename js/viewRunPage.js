// Code for the View Run page.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.
var viewStart;
var viewArrival;
var itemIndex;

function initViewRun(){
	itemIndex = JSON.parse(localStorage.getItem("index"));
	viewRun();
}
function viewRun () {
	run = JSON.parse(localStorage.getItem(APP_PREFIX + "-RunList"))[itemIndex];
	var startLat = run.start_lat;
	var startLon = run.start_lon;
	var arrivalLat = run.arrival_lat;
	var arrivalLon = run.arrival_lon;
	var beginTime = run.beginTime;
	var endTime = run.endTime;
	var startLatlon=new google.maps.LatLng(startLat, startLon)
	var mapholder=document.getElementById('mapholder')
	mapholder.style.height='250px';
	mapholder.style.width='500px';
	var myOptions={
	center:startLatlon,zoom:14,
	mapTypeId:google.maps.MapTypeId.ROADMAP,
	mapTypeControl:false,
	navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	};
	arrivalLatlon=new google.maps.LatLng(arrivalLat, arrivalLon)
	map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
	viewStart=new google.maps.Marker({position:startLatlon,map:map,title:"Your start!"});
	viewArrival = new google.maps.Marker({position:arrivalLatlon,map:map,title:"Your arrival!"});
	traveled = google.maps.geometry.spherical.computeDistanceBetween(startLatlon, arrivalLatlon);
	time = (endTime - beginTime)/1000;
	average = traveled / time;

	document.getElementById('traveled').value = traveled;
	document.getElementById('time').value = time;
	document.getElementById('average').value = average;
}

function deleteRun(){
	var run = localStorage.getItem(APP_PREFIX + "-RunList");
	run.splice(itemIndex, itemIndex);
	window.location.href="index.html";
} 

function restart(){
	window.location.href="newRun.html";
	localStorage.setItem("status", "retry");
}

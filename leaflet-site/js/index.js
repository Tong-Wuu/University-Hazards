$( document ).ready(function() {
    var map = createMap();
    addBasemap(map);
    addPoints(map);
});

var createMap = function () {
	var mymap = L.map('mapid').setView([-80.5, 43], 6);
	return mymap;
}

//adds openstreet basemap to map
var addBasemap = function (map) {
	var basemap = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
		attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
}

//adds hazards to map
var addPoints = function (map) {
	var styleOptions = {
	    radius: 5,
	    fillColor: "#000000",
	    color: "#000",
	    weight: 0.5,
	    opacity: 1,
	    fillOpacity: 0.9
	};
	var pointsOnMap = L.geoJson(pointsJSON, {
	    pointToLayer: function (feature, latlng) {
	        return L.circleMarker(latlng, styleOptions);
	    },
	    onEachFeature: applyProperties
	}).addTo(map);
	map.fitBounds(pointsOnMap.getBounds());
}

//applying colour and popup to each point layer
var applyProperties = function (feature, layer) {
	var style = {
		"Ponding": "rgb(237, 87, 242)",
		"Blocked Sidewalk": "rgb(81, 201, 121)",
		"Excessive Cross-Slope": "rgb(224, 105, 92)",
		"Excessive Slope": "rgb(65, 130, 130)",
		"Missing Curb Cut": "rgb(154, 189, 245)",
		"Missing Sidewalk Slab": "rgb(153, 146, 81)",
		"Trip Hazard": "rgb(211, 245, 88)",
		"Unevenness": "rgb(53, 69, 148)",
		"Other": "rgb(173, 94, 148)"
	}
	if (feature.properties) {
		var newStyle = {
			fillColor: ""
		}
		newStyle['fillColor'] = style[feature.properties.Issue];

		layer.bindPopup(feature.properties.Issue);
		layer.setStyle(newStyle);
	}
}

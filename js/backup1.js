
// 1. Create a map object.
var mymap = L.map('map', {
    center: [32, 118],
    zoom: 7,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true // detect whether the sceen is high resolution or not.
});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add cell towers GeoJSON Data
// Null variable that will hold cell tower data
var mingroute = null;
// Get GeoJSON and put on it on the map when it loads


// 4. build up a set of colors from colorbrewer's dark2 category
var colors = chroma.scale('Set2').mode('lch').colors(4);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 4; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
// Get GeoJSON and put on it on the map when it loads
mingroute= L.geoJson.ajax("assets/ming_route_station_official.geojson", {
    // assign a function to the onEachFeature parameter of the cellTowers object.
    // Then each (point) feature will bind a popup window.
    // The content of the popup window is the value of `feature.properties.company`

    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.TYPE == "1") { id = 0; }
        else if (feature.properties.TYPE == "2")  { id = 1; }
        else if (feature.properties.TYPE == "3")  { id = 2; }
        else { id = 3;} // "Salem Cellular"
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-home marker-color-' + (id + 1).toString() })});
    },
    attribution: 'MiNG_ROUTES_STATION| Base Map &copy; CartoDB | Made By BAREMAN'
});
mingroute.addTo(mymap)



// 9. Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright'});

// 10. Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<hr><b>Station<b><br />';
    div.innerHTML += '<i class="fa fa-home marker-color-1"></i><p> 马驿</p>';
    div.innerHTML += '<i class="fa fa-home marker-color-2"></i><p> 水驿</p>';
    div.innerHTML += '<i class="fa fa-home marker-color-3"></i><p> 水马驿</p>';
    div.innerHTML += '<i class="fa fa-home marker-color-4"></i><p> 不明</p>';
    div.innerHTML += '<hr>';
    // Return the Legend div containing the HTML content
    return div;
};

// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);



var mingroute = null;
// Get GeoJSON and put on it on the map when it loads
mingroute= L.geoJson.ajax("assets/ming_route_station_official.geojson",{
    attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB | Made By Bo Zhao'
});
// Add the cellTowers to the map.
mingroute.addTo(mymap);
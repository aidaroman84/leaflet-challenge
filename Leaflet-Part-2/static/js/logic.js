// Store our API endpoints
let earthquakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tecplatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
const api_key = "pk.eyJ1IjoiYWlkYXJvbWFuODQiLCJhIjoiY2xyeGh2cHdwMGpxbTJqbXBqdTI3MmJhNyJ9.ifBcSoN79P98z_lZqjaAEA";

// Create base layers for diferent map styles
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}@2x?access_token={access_token}', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 20,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    access_token: api_key
  });
let grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token={access_token}', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    id:'mapbox/light-v11',
    maxZoom: 20,
    tileSize: 512,
    zoomOffset: -1,
    access_token: api_key
  });
  let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token={access_token}', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    id:'mapbox/outdoors-v12',
    maxZoom: 20,
    tileSize: 512,
    zoomOffset: -1,
    access_token: api_key
  });

// Crete baseMaps objects to hold base layers
let baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors,
};

// Layer groups
let tectonicPlatesLayer = new L.LayerGroup();
let earthquakeLayer = new L.LayerGroup();

// Create overLay objects
let overlayMaps = {
  "Earthquakes": earthquakeLayer,
  "Tectonic Plates":  tectonicPlatesLayer 
};

// Create the Map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [satellite, earthquakeLayer, tectonicPlatesLayer]
  });

// Create and add control layers to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Adding a tile layer to our map
//L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(myMap);

// Perform a GET request to the eartquake URL
d3.json(earthquakesUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features, earthquakeLayer);
});
// Perform a GET request to the tectonic plates URL
d3.json(tecplatesUrl).then(function(plateData) {
  // Adding Tectonic data
  L.geoJSON(plateData, {
    color: "blue",
    weight: 2
  }).addTo(tectonicPlatesLayer);
  tectonicPlatesLayer.addTo(myMap);
});

 // Set marker size based on magnitud
 function markerSize(magnitude) {
  return magnitude * 20000; 
}

// Set marker color based on depth
function markerColor(depth) {
  if (depth > 90) return "#ff0000";
  else if (depth > 70) return "#ff6600";
  else if (depth > 50) return "#ffcc00";
  else if (depth > 30) return "#ffff00";
  else if (depth > 10) return "#ccff00";
  else return "#66ff00";
}

 // Create features function
 function  createFeatures(earthquakeData, earthquakeLayer) {
  // Function for each feature in the features array.
  function onEachFeature(feature, layer) {
      // Popups providing additional information about the earthquake when its associated marker is clicked.
      layer.bindPopup(`<strong>Location: </strong>${feature.properties.place}<br><strong>Date: </strong>${new Date(feature.properties.time)}<br><strong>Magnitude: </strong>${feature.properties.mag}<br><strong>Depth: </strong>${feature.geometry.coordinates[2]}`);
  }

  // Adding earthquake data to the earthquakeLayer
  L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
       return L.circle(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
  },
   onEachFeature: onEachFeature
  }).addTo(earthquakeLayer);
  earthquakeLayer.addTo(myMap);
}

// Set up the legend
let legend = L.control({ position: "bottomright"});
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let depthRange = [-10, 10, 30, 50, 70, 90];
  let colors = ["#66ff00", "#ccff00", "#ffff00", "#ffcc00", "#ff6600", "#ff0000"];


  // Looping through the depth intervals and set color for each one
  for (let i = 0; i < depthRange.length; i++) {
    div.innerHTML +=
    '<i style="background:' + colors[i] + '"></i> ' +
    depthRange[i] + (depthRange[i + 1] ? '&ndash;' + depthRange[i + 1] + '<br>' : '+');
}
return div;
};

// Adding legend to the map
legend.addTo(myMap);


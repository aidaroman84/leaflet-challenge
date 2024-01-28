// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create the map
let myMap = L.map("map", {
    center: [37.09, -95.71], 
    zoom: 5
  });

  // Adding a tile layer to our map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
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
  function  createFeatures(earthquakeData) {
    // Function for each feature in the features array.
    function onEachFeature(feature, layer) {
        // Popups providing additional information about the earthquake when its associated marker is clicked.
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p></h3><hr><p>Magnitude: ${feature.properties.mag}</p></h3><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
 
    // Adding earthquake data to the map
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
    }).addTo(myMap);
  }
  
// Set up the legend
let legend = L.control({ position: "bottomright"});
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let depthRange = [-10, 10, 30, 50, 70, 90];
  let colors = ["#66ff00", "#ccff00", "#ffff00", "#ffcc00", "#ff6600", "#ff0000"];
  //let labels = [];

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

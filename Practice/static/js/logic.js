var layers = {
    circles: new L.layerGroup(),
    lines: new L.layerGroup(),

}

var map = L.map("map", {
    center: [37.7749, -97.4194],
    zoom: 5,
    layers: [layers.circles, layers.lines]
});

//setting open arrays available to take coordinates based on each year to create layers for each year
var circles = [];
var lines = [];



circles = L.layerGroup(circlelink_data)
// lines = L.layerGroup(two_thousand_five_layer_data)




var ots = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);

var ten = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
}).addTo(map);

var fifteen = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(map);


var baseMaps = {
    Satellite: ots,
    Dark: ten,
    Light: fifteen
};


var overlayMaps = {
    Earthquakes: layers.circles,
    FaultLines: layers.lines
};



var circlelink = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'


// for (var i = 0; i < locations.length; i++) {
//     // Setting the marker radius for the state by passing population into the markerSize function
//     circles.push(
//         L.circle(circlelink[i].coordinates, {
//             stroke: false,
//             fillOpacity: 0.75,
//             color: "white",
//             fillColor: "white",
//             radius: markerSize(circlelink[i].state.population)
//         })
//     );


var mapStyle = {
    color: "white",
    fillColor: "gold",
    fillOpacity: 0.5,
    weight: 1.5
  };

    var circlelink_data =
        // Grabbing our GeoJSON data..
        d3.json(circlelink, function (data) {
            // Creating a geoJSON layer with the retrieved data
            L.geoJson(data, {
                // Passing in our style object
                style: mapStyle
            })
    // onEachFeature: function (feature, layer) {
    //     // Set mouse events to change map styling
    //     layer.on({
    //         // Change when mouse goes over state
    //         mouseover: function (event) {
    //             layer = event.target;
    //             layer.setStyle({
    //                 fillOpacity: 0.9
    //             });
    //             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + chooseColor2000(feature.properties.name) + "</h2>")
    //         },
    //         // Return opacity back to normal
    //         mouseout: function (event) {
    //             layer = event.target;
    //             layer.setStyle({
    //                 fillOpacity: chooseOpactiy2000(feature.properties.name)
    //             });
    //         },
    //         // When a feature (state) is clicked, it is enlarged to fit the screen
    //         click: function (event) {
    //             map.fitBounds(event.target.getBounds());
    //         }
    //     });
    //     // Giving each feature a pop-up with information pertinent to it
    //     layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2000(feature.properties.name) + "</h3>");

    // }
}).addTo(layers.circles);


// var two_thousand_five_layer_data =
//     L.geoJSON(statesData, {
//         // Style each feature (in this case a neighborhood)
//         style: function (feature) {
//             return {
//                 // color: "white",
//                 // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//                 fillColor: getColor(chooseColor2005(feature.properties.name)),
//                 fillOpacity: chooseOpactiy2005(feature.properties.name),
//                 weight: 1.5
//             };
//         },
//         onEachFeature: function (feature, layer) {
//             // Set mouse events to change map styling
//             layer.on({
//                 // Change when mouse goes over state
//                 mouseover: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: 0.9
//                     });
//                     // layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + feature.properties.density + "</h2>")
//                 },
//                 // Return opacity back to normal
//                 mouseout: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: chooseOpactiy2005(feature.properties.name)
//                     });
//                 },
//                 // When a feature (state) is clicked, it is enlarged to fit the screen
//                 click: function (event) {
//                     map.fitBounds(event.target.getBounds());
//                 }
//             });
//             // Giving each feature a pop-up with information pertinent to it
//             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "Funding Per Enrollment" + "</h2> <hr> <h3>" + chooseColor2005(feature.properties.name) + "</h3>");

//         }
//     }).addTo(layers.two_thousand_five_layer);


L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
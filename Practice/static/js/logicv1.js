var layers = {
    circles: new L.layerGroup(),
    lines: new L.layerGroup(),

}

var map = L.map("map", {
    center: [37.7749, -97.4194],
    zoom: 3,
    layers: [layers.circles, layers.lines]
});

//setting open arrays available to take coordinates based on each year to create layers for each year


circles = L.layerGroup(circlelink_data)
lines = L.layerGroup(linelink_data)



var ots = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);

var ten = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(map);

var fifteen = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
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




function getColor(magnitude) {
    return magnitude >= 9 ? '#E65D3E' :
        magnitude >= 8 ? '#E1BB20' :
            magnitude >= 7 ? '#F8D858' :
                magnitude >= 6 ? '#D5FB24' :
                    magnitude >= 5 ? '#DFFC58' :
                        magnitude >= 4 ? '#A1FA33' :
                            magnitude >= 3 ? '#ACFC49' :
                                magnitude >= 2 ? '#BDFA72' :
                                    magnitude >= 1 ? '#72FA7B' :
                                        magnitude >= 0 ? '#99FCA0' :
                                            '#FFFFFF';
}

function getRadius(magnitude) {
    if (magnitude == 0) {
        return 0.5
    }
    return magnitude * 9
}


var circlelink = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

var circlelink_data =
    // Grabbing our GeoJSON data..
    d3.json(circlelink, function (data) {
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: function (feature) {
                return {
                    color: "white",
                    fillColor: getColor(feature.properties.mag),
                    fillOpacity: 0.5,
                    weight: 1.5,
                    radius: getRadius(feature.properties.mag),
                    };
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
            }

        }).addTo(layers.circles);
    });





var linelink = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'

var linelink_data =
    d3.json(linelink, function (data) {
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
            style: function (feature) {
                return {
                    color: "orange",
                    fillColor: "orange",
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            }
        }).addTo(layers.lines);
    });




L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);


    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend"),
            magnitudelevel = [0,1,2,3,4,5,6,7,8,9,10]
        labels = [];

        for (var i = 0; i < magnitudelevel.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(magnitudelevel[i] + 1) + '"></i> ' +
                magnitudelevel[i] + (magnitudelevel[i + 1] ? '&ndash;' + magnitudelevel[i + 1] + '<br>' : '+');
        }

        return div;
    };
    // Adding legend to the map
    legend.addTo(map);
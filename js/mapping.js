(function() {
  var mapLink = '<a target="_blank" href="http://portal.cyberjapan.jp/help/termsofuse.html">国土地理院 地理院地図 標準地図</a>';
  var street = L.tileLayer(
      'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
      id: 'street',
      attribution: mapLink,
      });
  var blank = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
      {id: 'blankmap', attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>国土地理院</a>"})
  var baseLayers = {
    "Street": street,
    "blank": blank,
  };
  var destination = L.marker([35.134484437244, 136.867128691108])
    .bindPopup("This is a refuge.");
  var map = L.map('map', {
    layers: [street, destination]
  });
  map.setView([35.134484437244, 136.867128691108], 15);
  var popups = L.layerGroup([destination]);
  var div = d3.select("#map").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  // Overlay
  var mapOverlay = L.d3SvgOverlay(function(sel, proj) {
    var featureElement = sel.selectAll('path').data(features);
    featureElement.enter()
      .append("path")
      .attr({
        "d": proj.pathFromGeojson,
        "stroke": 'gray',
        "stroke-width": 2,
      });
    featureElement.on("mouseover", function(d) {
      var str = "";
      console.log(d.geometry.coordinates);
      Object.keys(d.geometry.coordinates).forEach(function(key) { str += "[" + d.geometry.coordinates[key] + "]</br>" });
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(str)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });
  });
  var overlays = {
    "Show a base map": mapOverlay,
    "Show a refuge": popups,
  };
  d3.json("data/map.geojson",  function(data) { features = data.features; mapOverlay.addTo(map) });
  L.control.layers(baseLayers, overlays).addTo(map);
})();

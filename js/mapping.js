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
  var overlays = {
    "Show a refuge": popups,
  };
  L.control.layers(baseLayers, overlays).addTo(map);
})();

/* global window */
import React, { Component } from 'react';

class MapRoute extends Component {

  constructor () {
    super();
  }
  componentDidMount() {
    window.initMap = this.initMap;
    let coordinates = this.props.coordinates;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBkM7-E2bhops6napFVF8RHBx48umZttJ0&callback=initMap', coordinates)
  }

  initMap() {
    var coordinates = JSON.parse(document.getElementById('scriptId').getAttribute('coordinates')).coordinates;
    var centerIndex = Math.round(coordinates.length / 2);
    var center = coordinates[centerIndex];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: center[0], lng: center[1]},
      mapTypeId: 'terrain'
    });

    var routeCoordinates = coordinates.map(coord => {
      var obj = {};
      obj['lat'] = coord[0];
      obj['lng'] = coord[1];
      return obj;
    });
    
    var flightPath = new google.maps.Polyline({
      path: routeCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  }

  render () {
    return (
      <div id='map'>
      </div>
    );
  }
}

export default MapRoute;

function loadJS(src, coord) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.setAttribute("coordinates", JSON.stringify(coord));
  script.id = 'scriptId'
  ref.parentNode.insertBefore(script, ref);
}

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { default as React, Component } from 'react';

const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 29.946612, lng: -90.070113 }}
    googleMapUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEcsBoANLQ0cs7xmx0UJXpdLRLOiFHGps"
  />
));

export default class Map extends Component {

  render() {
    return (
      <SimpleGoogleMap
        containerElement={
          <div style={{ width: 200, height: 200 }} />
        }
        mapElement={
          <div style={{ width: 200, height: 200 }} />
        }
      />
    );
  }
}


// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     onClick={props.onMapClick}
//   >
//     {props.markers.map(marker => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(marker)}
//       />
//     ))}
//   </GoogleMap>
// ));

// export default class GettingStartedExample extends Component {
//   constructor() {
//     super();
//     this.state = {
//       markers: [{
//         position: {
//           lat: 25.0112183,
//           lng: 121.52067570000001,
//         },
//         key: 'Taiwan',
//         defaultAnimation: 2,
//       }],
//     };

//     this.handleMapLoad = this.handleMapLoad.bind(this);
//     this.handleMapClick = this.handleMapClick.bind(this);
//     this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
//   }

//   handleMapLoad(map) {
//     this._mapComponent = map;
//     if (map) {
//       console.log(map.getZoom());
//     }
//   }

//   /*
//    * This is called when you click on the map.
//    * Go and try click now.
//    */
//   handleMapClick(event) {
//     const nextMarkers = [
//       ...this.state.markers,
//       {
//         position: event.latLng,
//         defaultAnimation: 2,
//         key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
//       },
//     ];
//     this.setState({
//       markers: nextMarkers,
//     });

//     if (nextMarkers.length === 3) {
//       this.props.toast(
//         'Right click on the marker to remove it',
//         'Also check the code!'
//       );
//     }
//   }

//   handleMarkerRightClick(targetMarker) {
//     /*
//      * All you modify is data, and the view is driven by data.
//      * This is so called data-driven-development. (And yes, it's now in
//      * web front end and even with google maps API.)
//      */
//     const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
//     this.setState({
//       markers: nextMarkers,
//     });
//   }

//   render() {
//         <GettingStartedGoogleMap

//           onMapLoad={this.handleMapLoad}
//           onMapClick={this.handleMapClick}
//           markers={this.state.markers}
//           onMarkerRightClick={this.handleMarkerRightClick}
//         />
//       </div>
//     );
//   }
// }

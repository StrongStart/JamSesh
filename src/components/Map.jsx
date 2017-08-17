import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { default as React, Component } from 'react';
// import InfoWindow from './InfoWindow.jsx';

const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    googleMapUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEcsBoANLQ0cs7xmx0UJXpdLRLOiFHGps"
    defaultZoom={10}
    defaultCenter={{ lat: 29.946612, lng: -90.070113 }}
  >
     {props.markers.map((marker, index) => {
       const onClick = () => props.onMarkerClick(marker);
       /* const onCloseClick = () => props.onCloseClick(marker); */
       return (
         <Marker
           key={index}
           position={marker.position}
           title={(index + 1).toString()}
           onClick={onClick}
         >
          {/* {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.content}</strong>
                <br />
                <em>The contents of this InfoWindow are actually ReactElements.</em>
              </div>
            </InfoWindow>
          )} */}
         </Marker>
      );
     })}
  </GoogleMap>
));

function generateInitialMarkers() {
  const positions = [{ lat: 29.976617, lng: -90.070113 }, { lat: 29.946612, lng: -90.370117 }, { lat: 29.996608, lng: -90.070113 }, { lat: 29.946612, lng: -90.470108 }, { lat: 29.846620, lng: -90.070113 }];

  const markers = [];
  for (let i = 0; i < 5; i++) {
    const position = positions[i];
    markers.push({
      position,
      content: 'This is the secret message'.split(' ')[i],
      showInfo: false,
    });
  }
  return markers;
}

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      markers: generateInitialMarkers(),
    });
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (
      <SimpleGoogleMap
        containerElement={
          <div style={{ width: '100%', height: 200 }} />
        }
        mapElement={
          <div style={{ width: '100%', height: 300 }} />
        }
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
      />
    );
  }
}


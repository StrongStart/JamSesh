import { GoogleMap, InfoWindow, Marker, withGoogleMap } from 'react-google-maps';
import { default as React, Component } from 'react';
import firebase from 'firebase';
import geocoder from 'google-geocoder';

const googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEcsBoANLQ0cs7xmx0UJXpdLRLOiFHGps';

const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    googleMapUrl={googleMapUrl}
    defaultZoom={11}
    defaultCenter={{ lat: 29.946612, lng: -90.070113 }}
  >
     {props.markers.map((marker, index) =>
       <Marker
         key={index}
         position={marker.position}
         onClick={() => props.onMarkerClick(marker)}
       >
           {marker.showInfo && (
             <InfoWindow
               onCloseClick={() => props.onCloseClick(marker)}
             >
               <div>
                 <strong>{marker.content[0]}</strong>
                 <br />
                 <em>Instrument: {marker.content[1]}</em>
               </div>
             </InfoWindow>
          )}
       </Marker>
     )}
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }
  getLocations() {
    const temp = [];
    const groupMarkers = [];
    firebase.database().ref('/groups/')
      .on('value', snapshot => {
        const snap = snapshot.val();
        for (const prop in snap) {
          temp.push(snap[prop]);
        }
        temp.forEach(el => {
          for (const prop in el) {
            const instrument = el[prop].instrument;
            const name = el[prop].name;
            const geo = geocoder({
              key: 'AIzaSyAEcsBoANLQ0cs7xmx0UJXpdLRLOiFHGps',
            });
            geo.find(el[prop].loc, (err, res) => {
              if (err) {
                console.error(err);
              } else {
                const position = res[0].location;
                groupMarkers.push({
                  position,
                  showInfo: false,
                  content: [name, instrument],
                });
                this.setState({
                  markers: groupMarkers,
                });
              }
            });
          }
        });
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


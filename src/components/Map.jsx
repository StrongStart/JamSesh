import { GoogleMap, InfoWindow, Marker, withGoogleMap } from 'react-google-maps';
import { default as React, Component } from 'react';
import firebase from 'firebase';
import geocoder from 'google-geocoder';
import { API_KEY } from '../GoogleConfig.js';

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    googleMapUrl={googleMapUrl}
    zoom={props.zoom}
    center={props.center}
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
             {/* 0 is group, 1 is instrument, 2 is location */}
               <div>
                 <strong>{marker.content[0]}</strong>
                 <br />
                 <em>Instrument: {marker.content[1]}</em>
                 <br />
                 <em>Location: {marker.content[2]}</em>
               </div>
             </InfoWindow>
          )}
       </Marker>
     )}
  </GoogleMap>
));

const startCenter = { lat: 29.969516, lng: -90.103866 };

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 11,
      center: startCenter,
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
            const loc = el[prop].loc;
            const geo = geocoder({
              key: API_KEY,
            });
            geo.find(loc, (err, res) => {
              if (err) {
                console.error(err);
              } else {
                const position = res[0].location;
                groupMarkers.push({
                  position,
                  showInfo: false,
                  content: [name, instrument, loc],
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
      center: targetMarker.position,
      zoom: 15,
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
      center: startCenter,
      zoom: 11,
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
          <div className="mapContainer" />
        }
        mapElement={
          <div className="mapMap" />
        }
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
        zoom={this.state.zoom}
        center={this.state.center}
      />
    );
  }
}


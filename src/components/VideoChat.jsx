import React from 'react';
// import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';

// import Navbar from './Navbar.jsx';
// import firebase from 'firebase';
// import firebaseConfig from '../firebaseConfig.js';

export class TokBoxChat extends React.Component {
  constructor(props) {
  super(props);
  console.log(props);
  const me = 'roux';
  const them = 'david';
  const combo = [them, me].sort().join('-');
  // const url = "https://tokbox.com/embed/embed/ot-embed.js?embedId=7f122061-a137-4a5f-8e12-90adc74dd8e4&room=DEFAULT_ROOM&iframe=true";
  this.url = `https://tokbox.com/embed/embed/ot-embed.js?embedId=7f122061-a137-4a5f-8e12-90adc74dd8e4&room=${combo}&iframe=true`;
  console.log(this.url)
  }

  render() {
    return (
      <div>
        <iframe src={this.url} width="400px" height="400px" ></iframe>

      </div>
    );
  }
}
export default TokBoxChat;

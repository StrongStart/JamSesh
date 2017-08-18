import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
import TokBoxChat from './VideoChat.jsx';

export class VideoChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showVideo: false,
      chosen: '',
    };
    this.video = this.video.bind(this);
  }
  componentDidMount() {
    firebase.database().ref('logged/').on('value', (snapshot) => {
      const currentUsers = snapshot.val();
      if (currentUsers != null) {
        this.setState({
          users: currentUsers,
        });
      }
    });
  }
  video(user) {
    // console.log(user);
    this.setState({
      showVideo: true,
      chosen: user,
    });
  }

  render() {
    const loggedIn = [];
    for (var key in this.state.users) {
      loggedIn.push(key);
    }
    const loggedUsers = loggedIn.map(user => {
      return (<div onClick={this.video.bind(null, user)} key={user}><strong>{user}</strong></div>);
    });
    return (
      <div className="chat">
        <div>
          <div className="logged">Who's Logged In? <br/> {loggedUsers}</div>
        </div>
        <div>
          {/* <iframe
            src="https://tokbox.com/embed/embed/ot-embed.js?embedId=7f122061-a137-4a5f-8e12-90adc74dd8e4&room=DEFAULT_ROOM&iframe=true">
          </iframe> */}
        </div>
        <div>
          {this.state.showVideo ?
            <TokBoxChat props={this.state.chosen}>
            </TokBoxChat> :
            null
          }
        </div>
      </div>
    );
  }
}
export default VideoChatContainer;


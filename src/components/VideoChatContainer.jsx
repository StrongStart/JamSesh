import React from 'react';
import firebase from 'firebase';
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
        const loggedIn = [];
        for (var key in currentUsers) {
          loggedIn.push(key);
        }
        this.setState({
          users: loggedIn,
        });
      }
    });
  }
  video(user) {
    this.setState({
      showVideo: true,
      chosen: user,
    });
  }
  render() {
    const loggedUsers = this.state.users.map(user => (
      <div>
        <button
          className="messageStyle"
          onClick={this.video.bind(null, user)} key={user}>
          <h2><strong>{user.toUpperCase()}</strong></h2>
        </button>< br />< br />
      </div>));
    return (
      <div className="chat">
        <div className="col-md-4">
          <h2>Who's Available To Jam Live?</h2>
          <h4>Click A Name To Jam Together!</h4>
          <div>{loggedUsers}</div>
        </div>
        <div>
          <div className="videoChat col-md-8">
            {this.state.showVideo ? <TokBoxChat props={this.state.chosen} /> :
              <h1 className="videoWait">Please Choose A User To Live Jam With</h1>}
          </div>
        </div>
      </div>
    );
  }
}
export default VideoChatContainer;


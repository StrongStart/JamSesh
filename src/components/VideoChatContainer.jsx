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
    console.log(this.state.users);
    const loggedUsers = this.state.users.map(user => {
      return (<div onClick={this.video.bind(null, user)} key={user}><strong>{user}</strong></div>);
    });
    return (
      <div className="chat">
        <div>
          <div className="logged">Who's Logged In? <br/> {loggedUsers}</div>
        </div>
        <div>
          {this.state.showVideo ?
            <TokBoxChat props={this.state.chosen} /> : null
          }
        </div>
      </div>
    );
  }
}
export default VideoChatContainer;


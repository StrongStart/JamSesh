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
    console.log(user);
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
      <div style={chatStyles.chat}>
        <div>
          <div style={chatStyles.logged}>Who's Logged In? <br/> {loggedUsers}</div>
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

const chatStyles = {
  messages: {
    padding: 8,
    backgroundColor: "#F0F8FF",
    fontFamily: "Arial, Helvetica, sans-serif",
    width: "60%",
    height: 300,
    borderRadius: 10,
    overflow: "auto",
    display: "inline-block"

  },
  input: {
    padding: 15,
    borderRadius: 10
  },
  chat: {
    bottomPadding: 30,
    topPadding: 10
  },
  logged: {
    borderWidth: 1,
    borderStyle: "solid",
    verticalAlign: "top",
    padding: 5,
    marginLeft: 10,
    backgroundColor: "LightBlue",
    borderRadius: 10,
    width: "30%",
    display: "inline-block",
    float: "top"
  }
}

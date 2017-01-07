import React from 'react';
import GroupList from './GroupList.jsx';
import Search from './Search.jsx';
import Messenger from './Messenger.jsx';
import firebase from 'firebase';
import ChatRoom from './ChatRoom.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      groups: [],
      sendTo: null,
    };
    this.imgStyle = {
      'max-width': '100%',
      'max-height': '100%',
    };
    this.runSearch = this.runSearch.bind(this);
    this.setSendTo = this.setSendTo.bind(this);
    const that = this;
  }

  setSendTo(sendTo) {
    this.setState({ sendTo: sendTo });
  }
  runSearch(queryObj) {
    this.setState({ query: queryObj });
  }

  render() {
    console.log(firebase.auth().currentUser);
    return (
      <div className="container">
        <h2>JamSesh</h2>
        <div className="col-md-8">
          {firebase.auth().currentUser ?
            <strong>Welcome, {firebase.auth().currentUser.displayName}!</strong> :
            <strong>Welcome! Please log in or sign up!</strong>}
          <GroupList query={this.state.query} sendTo={this.setSendTo} />
        </div>
        <div className="col-md-4 bg-info">
          <h4>Filter by:</h4>
          <Search runSearch={this.runSearch} />
        </div>
        <div className="col-md-8">
          <h4>Message</h4>
          {/* <Messenger firebaseApp={this.props.firebaseApp} sendTo={this.state.sendTo} /> */}
          <ChatRoom />
        </div>
        <div className="col-md-4">
          <img style={this.imgStyle} className="image-responsive" src="http://i67.tinypic.com/2ld9iza.png" />
        </div>
      </div>
    );
  }
}

export default Home;

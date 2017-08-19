import React from 'react';
import GroupList from './GroupList.jsx';
import Search from './Search.jsx';
import Messenger from './Messenger.jsx';
import firebase from 'firebase';
import ChatRoom from './ChatRoom.jsx';
import Map from './Map.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      groups: [],
      sendTo: null,
      showSearch: false,
    };
    this.runSearch = this.runSearch.bind(this);
    this.setSendTo = this.setSendTo.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    const that = this;

    this.search = (
      <Search runSearch={this.runSearch} />
    );
  }

  setSendTo(sendTo) {
    this.setState({ sendTo: sendTo });
  }
  runSearch(queryObj) {
    this.setState({ query: queryObj });
  }

  handleSearchClick() {
    return this.state.showSearch ?
    this.setState({ showSearch: false }) :
    this.setState({ showSearch: true });
  }

  render() {
    return (
      <div className="container">
        <h2>JamSesh</h2>
        <div className="col-md-8">
          {firebase.auth().currentUser ?
            <strong>Welcome, {firebase.auth().currentUser.displayName}!</strong> :
            <strong>Welcome! Please log in or sign up!</strong>}
          <Map />
          <div className="buffer"></div>
          <div className="groupList" >
            <GroupList query={this.state.query} sendTo={this.setSendTo} />
          </div>
        </div>
        <div className="col-md-4 bg-info">
          <button onClick={this.handleSearchClick}>Filtered Search</button>
          {this.state.showSearch ? this.search : ''}
        </div>
        <div className="col-md-8">
          <div className="chatHeader">Jam Chat!</div>
          <div className="row">
            <ChatRoom />
          </div>
        </div>
        <div className="col-md-4">
          <img className="imgStyle image-responsive" src="http://i67.tinypic.com/2ld9iza.png" alt="jam" />
        </div>
      </div>
    );
  }
}

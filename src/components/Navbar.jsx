import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messagesFetched: false,
    };
  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      const user = firebase.auth().currentUser.displayName;
      firebase.database().ref(`/messages/${user}`)
      .on('value', snapshot => {
        const snap = snapshot.val();
        for(const key in snapshot.val()) {
          snap[key].exists = key;
          this.state.messages.push(snap[key])
        }
      });
      this.setState({ messagesFetched: true });
    } else {
      this.setState({ rerender: true });
    }
  }

  render() {
    return (
      <div className="navbar">
        {firebase.auth().currentUser ? (
          <div className="container-fluid">
            <ul className="nav navbar-nav nav-pills col-md-8">
              <li>
                <Link className="navLinks" to="/"><span>Home</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="calendar"><span>Calendar</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="create-group"><span>Create Group</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="video-chat"><span>Live Jam</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="inbox">
                  <span>Inbox </span>
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-right nav-pills col-md-4">
              <li>
                <div className="navLinks">
                  Hello, {
                    firebase.auth().currentUser.displayName[0].toUpperCase() +
                    firebase.auth().currentUser.displayName.slice(1)}!
                </div>
              </li>
              <li>
                <a
                  className="navLinks" href="#" onClick={this.props.logOut}
                >Log Out</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="container">
            <ul className="nav nav-pills">
              <li>
                <Link className="navLinks" to="/"><span>Home</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="calendar"><span>Calendar</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="sign-in"><span>Sign in</span></Link>
              </li>
              <li>
                <Link className="navLinks" to="sign-up"><span>Sign up</span></Link>
              </li>
            </ul>
          </div>
        )}
      </div>
  ); }
}

export default Navbar;

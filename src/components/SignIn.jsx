import React from 'react';
import firebase from 'firebase';
import Validation from 'react-validation';
import { Link, browserHistory } from 'react-router';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <div className="form-error is-visible alert-danger">This field is required!</div>,
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.initChat = this.initChat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginUser = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    let err = false;
    firebase.auth().signInWithEmailAndPassword(loginUser.email, loginUser.password)
      .catch(error => {
        err = true;
        console.warn(error);
      })
      .then(() => {
        if (!err) {
          browserHistory.push('/');

          const name = firebase.auth().currentUser.displayName;
          const user = {
            id: name,
            username: name,
          };

          firebase.database().ref(`logged/${user.id}`).set(user);

          firebase.auth().onAuthStateChanged(function(user) {
    // Once authenticated, instantiate Firechat with the logged in user
            if (user) {
              this.initChat(user);
            }
          });

        }
      });
  }

  initChat(user) {
    // Get a Firebase Database ref
    var chatRef = firebase.database().ref("chat");

    // Create a Firechat instance
    var chat = new FirechatUI(chatRef, document.getElementById('root'));

    // Set the Firechat user
    chat.setUser(user.uid, user.displayName);
  }

  render() {
    return (
      <div className="container">
        <h3>Sign In</h3>
        <Validation.components.Form onSubmit={this.handleSubmit} className="col-md-8">
          <div className="form-group">
            <Validation.components.Input
              type="email"
              className="form-control"
              value=""
              placeholder="Email"
              name="email"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              type="password"
              value=""
              placeholder="Password"
              name="password"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Button className="btn btn-default col-md-2">
            Sign In</Validation.components.Button>
          </div>
        </Validation.components.Form>
        <div className="col-md-6 text-center">
          Need an account? <Link to="sign-up">Sign up!</Link>
        </div>
        <div>
          <img alt="JamSesh" style={this.imgStyle} className="col-md-4 pull-right" src="http://i67.tinypic.com/2ld9iza.png" />
        </div>
      </div>
    );
  }
}

export default SignIn;

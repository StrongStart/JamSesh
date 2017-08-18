import React from 'react';
import firebase from 'firebase';
import Validation from 'react-validation';
import validator from 'validator';
import { Link, browserHistory } from 'react-router';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <div className="form-error is-visible alert-danger">This field is required!</div>,
  },
  email: {
    rule: value => validator.isEmail(value),
    hint: value => <div className="form-error is-visible alert-danger">
      {value} isnt a valid email address!
    </div>,
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const nameAndEmail = {
      username: newUser.username,
      email: newUser.email,
    };

    let err = false;

    // the next 6 lines ensures a username is unique before signup
    this.props.firebaseApp.database().ref(`/users/${newUser.username}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        err = true;
        window.alert('username is already taken');
      }
    })
    .then(() => { // if username is unique this will add user to firebase Authentication
      if (!err) {
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .catch(error => {
          err = true;
          console.warn(error);
        })
        .then(() => { //  if there are no error up to this point, this will add username
          if (!err) { //  and email to database
            this.props.firebaseApp.database().ref(`users/${newUser.username}`).push(nameAndEmail);
          }
        })
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: newUser.username,
          });
        })
        .then(() => {
          if (!err) {
            browserHistory.push('/');
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <Validation.components.Form onSubmit={this.handleSubmit} className="col-md-8">
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Username"
              name="username"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Input
              type="email"
              className="form-control"
              value=""
              placeholder="Email"
              name="email"
              validations={['required', 'email']}
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
            Sign Up</Validation.components.Button>
          </div>
        </Validation.components.Form>
        <div className="col-md-6 text-center">
          Already a member? <Link to="sign-in">Sign in!</Link>
        </div>
        <div>
          <img alt="JamSesh" className="imgStyle col-md-4 pull-right" src="http://i67.tinypic.com/2ld9iza.png" />
        </div>
      </div>
    );
  }
}

export default SignUp;

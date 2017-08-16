import React from 'react';
import Validation from 'react-validation';
import firebase from 'firebase';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMessage = {
      toUser: event.target.toUser.value,
      fromUser: firebase.auth().currentUser.displayName,
      message: event.target.message.value,
      exists: true,
    };
    this.props.firebaseApp.database()
      .ref(`messages/${event.target.toUser.value}`)
      .push(newMessage);
    event.target.toUser.value = '';
    event.target.message.value = 'Message sent!';
  }


  render() {
    if (!firebase.auth().currentUser) {
      return (
        <div className="container col-md-8">
          <strong>Please log in to send messages!</strong>
        </div>
      );
    } else {
      return (
        <div className="container col-md-8">
          <Validation.components.Form onSubmit={this.handleSubmit}>
            <label htmlFor="toUser" className="col-md-2">Send To:</label>
            <div className="form-group col-md-10" id="toUser">
              <Validation.components.Input
                className="form-control"
                value={this.props.sendTo || ''}
                name="toUser"
                validations={['required']}
              />
            </div>
            <label htmlFor="message" className="col-md-2">Message:</label>
            <div className="form-group col-md-10" id="message">
              <Validation.components.Textarea
                className="form-control"
                value=""
                name="message"
                validations={['required']}
              />
            </div>
            <div>
              <Validation.components.Button className="btn btn-default btn-block">
              Send
            </Validation.components.Button>
            </div>
          </Validation.components.Form>
        </div>
      );
    }
  }
}

export default Messenger;

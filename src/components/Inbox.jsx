import React from 'react';
import InboxMessage from './InboxMessage.jsx';
import firebase from 'firebase';
import Messenger from './Messenger.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    console.log(this.props.firebaseApp);
    const user = firebase.auth().currentUser.displayName;
    console.log(user, 'test')
    firebase.database().ref(`/messages/${user}`)
    .on('value', snapshot => {
      const snap = snapshot.val();
      for(const key in snapshot.val()) {
        snap[key].exists = key;
        this.state.messages.push(snap[key])
      }
      this.setState({ fetchedMessages: true });

    });
  }

  // update(message) {
  //   console.log(message, 'message');
  //   console.log(this.state.messages, 'state messages');
  //   this.state.messages.forEach((el, id) => {
  //     if (el.exists === message) {
  //       this.state.messages.splice(id, 1);
  //     }
  //   });
  //   this.forceUpdate();
  // }

  render() {
    console.log('rendering inbox');
    const messages = this.state.messages;
    return (
      <div className="container">
        <h2>Inbox</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td className="col-md-2">Message From:</td>
              <td className="col-md-8">Message:</td>
              <td className="col-md-10">Delete</td>
            </tr>
          </thead>
          <tbody>
              {messages.map(el => <InboxMessage item={el} />)}
          </tbody>
        </table>
        <Messenger className="center-block" firebaseApp={this.props.firebaseApp} />
      </div>
    );
  }
}

export default Inbox;

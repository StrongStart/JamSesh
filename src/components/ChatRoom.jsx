import React, { Component } from 'react';
import firebase from 'firebase';

class ChatRoom extends Component {

  constructor(props, context) {
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
      message: '',
      messages: [],
      users: [],
      allUsers: [],
    };
  }

  componentDidMount() {
    firebase.database().ref('messager/').on('value', (snapshot) => {

      const currentMessages = snapshot.val();

      if (currentMessages != null) {
        this.setState({
          messages: currentMessages,
        });
      }
    });

    firebase.database().ref('users/').on('value', (snapshot) => {

      const allUsers = snapshot.val();

      if (allUsers != null) {
        this.setState({
          allUsers: allUsers,
        });
      }
    });

    firebase.database().ref('logged/').on('value', (snapshot) => {
      const currentUsers = snapshot.val();

      if (currentUsers != null) {
        this.setState({
          users: currentUsers,
        });
      }
    });
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  add(event) {
    if (event.keyCode === 13) {
      this.submitMessage(event);
    }
  }

  submitMessage(event) {
    let curUser = '';

    firebase.auth().currentUser ? curUser = firebase.auth().currentUser.displayName : curUser = 'guest';

    const nextMessage = {
      id: this.state.messages.length,
      user: curUser,
      text: this.state.message,
    };

    firebase.database().ref(`messager/${nextMessage.id}`).set(nextMessage);

    this.state.message = '';
  }

  render() {
    const loggedIn = [];
    for(var key in this.state.users) {
      loggedIn.push(key);
    }

    const loggedUsers = loggedIn.map(user => {
      return (
        <div key={user}><strong>{user}</strong></div>
      );
    });

    const all = [];
    for(var key in this.state.allUsers) {
      all.push(key);
    }
    const allUsers = all.map(user => {
      return (
        <div><strong>{user}</strong></div>
      );
    });

    const currentMessage = this.state.messages.map((message) => {
      return (
        <div className="messageStyle" key={message.id}><strong>{message.user}</strong>: {message.text}</div>
      );
    });
    return (
      <div className="chat">
        <div>
          <div id="messages" className="messages">
            {currentMessage.slice(-80)}
          </div>
          <div className="logged">Who's Logged In? <br /> {loggedUsers}</div>
          <div className="input" id="chat-input">
            <input onChange={this.updateMessage} onKeyDown={this.add.bind(this)} type="text" placeholder="Sexy Placeholder" value={this.state.message}/>
            <button onClick={this.submitMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;

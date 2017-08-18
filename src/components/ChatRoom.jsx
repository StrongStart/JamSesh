import React, { Component } from 'react'
import firebase from 'firebase'

class ChatRoom extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: [],
      users: [],
      allUsers: [],
    }
  }

  componentDidMount() {

    firebase.database().ref('messager/').on('value', (snapshot) => {

      const currentMessages = snapshot.val()

      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        })
      }
    })

    firebase.database().ref('users/').on('value', (snapshot) => {

      const allUsers = snapshot.val()

      if (allUsers != null) {
        this.setState({
          allUsers: allUsers
        })
      }
    })

    firebase.database().ref('logged/').on('value', (snapshot) => {
      const currentUsers = snapshot.val()

      if (currentUsers != null) {
        this.setState({
          users: currentUsers
        })
      }
    })
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  add(event) {
         if(event.keyCode === 13){
           this.submitMessage(event);
         }
  }

  submitMessage(event){
    let curUser = '';

    firebase.auth().currentUser ? curUser = firebase.auth().currentUser.displayName : curUser = 'guest'

    const nextMessage = {
      id: this.state.messages.length,
      user: curUser,
      text: this.state.message
    }

    firebase.database().ref('messager/' + nextMessage.id).set(nextMessage)

    this.state.message = ''
  }

  render () {

    const loggedIn = [];
    for(var key in this.state.users){
      loggedIn.push(key);
    }

    const loggedUsers = loggedIn.map(user => {
      return (
        <div key={user}><strong>{user}</strong></div>
      )
    })

    const all = [];
    for(var key in this.state.allUsers){
      all.push(key);
    }
    const allUsers = all.map(user => {
      return (
        <div><strong>{user}</strong></div>
      )
    })

    const currentMessage = this.state.messages.map((message, i) => {

      const messageStyle = {
        padding: 5,
        borderRadius: 10,
        margin: "auto"
      }

      i % 2 === 0 ? messageStyle.backgroundColor = "MintCream" : messageStyle.backgroundColor = "Gainsboro"

      return (
        <div style={messageStyle} key={message.id}><strong>{message.user}</strong>: {message.text}</div>
      )
    });
    return (
      <div style={chatStyles.chat}>
      <div>
        <div id="messages" style={chatStyles.messages}>
          {currentMessage.slice(-80)}

        </div>
        <div style={chatStyles.logged}>Who's Logged In? <br/> {loggedUsers}</div>
        {/* <div style={chatStyles.logged}>All Users <br/> {allUsers}</div> */}
        <div style={chatStyles.input} id="chat-input">
        <input onChange={this.updateMessage} onKeyDown={this.add.bind(this)} type="text" placeholder="Sexy Placeholder" value={this.state.message}/>
        <button onClick={this.submitMessage}>Send</button>
        </div>
      </div>
    </div>
    )
  }
}

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

export default ChatRoom

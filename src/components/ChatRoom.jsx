import React, { Component } from 'react'
import firebase from 'firebase'

class ChatRoom extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: []
    }
  }

  componentDidMount() {
    console.log('confirmerooni')
    firebase.database().ref('messager/').on('value', (snapshot) => {

      const currentMessages = snapshot.val()

      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        })
      }
    })
  }

  updateMessage(event) {
    // console.log(`updateMessage: ${event.target.value}`)
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    console.log(`submitMessage: ${this.state.message}`)
    let curUser = ''

    firebase.auth().currentUser ? curUser = firebase.auth().currentUser.displayName : curUser = 'anonymous'

    const nextMessage = {
      id: this.state.messages.length,
      user: curUser,
      text: this.state.message
    }

    firebase.database().ref('messager/' + nextMessage.id).set(nextMessage)

    // let list = Object.assign([], this.state.messages)
    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })
  }

  render () {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.user}: {message.text}</li>
      )
    });
    return (
      <div>
        <ul>
          {currentMessage}
        </ul>
        <input onChange={this.updateMessage} type="text" placeholder="Message" />
        <br />
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>
    )
  }
}

export default ChatRoom

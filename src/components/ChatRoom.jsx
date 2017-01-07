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

  add(event) {
         if(event.keyCode === 13){
           this.submitMessage(event);
         }
  }

  submitMessage(event){
    console.log(`submitMessage: ${this.state.message}`)
    let curUser = '';

    firebase.auth().currentUser ? curUser = firebase.auth().currentUser.displayName : curUser = 'anonymous'

    const nextMessage = {
      id: this.state.messages.length,
      user: curUser,
      text: this.state.message
    }

    firebase.database().ref('messager/' + nextMessage.id).set(nextMessage)

    this.state.message = ''
    // let list = Object.assign([], this.state.messages)
    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })
  }

  render () {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <div key={message.id}><strong>{message.user}</strong>: {message.text}</div>
      )
    });
    return (
      <div>
        <div>
          {currentMessage.slice(-10)}
        </div>
        <input onChange={this.updateMessage} onKeyDown={this.add.bind(this)} type="text" placeholder="Sexy Placeholder" value={this.state.message}/>
        <button onClick={this.submitMessage}>Send</button>
      </div>
    )
  }
}

export default ChatRoom

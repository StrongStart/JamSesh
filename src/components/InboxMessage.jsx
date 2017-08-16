import React from 'react';
import firebase from 'firebase';
import { browserHistory } from 'react-router';

class InboxMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.state = {
      key: props,
    };
  }

  handleDeleteClick() {
    const user = firebase.auth().currentUser.displayName;
    firebase.database().ref(`/messages/${user}/${this.state.key.item.exists}`).remove();
    browserHistory.push('redirect');
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.fromUser}</td>
        <td>{this.props.item.message}</td>
        <td onClick={this.handleDeleteClick}><img src="https://www.comparethehighstreet.com/skins/default/styleImages/remove-location.png" /></td>
      </tr>
    );
  }
}

export default InboxMessage;

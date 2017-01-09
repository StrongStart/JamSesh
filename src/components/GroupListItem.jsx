import React from 'react';
// import { browserHistory } from 'react-router';
import PrivateChat from './PrivateChat.jsx';

class GroupListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.state = {
      showDetails: false,
    };
    this.details = (<span><p><strong>Location:</strong> {props.item.loc}</p>
      <p><strong>Availability:</strong> {props.item.avail}</p>
      <p><strong>Details:</strong> {props.item.details}</p></span>);
  }
  getInitialState() {
    return { showResults: false };
  }

  onClick() {
    return this.state.showResults ?
    this.setState({ showResults: false }) :
    this.setState({ showResults: true });
  }

  handleDetailsClick() {
    return this.state.showDetails ?
    this.setState({ showDetails: false }) :
    this.setState({ showDetails: true });
  }

  handleMessageClick() {
    console.warn('handleMessageClick works', this.props.item.owner);
    this.props.sendTo(this.props.item.owner);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.instrument}</td>
        <td>{this.props.item.genre}</td>
        <td onClick={this.handleDetailsClick}>
          <div><strong>{this.props.item.name}</strong></div>
          {this.state.showDetails ? this.details : 'Click for More Details'}
        </td>
        <td onClick={this.onClick}>
          <br />
          <img alt="Message" src="http://www.rcuniverse.com/images/email-icon.jpg" />
        </td>
        <tr>
          <div style={styles.popChat}>
            { this.state.showResults ? <PrivateChat /> : null }
          </div>
        </tr>
      </tr>
    );
  }
}
const styles = {
  popChat: {
    position: 'fixed',
    bottom: '0%',
    marginLeft: 100,
    zIndex: 5,
  },
};

export default GroupListItem;

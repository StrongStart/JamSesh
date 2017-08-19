import React from 'react';
import firebase from 'firebase';

export class TokBoxChat extends React.Component {
  constructor(props) {
    super(props);
    const me = firebase.auth().currentUser.displayName.toString();
    const them = props.props;
    const combo = [me, them].sort().join('-');
    this.url = `https://tokbox.com/embed/embed/ot-embed.js?embedId=7f122061-a137-4a5f-8e12-90adc74dd8e4&room=${combo}&iframe=true`;
  }
  render() {
    return (
      <div className="iframe">
        <iframe className="iframe" src={this.url}></iframe>
      </div>);
  }
}
export default TokBoxChat;


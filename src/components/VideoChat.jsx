import React from 'react';
import firebase from 'firebase';

export class TokBoxChat extends React.Component {
  constructor(props) {
    super(props);
    const me = firebase.auth().currentUser.displayName.toString();
    const them = props.props;
    const combo = [me, them].sort().join('-');
    this.url = `https://tokbox.com/embed/embed/ot-embed.js?embedId=7f122061-a137-4a5f-8e12-90adc74dd8e4&room=${combo}&iframe=true`;
    console.log(this.url);
  }
  render() {
    return (
      <div>
        <div className="vchatContainer">
          <div>
            <h2>Now chatting with {this.props.props.toUpperCase()[0] + this.props.props.slice(1)}</h2>
          </div>
        </div>
        <div className="iframe">
          <iframe className="iframe" src={this.url}></iframe>
        </div>
      </div>
      );
  }
}


export default TokBoxChat;


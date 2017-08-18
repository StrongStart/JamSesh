import React, { Component } from 'react';

export default class Calendar extends Component {
  render() {
    return (
      <div className="container">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=lfhaqtrds93ei95e6g7qrbf0no%40group.calendar.google.com&ctz=America/Chicago"
          style={{ border: '0px', width: '800px', height: '600px', frameBorder: '0px', scrolling: 'no' }}
        >
        </iframe>
      </div>
    );
  }
}

import React from 'react';
import firebase from 'firebase';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Geosuggest from 'react-geosuggest';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <div className="form-error is-visible alert-danger">This field is required!</div>,
  },
});

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser.displayName,
      startDate: moment(),
      location: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSuggestSelection = this.onSuggestSelection.bind(this);
  }

  componentDidMount() {
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  onSuggestSelection(suggest) {
    console.log(suggest);
    this.setState({
      location: suggest,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGroup = {
      id: groups.length,
      owner: this.state.user,
      instrument: event.target.instrument.value,
      name: event.target.name.value,
      genre: event.target.genre.value,
      loc: this.state.location,
      avail: event.target.avail.value,
      details: event.target.details.value,
    };
    this.props.firebaseApp.database().ref(`groups/${event.target.name.value}`).push(newGroup);
    groups.push(newGroup);
    browserHistory.push('/');
  }
  render() {
    return (
      <div className="container">
        <h3>Create Group</h3>
        <Validation.components.Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Instrument needed"
              name="instrument"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Group Name"
              name="name"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Genre"
              name="genre"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Textarea
              className="form-control"
              value=""
              placeholder="Details"
              name="details"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              withPortal
              showMonthDropdown
              name="avail"
              value={this.state.startDate}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <Geosuggest
              className="form-control"
              placeholder="Location"
              types={['establishment', 'geocode']}
              onChange={this.onSuggestSelection}
              onEnter={this.onSuggestSelection}
            />
          </div>
          <div>
            <Validation.components.Button className="btn btn-default btn-block">
            Submit</Validation.components.Button>
          </div>
        </Validation.components.Form>
      </div>
    );
  }
}

const groups = [];

export default CreateGroup;

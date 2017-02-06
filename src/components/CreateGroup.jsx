import React from 'react';
import firebase from 'firebase';
import Validation from 'react-validation';
// import Navbar from './Navbar.jsx';
// import validator from 'validator';
import { browserHistory } from 'react-router';
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGroup = {
      id: groups.length,
      owner: this.state.user,
      instrument: event.target.instrument.value,
      name: event.target.name.value,
      genre: event.target.genre.value,
      loc: event.target.loc.value,
      avail: event.target.avail.value,
      details: event.target.details.value,
    };
    this.props.firebaseApp.database().ref(`groups/${event.target.name.value}`).push(newGroup);
    groups.push(newGroup);
    console.log(this.state.groups, 'is this going away or even here')
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
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Location"
              name="loc"
              validations={['required']}
            />
          </div>
          <div className="form-group">
            <Validation.components.Input
              className="form-control"
              value=""
              placeholder="Availability"
              name="avail"
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

import React from 'react';
import GroupListItem from './GroupListItem.jsx';
import firebase from 'firebase';

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupsFetched: false,
    };

    this.filterGroups = this.filterGroups.bind(this);

  }

  componentDidMount() {
    const temp = [];
    firebase.database().ref('/groups/')
    .on('value', snapshot => {
      const snap = snapshot.val();
      for (const prop in snap) {
        temp.push(snap[prop]);
      }
      temp.forEach(el => {
        for (const prop in el) {
          this.state.groups.push(el[prop]);
        }
        this.setState({ groupsFetched: true });
      });
    });
  }

  filterGroups() {
    if (!this.props.query) {
      return this.state.groups;
    } else {
      let filteredGroups = this.state.groups;
      if (this.props.query.instrument) {
        filteredGroups = filteredGroups.filter(item =>
          item.instrument.toLowerCase().indexOf(this.props.query.instrument.toLowerCase()) > -1);
      }
      if (this.props.query.name) {
        filteredGroups = filteredGroups.filter(item =>
          item.name.toLowerCase().indexOf(this.props.query.name.toLowerCase()) > -1);
      }
      if (this.props.query.loc) {
        filteredGroups = filteredGroups.filter(item =>
          item.loc.toLowerCase().indexOf(this.props.query.loc.toLowerCase()) > -1);
      }
      if (this.props.query.genre) {
        filteredGroups = filteredGroups.filter(item =>
          item.genre.toLowerCase().indexOf(this.props.query.genre.toLowerCase()) > -1);
      }
      return filteredGroups;
    }
  }

  render() {
    const groups = this.filterGroups();
    return this.state.groupsFetched ?
    (<table className="table table-striped">
      <thead>
        <tr>
          <td className="col-md-1">Inst.</td>
          <td className="col-md-1">Genre</td>
          <td className="col-md-4">Details</td>
          <td className="col-md-1">Created By</td>
        </tr>
      </thead>
      <tbody>
      {groups.length ?
        groups.map(el => <GroupListItem key={el.name} item={el} sendTo={this.props.sendTo} />) :
        <tr>No groups to display! <br />Try widening your search.</tr>}
      </tbody>
    </table>)
    :
    (<div>
      Fetching groups, please wait...
    </div>);
  }
}

export default GroupList;

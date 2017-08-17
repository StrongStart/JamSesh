import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainContainer from './MainContainer.jsx';
import Home from './Home.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import CreateGroup from './CreateGroup.jsx';
import Inbox from './Inbox.jsx';
import Redirect from './Redirect.jsx';
import Calendar from './Calendar.jsx';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainContainer}>
      <IndexRoute component={Home} />
      <Route path="calendar" component={Calendar} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />
      <Route path="create-group" component={CreateGroup} />
      <Route path="inbox" component={Inbox} />
      <Route path="redirect" component={Redirect} />
    </Route>
  </Router>
);

export default App;

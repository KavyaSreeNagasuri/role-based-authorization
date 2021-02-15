import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/login';
import HomePage from './components/home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default withRouter(App);

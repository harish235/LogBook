import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/Register';
import Create from './components/Create';
import ShowUsers from './components/ShowUsers';
import ShowBook from './components/ShowBook';
import AdminLogin from './components/Admin';
import AdminHome from './components/AdminHome';


class App extends Component {

  render() {
    return (
      <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/showusers" component={ShowUsers} />
              <Route exact path="/showbooks" component={ShowBook} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route exact path="/adminhome" component={AdminHome} />
            </div>
          </div>
        </Router>
        
    );
  }
}

export default App;

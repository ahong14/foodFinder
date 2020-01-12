import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarFood from './components/NavbarFood/NavbarFood';
import SearchFood from './components/SearchFood/SearchFood';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import SavedCollection from './components/SavedCollection/SavedCollection';

class App extends Component {
  render(){
    return (
      <div>
        <Route path='/' component={ NavbarFood}/>
        <Switch>
          <Route exact path="/" component={ SearchFood }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/signup" component={ Signup }/>
          <Route exact path="/viewCollection" component={ SavedCollection }/>
        </Switch>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarFood from './components/NavbarFood/NavbarFood';
import SearchFood from './components/SearchFood/SearchFood';

class App extends Component {
  render(){
    return (
      <div>
        <Route path='/' component={ NavbarFood}/>
        <Switch>
          <Route exact path="/" component={ SearchFood }/>
        </Switch>
      </div>
    );
  }
}

export default App;
import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'
import View from './components/View'
import Edit from './components/Edit'
import './App.css'

function App() {
  return (
    <Router>
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="add">Add</Link>
      <Route exact path="/" component={Home}/>
      <Route path="/add" component={Add}/>
      <Route path="/view/:id" component={View}/>
      <Route path="/edit/:id" component={Edit}/>
    </div>
    </Router>
  );
}

export default App;

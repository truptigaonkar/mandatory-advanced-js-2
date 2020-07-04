import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'
import './App.css'

function App() {
  return (
    <Router>
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="add">Add</Link>
      <Route exact path="/" component={Home}/>
      <Route path="/add" component={Add}/>
    </div>
    </Router>
  );
}

export default App;

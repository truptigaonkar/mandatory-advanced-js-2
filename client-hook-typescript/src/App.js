import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css'
import Home from './components/Home';

function App() {
  return (
    <Router>
    <div className="App">
      <Link to="/">Home</Link>
      <Route exact path="/" component={Home}/>
    </div>
    </Router>
  );
}

export default App;

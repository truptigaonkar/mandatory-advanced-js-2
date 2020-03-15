import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar className="navbarBack" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'purple', color: 'white' }} dark expand="md">
            <NavbarBrand href="/"><h1>popcorn-flix</h1>
            <Nav className="ml-auto" navbar style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'purple', color: 'white' }}>
              <NavItem>
                <NavLink className="nav"><Link to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/Add">Add</Link></NavLink>
              </NavItem>
            </Nav>
            </NavbarBrand>
     
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route path="/details/:id" component={Details} />
          <Route path="/Add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
        </Router>
      </div>
    );
  }
}

export default App;

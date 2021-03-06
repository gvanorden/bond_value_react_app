import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import Home from './index';
import Instruction from './instructions';
import Valuation from './valuations';
import BondExample from './bond_example';
import logo from '../images/logo.png';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand> <img
                        src={logo}
                        width="30"
                        height="30"
                        alt="SAVINGS BOND WIZARD"
                    /></Navbar.Brand>
                    <Navbar.Brand>SAVINGS BOND WIZARD</Navbar.Brand>
                    <Nav.Link href="/instructions" style={{ fontSize: '14px', fontWeight: '500' }}>INSTRUCTIONS</Nav.Link>
                    <Nav.Link href="/bond_example" style={{ fontSize: '14px', fontWeight: '500' }}>BOND EXAMPLE</Nav.Link>
                    <Nav.Link href="/valuations" style={{ fontSize: '14px', fontWeight: '500' }}>VALUATION</Nav.Link>
                </Navbar>
                <Switch>
                    <Route exact path='/' component={Instruction} />
                    <Route exact path='/instructions' component={Instruction} />
                    <Route exact path='/bond_example' component={BondExample} />
                    <Route exact path='/valuations' component={Valuation} />
                </Switch>
            </BrowserRouter>)

    }
}

export default Navigation;
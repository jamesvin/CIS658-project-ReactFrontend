import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
//import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import styled from 'styled-components';
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';

import React, {Component} from 'react';

import Sidebar from 'react-bootstrap-sidebar';

export default class SideBar extends Component {


        render() {
            return (
                  <div>
                      <Button bsStyle="primary" onClick={ () => this.updateModal(true) }>menu-hamburger</Button>
                      <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
                        <Nav>
                          <NavItem href="#">Link 1</NavItem>
                          <NavItem href="#">Link 2</NavItem>
                          <NavItem href="#">Link 3</NavItem>
                          <NavItem href="#">Link 4</NavItem>
                        </Nav>
                      </Sidebar>
                  </div>
                );
}
}

import React, { Component } from 'react';
import './NavbarFood.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavbarFood extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Navbar bg='light' fixed='top'>
                <Navbar.Brand>
                    Food Finder
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    Sign In
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarFood;
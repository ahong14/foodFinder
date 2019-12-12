import React, { Component } from 'react';
import './NavbarFood.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

class NavbarFood extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Navbar bg='light' fixed='top'>
                <Navbar.Brand>
                    <Link to="/">
                        Food Finder
                    </Link>
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link>
                            <Link to="/signup"> 
                                Sign Up
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link to="/login"> 
                                Sign In
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarFood;
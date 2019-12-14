import React, { Component } from 'react';
import './NavbarFood.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

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
                {this.props.login === false ? 
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
                    :
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Welcome, <strong> {this.props.email} </strong>
                        </Navbar.Text>
                        
                        <Nav.Link onClick={this.props.updateLogout}>
                            Logout
                        </Nav.Link>
                    </Navbar.Collapse>
                }
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return{
        login: state.loginReducer.login,
        email: state.loginReducer.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLogout: () => {
            dispatch({
                type: actions.LOGOUT_SUCCESS
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarFood);
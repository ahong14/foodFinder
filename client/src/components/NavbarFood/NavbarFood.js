import React, { Component } from 'react';
import './NavbarFood.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class NavbarFood extends Component{
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.updateLogout();
        this.props.history.push('/login')
    }

    //render navbar based on login property
    render(){
        return(
            this.props.login === false ?
                <Navbar expand bg='light' fixed='top'>
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

            :

                <Navbar expand bg='light' fixed='top'>
                    <Navbar.Brand>
                        <Link to="/">
                            Food Finder
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Welcome, <strong> {this.props.email} </strong>
                        </Navbar.Text>

                        <Nav.Link>
                            <Link to="/viewCollection">
                                View Saved Collection
                            </Link>
                        </Nav.Link>
                        
                        <Nav.Link onClick={this.handleLogout}>
                            Logout
                        </Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
        )
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
            });
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarFood));
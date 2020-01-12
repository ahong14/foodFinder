import React, { Component } from 'react';
import './Login.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import Cookies from 'js-cookie';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    //function to submit login information
    loginUser = () => {
        if(this.state.email && this.state.password){
            axios.post('/api/auth/login', {
                params: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(res => {
                if(res.data.success === true){
                    let token = res.data.token;
                    Cookies.set('authToken', token);
                    alert(res.data.message);
                    this.props.updateLogin(this.state.email, res.data.items);
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
        }

        else{
            alert("Please enter email/password");
        }
    }

    //function to handle on key press, check for enter key
    submitOnEnter = (event) => {
        if(event.key === 'Enter'){
            this.loginUser();
        }
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="loginContainer">
                                <h5> Sign In </h5>
                                <Form onKeyPress={this.submitOnEnter}>
                                    <Form.Group>
                                        <Form.Label> Email </Form.Label>
                                        <Form.Control onChange = {(event) => this.setState({email: event.target.value})} type="email"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control onChange = {(event) => this.setState({password: event.target.value})} type="password"/>
                                    </Form.Group>

                                    <Button onClick={this.loginUser}> Login </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
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
        updateLogin: (email, items) => {
            dispatch({
                type: actions.LOGIN_SUCCESS,
                email: email,
                items: items
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
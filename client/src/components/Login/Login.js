import React, { Component } from 'react';
import './Login.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    loginUser = () => {
        if(this.state.email && this.state.password){
            axios.post('/api/auth/login', {
                params: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(res => {
                console.log(res);
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.message);
            })
        }

        else{
            alert("Please enter email/password");
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
                                <Form>
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

export default Login;
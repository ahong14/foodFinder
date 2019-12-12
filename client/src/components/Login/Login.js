import React, { Component } from 'react';
import './Login.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Login extends Component{
    constructor(props){
        super(props);
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
                                        <Form.Control type="email"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control type="password"/>
                                    </Form.Group>

                                    <Button> Login </Button>
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
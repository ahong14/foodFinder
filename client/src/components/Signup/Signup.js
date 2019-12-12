import React, { Component } from 'react';
import './Signup.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Signup extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="signupContainer">
                                <h5> Sign Up </h5>
                                <Form>
                                    <Form.Group>
                                        <Form.Label> Email </Form.Label>
                                        <Form.Control type="email"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control type="password"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Confirm Password </Form.Label>
                                        <Form.Control type="password"/>
                                    </Form.Group>

                                    <Button> Sign Up </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Signup;
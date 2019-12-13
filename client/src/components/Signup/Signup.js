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
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        }
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
                                        <Form.Control onChange={(event) => this.setState({email: event.target.value})} type="email"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control onChange={(event) => this.setState({password: event.target.value})} type="password"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Confirm Password </Form.Label>
                                        <Form.Control onChange={(event) => this.setState({confirmPassword: event.target.value})} type="password"/>
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
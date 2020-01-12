import React, { Component } from 'react';
import './Signup.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import validator from 'validator';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    signupUser = () => {
        if(validator.isEmail(this.state.email) === true && validator.isLength(this.state.password, {min: 7, max: 20}) === true){
            axios.post('/api/auth/signup', {
                params:{
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert(err.response.data.message);
            })
        }

        else if(validator.isEmail(this.state.email) === false){
            alert("Please insert valid email");
        }

        else if(this.state.password !== this.state.confirmPassword){
            alert("Password comparisons do not match");
        }

        else if(validator.isLength(this.state.password, {min: 7, max: 20}) === false){
            alert("Password length invalid")
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

                                    <Button onClick={this.signupUser}> Sign Up </Button>
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
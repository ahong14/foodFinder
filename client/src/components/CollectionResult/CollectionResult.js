import React, { Component } from 'react';
import './CollectionResult.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class CollectionResult extends Component{
    constructor(props){
        super(props);
    }

    //remove item from user's collection
    removeItem = () => {
        axios.delete('/api/items/remove', {
            params:{
                currentUser: this.props.email,
                removeItemName: this.props.businessName
            }
        })
        .then(res => {
            //update collection of removed item
            this.props.updateSavedItems(res.data.items);
        })
        .catch(err => {
            alert(err);
        })
    }
    
    render(){
        return(
            <Card>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title> {this.props.businessName} </Card.Title>
                    <Card.Text> <span className="font-weight-bold"> Phone: </span>{this.props.phone} </Card.Text>
                    <Card.Text> <span className="font-weight-bold"> Address: </span> {this.props.address} </Card.Text> 
                    <Card.Text>
                        <span className="font-weight-bold"> Price: </span> {this.props.price}
                    </Card.Text>
                    <Card.Text>
                        <span className="font-weight-bold"> Yelp Rating: </span> 
                        <img src={this.props.imgStarSrc} alt="Yelp Rating"/> 
                    </Card.Text>
                    <Card.Text>
                        <a href={this.props.yelpURL} target="_blank"> Yelp Link </a>
                    </Card.Text>
                    <Button variant="danger" onClick={this.removeItem}> Remove </Button>
                </Card.Body>
                </Card>
        );
    }
}

CollectionResult.defaultProps = {
    businessName: "Not Listed",
    phone: "Not Listed",
    address: "Not Listed",
    price: "$",
    rating: "1",
    yelpURL: "Not Listed"
}

CollectionResult.propTypes = {
    businessName: PropTypes.string.isRequired,
    phone: PropTypes.string,
    address: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.string,
    yelpURL: PropTypes.string
}

const mapStateToProps = state => {
    return{
        email: state.loginReducer.email,
        login: state.loginReducer.login
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateSavedItems: (savedItems) => {
            dispatch({
                type: actions.UPDATE_SAVED_ITEMS,
                items: savedItems
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionResult);
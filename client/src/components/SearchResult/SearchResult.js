import React, { Component } from 'react';
import './SearchResult.scss';
import Card from 'react-bootstrap/Card';

class SearchResult extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title> {this.props.businessName} </Card.Title>
                    <Card.Text>
                        <a href={this.props.yelpURL} target="_blank"> Yelp Link </a>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default SearchResult;
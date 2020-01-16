import React, { Component } from 'react';
import './SearchResult.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import Tooltip from '../Tooltip/Tooltip';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgStarSrc: ""
        }
    }

    //onclick function called when user saves to collection
    //make api request, update user collection in database
    saveItem = () => {
        axios.post('/api/items/add', {
            params: {
                currentUser: this.props.email,
                addItem: {
                    businessName: this.props.businessName,
                    image: this.props.image,
                    phone: this.props.phone,
                    address: this.props.address,
                    price: this.props.price,
                    imgStarSrc: this.state.imgStarSrc,
                    yelpURL: this.props.yelpURL
                }
            }
        })
        .then(res => {
            axios.get('/api/items', {
                params:{
                    currentUser: this.props.email
                }
            })
            .then(res => {
                //update added item to redux store
                this.props.updateSavedItems(res.data.items);
                alert("Saved item");
            })
            .catch(err => {
                alert(err);
            })
        })
        .catch(err => {
            alert(err);
        })
    }

    //when component load, dynamically create image source to render based on rating
    componentDidMount(){
        if(this.props.rating){
            //img source example: small_4.png or small_4_half.png
            let imgSrcBeginning = "yelp_stars/small_";
            let imgSrcHalf = "_half";
            let imgSrcEnd = ".png";
            let imgSrc = "";
            let rating = String(this.props.rating);

            //determine if rating is whole number or half rating (4 or 4.5)
            //img src in form small_4_half.png
            if(rating.includes(".") === true){
                let splitDecimal = rating.split(".");
                imgSrc += imgSrcBeginning + splitDecimal[0] + imgSrcHalf + imgSrcEnd;
            }

            //img src in form small_4.png
            else{
                imgSrc += imgSrcBeginning + rating + imgSrcEnd;
            }

            this.setState({
                imgStarSrc: imgSrc
            });
        }
    }

    render(){
        return(
            <div className="searchResultContainer">
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
                            {this.props.rating ? <img src={this.state.imgStarSrc} alt="Yelp Rating"/> : <span> None</span>}
                        </Card.Text>
                        <Card.Text>
                            <a href={this.props.yelpURL} target="_blank"> Yelp Link </a>
                        </Card.Text>
                        {
                            this.props.login === true ? <Button onClick={this.saveItem} variant="success"> Save to Collection </Button>
                            :
                            <Tooltip 
                                placement="top" 
                                trigger="hover" 
                                tooltip="Please login to save."
                                delayHide={100}
                            >
                                <Button disabled> 
                                    Save to Collection 
                                </Button>
                            </Tooltip>
                        }
                    </Card.Body>
                    
                </Card>
            </div>
        );
    }
}

//default props
SearchResult.defaultProps = {
    businessName: "Not Listed",
    phone: "Not Listed",
    address: "Not Listed",
    price: "$",
    rating: "1",
    yelpURL: "Not Listed"
}

//prop types check
SearchResult.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
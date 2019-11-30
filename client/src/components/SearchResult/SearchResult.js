import React, { Component } from 'react';
import './SearchResult.scss';
import Card from 'react-bootstrap/Card';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgStarSrc: ""
        }
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
            <Card>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title> {this.props.businessName} </Card.Title>
                    {this.props.phone ? <Card.Text> <span className="font-weight-bold"> Phone: </span>{this.props.phone}</Card.Text> : <span></span>}
                    {this.props.address ? <Card.Text> <span className="font-weight-bold"> Address: </span> {this.props.address}</Card.Text> : <span></span>}
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
                </Card.Body>
            </Card>
        );
    }
}

export default SearchResult;
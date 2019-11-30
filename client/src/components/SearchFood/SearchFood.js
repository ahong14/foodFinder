import React, { Component } from 'react';
import './SearchFood.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import cities from 'cities.json';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import SearchResult from '../SearchResult/SearchResult';

class SearchFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            locationQuery: "",
            searchPlaceholder: "Search food, restaurants, businesses, etc.",
            locationPlaceHolder: "Enter Location",
            searchLimit: 12,
            citiesSuggestionsUs: [],
            searchResults: []
        }
    }

    //function to handle input change on searchbar
    handleSearchChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
    }

    //function to handle input change on location search
    handleLocationChange = (event) => {
        this.setState({
            locationQuery: event
        })
    }

    //function to handle when user clicks suggestion
    //set location query to selected suggestion
    selectedChange = (event) => {
        event.length === 1 ? this.setState({locationQuery: event[0].name}) : this.setState({locationQuery: ''});
    }

    //make request to api based on search queries
    sendQuery = () => {
        if(this.state.searchQuery !== ''){
            axios.get("/api/search",{
                params: {
                    term: this.state.searchQuery,
                    location: this.state.locationQuery,
                    limit: this.state.searchLimit
                }
            })
            .then(res => {
                if(res.data.success === true){
                    let searchData = res.data.body;
                    searchData = JSON.parse(res.data.body);
                    //determine if results returned from api
                    if(searchData.businesses !== undefined){
                        this.setState({
                            searchResults: searchData.businesses
                        });
                    }

                    else{
                        this.setState({
                            searchResults: []
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
        }

        else{
            alert("Please input search");
        }
    }

    //function to make search when enter key is pressed
    //reference: https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs
    searchEnter = (event) => {
        if(event.key === "Enter"){
            this.sendQuery();
        }
    }


    //filter us cities from json file
    componentDidMount(){
        let usCities= cities.filter( city => {
            return city.country === "US";
        });

        this.setState({
            citiesSuggestionsUs: usCities
        });
    }

    render(){
        const results = this.state.searchResults.map( result => {
            return(
                <Col sm="4">
                    <SearchResult 
                        key={result.id} 
                        businessName={result.name} 
                        phone={result.display_phone} 
                        image={result.image_url} 
                        yelpURL={result.url}
                        address={result.location.display_address[0] + ' '  + result.location.display_address[1]}
                        price={result.price}
                        rating={result.rating}
                    />
                </Col>
            );
        })
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Jumbotron md="12"> 
                                <div className="jumbotronContainer">
                                    <h1>
                                        Food Finder
                                    </h1>
                                    <p> Search for your favorite restaurants and businesses. </p>
                                </div>
                            </Jumbotron>
                        </Col>               
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Control onChange={this.handleSearchChange} onKeyPress={this.searchEnter} size="lg" type="text" placeholder={this.state.searchPlaceholder}/>
                        </Col>

                        <Col md="4">
                            <AsyncTypeahead 
                                labelKey={option => option.name}
                                options={this.state.citiesSuggestionsUs}
                                placeholder={this.state.locationPlaceHolder}
                                bsSize="lg"
                                maxResults={10}
                                isLoading={false}
                                onSearch={this.handleLocationChange}
                                onChange={this.selectedChange}
                                onKeyDown={this.searchEnter}
                            />
                        </Col>

                        <Col md="2">
                            <div className="searchIconContainer" onClick={this.sendQuery}>
                                <FaSearch className="searchIcon"/>
                            </div>
                        </Col>
                    </Row>

                    <div className="searchResultsContainer">
                        <Row>
                            { results }
                        </Row>  
                    </div>

                </Container>
            </div>
        );
    }
}

export default SearchFood;
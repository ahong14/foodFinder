import React, { Component } from 'react';
import './SearchFood.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
// import Pagination from 'react-bootstrap/Pagination';
import { FaSearch } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';
import axios from 'axios';
import cities from 'cities.json';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import SearchResult from '../SearchResult/SearchResult';
import Pagination from 'react-js-pagination';

class SearchFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            locationQuery: "",
            searchPlaceholder: "Search restaurants, businesses, etc.",
            locationPlaceHolder: "Enter Location",
            searchLimit: 48,
            resultsPerPage: 12,
            citiesSuggestionsUs: [],
            searchResults: [],
            searchLocationDisabled: false,
            currentLocationEnabled: false,
            currentLocation: {
                latitude: 0,
                longitude: 0
            },
            spinnerVisible: 'hidden',
            paginationItems: [],
            searchResultsPaginated:[],
            activePage: 1
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

    //function to get latitude, longitude of current location
    getCurrentLocation = () => {
        //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        let location = {...this.state.currentLocation};
        navigator.geolocation.getCurrentPosition( (pos) => {
            location.latitude = pos.coords.latitude;
            location.longitude = pos.coords.longitude;
            this.setState({
                currentLocation: location
            })
        })
    }

    //toggle between enabling current location, disabling location search, etc. 
    handleCurrentLocation = (event) => {
        this.setState({
            currentLocationEnabled: !this.state.currentLocationEnabled,
            searchLocationDisabled: !this.state.searchLocationDisabled
        });

        if(event.target.value === "on"){
            this.getCurrentLocation();
        }
    }

    //function to handle different pagination selection
    handlePaginationChange = (page) => {
        let maxPaginationIndex = Number(page) * this.state.resultsPerPage;
        let startingPaginationIndex = maxPaginationIndex - this.state.resultsPerPage;
        let paginatedValues = this.state.searchResults.slice(startingPaginationIndex, maxPaginationIndex);
        this.setState({
            activePage: page,
            searchResultsPaginated: paginatedValues
        })
    }

    //make request to api based on search queries
    sendQuery = () => {
        if(this.state.searchQuery !== ""){
            this.setState({
                spinnerVisible: "visible"
            });
            //construct search params based on whether current location enabled on/off
            let searchParams = {};
            //if current location, use latitude, longitude
            if(this.state.currentLocationEnabled){
                searchParams.term = this.state.searchQuery;
                searchParams.limit = this.state.searchLimit;
                searchParams.latitude = this.state.currentLocation.latitude;
                searchParams.longitude = this.state.currentLocation.longitude;
            }
            //else use location search query
            else{
                searchParams.term = this.state.searchQuery;
                searchParams.limit = this.state.searchLimit;
                searchParams.location = this.state.locationQuery;
            }

            axios.get("/api/search",{
                params: searchParams
            })
            .then(res => {
                if(res.data.success === true){
                    let searchData = res.data.body;
                    searchData = JSON.parse(res.data.body);
                    //determine if results returned from api
                    if(searchData.businesses !== undefined){
                        let initialSearchResults = [];
                        for(let i = 0; i < 12; i++){
                            initialSearchResults.push(searchData.businesses[i]);
                        }
                        let paginationArray = [];
                        for(let i = 1; i <= 5; i++){
                            paginationArray.push(
                                <Pagination.Item onClick={this.handlePaginationChange} key={i} active={i === this.state.activePage}>
                                    {i}
                                </Pagination.Item>
                            );
                        }
                        this.setState({
                            searchResults: searchData.businesses,
                            spinnerVisible: "hidden",
                            searchResultsPaginated: initialSearchResults,
                            paginationItems: paginationArray
                        });
                    }

                    else{
                        this.setState({
                            searchResults: [],
                            spinnerVisible: "hidden"
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
        const results = this.state.searchResultsPaginated.map( result => {
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
                        <Col md="4">
                            <Form.Control onChange={this.handleSearchChange} onKeyPress={this.searchEnter} size="lg" type="text" placeholder={this.state.searchPlaceholder}/>
                        </Col>

                        <Col md="3">
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
                                disabled={this.state.searchLocationDisabled}
                            />
                        </Col>

                        <Col md="3">
                            <div className="currentLocationContainer">
                                <Form.Check inline type="checkbox">
                                    <Form.Check.Input type={"checkbox"} onChange={this.handleCurrentLocation}/>
                                    <Form.Check.Label>
                                        Use Current Location <MdMyLocation/>
                                    </Form.Check.Label>
                                </Form.Check>
                            </div>
                        </Col>

                        <Col md="2">
                            <div className="searchIconContainer" onClick={this.sendQuery}>
                                <FaSearch className="searchIcon"/>
                                <div className="searchLoadingContainer" style={{visibility: this.state.spinnerVisible}}>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="searchResultsContainer">
                        <Row>
                            { results }
                        </Row>  
                    </div>

                    <div>
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.searchLimit}
                            pageRangeDisplayed={4}
                            onChange={this.handlePaginationChange}
                            itemsCountPerPage={12}
                            hideDisabled
                        />
                    </div>
                </Container>
            </div>
        );
    }
}

export default SearchFood;
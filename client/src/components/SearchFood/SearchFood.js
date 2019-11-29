import React, { Component } from 'react';
import './SearchFood.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import cities from 'cities.json';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class SearchFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            locationQuery: "",
            searchPlaceholder: "Search food, restaurants, businesses, etc.",
            locationPlaceHolder: "Enter Location",
            citiesSuggestionsUs: []
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
                    location: this.state.locationQuery
                }
            })
            .then(res => {
                res.data.success ? console.log(res.data) : alert("success false");
            })
            .catch(err => {
                alert(err);
            })
        }

        else{
            alert("Please input search");
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
        return(
            <div>
                <Container>
                    <Row>
                        <Col md='6'>
                            <Form.Control onChange={this.handleSearchChange} size="lg" type="text" placeholder={this.state.searchPlaceholder}/>
                        </Col>

                        <Col md='4'>
                            <AsyncTypeahead 
                                labelKey={option => option.name}
                                options={this.state.citiesSuggestionsUs}
                                placeholder={this.state.locationPlaceHolder}
                                bsSize="lg"
                                maxResults={10}
                                isLoading={false}
                                onSearch={this.handleLocationChange}
                                onChange={this.selectedChange}
                            />
                        </Col>

                        <Col md='2'>
                            <div className="searchIconContainer" onClick={this.sendQuery}>
                                <FaSearch className="searchIcon"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchFood;
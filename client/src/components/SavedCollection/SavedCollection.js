import React, { Component } from 'react';
import './SavedCollection.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import CollectionResult from '../CollectionResult/CollectionResult';

class SavedCollection extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const collectionResults = this.props.items.map(result => {
            return(
                <Col md={4}>
                    <CollectionResult
                        key={result.phone} 
                        businessName={result.businessName} 
                        phone={result.phone} 
                        image={result.image} 
                        yelpURL={result.yelpURL}
                        address={result.address}
                        price={result.price}
                        imgStarSrc={result.imgStarSrc}
                    />  
                </Col>
            )
        })
        return(
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>
                                Saved Collection 
                            </h1>
                        </Col>
                    </Row>
{/* 
                    <Row>
                        <Col sm="2">
                            <Form>
                                <Form.Control
                                    placeholder="Search Collection"
                                    type="text"
                                />
                            </Form>
                        </Col>
                    </Row> */}

                    <div className="savedResultsContainer">
                        <Row>
                            { collectionResults }
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        items: state.loginReducer.savedItems
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateSavedItems: (updateItems) => {
            dispatch({
                type: actions.UPDATE_SAVED_ITEMS,
                items: updateItems
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedCollection);
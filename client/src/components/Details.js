import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, CardFooter, Button, Form, FormGroup, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: null };
    }

    // Fetch the data from An External API
    componentWillMount() {
        this.source = axios.CancelToken.source();
        const { id } = this.props.match.params;

        axios.get(`http://localhost:8000/movies/${id}`, {
            cancelToken: this.source.token
        })
            .then((response) => {
                const movie = response.data;
                this.setState({ movie });
            })
            .catch(error => {
                console.log(error)
            });
    }

    // Unmount mounted data
    componentWillUnmount() {
        this.source.cancel();
    }

    render() {
        const { movie } = this.state;
        if (movie === null) {
            return <p>Problem to fetch movie.....</p>
        }

        return (
            <>
                <Helmet>
                    <title>Details</title>
                </Helmet><br />
                <div className="mainDiv">
                    <Card style={{ backgroundColor: 'lightgray', width: "800px" }}>
                        <CardHeader style={{ backgroundColor: '#00baff' }}><h3>{movie.title} <i class="fa fa-film" aria-hidden="true"></i></h3></CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Col style={{ fontWeight: "bold" }} sm={2}>Description: </Col>
                                    <Col sm={10}>{movie.description}</Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col style={{ fontWeight: "bold" }} sm={2}>Director: </Col>
                                    <Col sm={10}>{movie.director}</Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col style={{ fontWeight: "bold" }} sm={2}>Rating: </Col>
                                    <Col sm={10}>
                                        {/* <Progress multi style={{ marginTop: '7px', width: '50%' }}>
                                            <Progress bar value={movie.rating} max="5">{movie.rating}</Progress>
                                        </Progress> */}
                                        <star-rating value={movie.rating}></star-rating>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter><Link to={`/edit/${movie.id}`}><Button color="info">EDIT <i className="fa fa-pencil"></i></Button></Link></CardFooter>
                    </Card>
                </div>
                <br />
            </>
        );
    }
}

export default Details;
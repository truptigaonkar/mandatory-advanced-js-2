import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Button, Table, Badge, InputGroupAddon, Input, InputGroup, Progress } from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search: '', // Search state
            errorMessage: '',
            successMessage: '',
        };
    }

    // Fetch the data from An External API
    componentWillMount() {
        this.source = axios.CancelToken.source();

        axios.get('http://localhost:8000/movies',
            { cancelToken: this.source.token })
            .then(response => {
                /* // Other way
                const movies = response.data;
                console.log(movies);
                this.setState({ movies}); */
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.log(error);
                if (error.response === 404) {
                    this.setState({
                        errorMessage: "Movie with the supplied id does not exist"
                    });
                }
            });
    }

    // Unmount mounted data
    componentWillUnmount() {
        this.source.cancel();
    }

    // Search function
    handleSearch(e) {
        this.setState({
            search: e.target.value
        });
    }

    // Delete function
    handleDelete(id) { // <-- declare id parameter
        axios.delete(`http://localhost:8000/movies/${id}`) // <-- remove ;
            .then(res => {
                const latestState = [...this.state.movies]; // latest added movies
                const movieCheck = (movie) => id !== movie.id;
                //const movieCheck = latestState.findIndex(item => item.id === id);
                //latestState.splice(movieCheck, 1);
                this.setState({
                    successMessage: 'Movie deleted successfully !!!!',
                    movies: latestState.filter(movieCheck), // Filter
                    //latestState  
                });
            })
    }

    render() {
        console.log(this.props.location);

        // Search filter with case-sensitive movie title and director. Reference: https://www.youtube.com/watch?v=RM_nXOyHwN0
        const { search } = this.state;
        let searchFilterMovies = this.state.movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || movie.director.toLowerCase().indexOf(search.toLowerCase()) !== -1
            }
        )

        return (
            <>
                <Helmet>
                    <title>Home</title>
                </Helmet><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: 'lightgray' }}>
                        <CardHeader style={{ backgroundColor: '#B80000' }}><h3><i class="fa fa-film" aria-hidden="true"></i> Movies <Badge color="info">{this.state.movies.length}</Badge> </h3></CardHeader>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend"><Button><i className="fa fa-search"></i></Button></InputGroupAddon>
                                <Input placeholder="Search movies by Title or Director....." onChange={this.handleSearch.bind(this)} />
                            </InputGroup><br />
                            <div className="successMessage">{this.state.successMessage}</div> {/* Success message after performing actions */}
                            {/* <div>{this.props.location.state.successMessage1}</div> */}
                            <Table style={{ textAlign: "center" }} size="sm" dark hover responsive>
                                <thead style={{ color: 'red' }}>
                                    <tr>
                                        <th><i className="fa fa-film"></i> Title</th>
                                        <th><i className="fa fa-film"></i> Director</th>
                                        <th><i className="fa fa-film"></i> Rating (0.0 - 5.0) </th>
                                        <th><i className="fa fa-tasks"></i> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Search filter */}
                                    {searchFilterMovies.map((movie) => (
                                        <tr key={movie.id}>
                                            <td><Link to={`/details/${movie.id}`}><strong>{movie.title}</strong></Link></td> {/* Link to get individual movie details */}
                                            <td>{movie.director}</td>
                                            <td>
                                                <Progress multi style={{ marginTop: '10px' }}>
                                                    <Progress bar value={movie.rating} max="5">{movie.rating}</Progress>
                                                </Progress>
                                            </td>

                                            <td>
                                                <Link to={`/details/${movie.id}`}><Button color="success"><i className="fa fa-info"></i></Button></Link> <Link to={`/edit/${movie.id}`}><Button color="info"><i className="fa fa-pencil"></i></Button></Link> <Button color="danger" onClick={() => this.handleDelete(movie.id)}><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Home;
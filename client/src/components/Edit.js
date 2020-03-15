import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Form, Label, Col, Input, FormGroup, Button, Badge } from 'reactstrap';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieData: {
        title: '',
        director: '',
        description: '',
        rating: 0
      },
      validationMessage: '',
    }
  }

  // Fetching previous data correspond to respective id, after clicking edit button
  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`http://localhost:5000/movies/${id}`)
      .then((response) => response.json())
      .then((movieData) => this.setState({ movieData }));
  }

  // Handling input button function
  handleInputChange({ currentTarget: input }) {
    const movieData = { ...this.state.movieData };
    movieData[input.name] = input.value;
    this.setState({ movieData });
  };

  // Handling Edit form function
  handleEditFormSubmit(e) {
    e.preventDefault();

    // ----- 1st way: Editing movie using axios  --------//
    const { id } = this.props.match.params;
    axios.put(`http://localhost:5000/movies/${id}`, this.state.movieData)
      .then((response) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ validationMessage: "Please fill in all the fields before proceeding further !!!!" });
      });

    return; // avoid below code

    // ----- 2nd way: Editing movie using fetch  --------//
    fetch(`http://localhost:5000/movies/${id}`,
      {
        method: "PUT",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(this.state.movieData)
      }
    )
      .then((response) => {
        //if (response.status === 201) {
        if (response.ok) {
          this.props.history.push("/");
        } else {
          this.setState({ validationMessage: "Please fill in all the fields before proceeding further !!!!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  render() {
    const { movieData } = this.state;
    return (
      <div>
        <Helmet>
          <title>Edit</title>
        </Helmet><br />

        <div className="mainDiv">
          <Card style={{ backgroundColor: 'lightgray', width: "800px" }}>
            <CardHeader style={{ backgroundColor: '#00baff' }}><h3>Edit <i class="fa fa-film"></i></h3></CardHeader>
            <CardBody>
              <div className="validationMessage">{this.state.validationMessage}</div> {/* Error messsage */}

              <Form onSubmit={this.handleEditFormSubmit.bind(this)}>
                <FormGroup row>
                  <Label for="title" sm={2}>Title</Label>
                  <Col sm={10}>
                    <Input type="text" name="title" id="title" placeholder="Title" minLength="1" maxLength="40" value={movieData.title} onChange={this.handleInputChange.bind(this)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input type="textarea" name="description" id="description" placeholder="Description" minLength="1" maxLength="300" value={movieData.description} onChange={this.handleInputChange.bind(this)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="director" sm={2}>Director</Label>
                  <Col sm={10}>
                    <Input type="text" name="director" id="director" placeholder="Director" minLength="1" maxLength="40" value={movieData.director} onChange={this.handleInputChange.bind(this)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="rating" sm={2}>Rating</Label>
                  <Col sm={10}>
                    <Input style={{ width: "100%" }} type="range" name="rating" id="rating" placeholder="Rating" min="0.0" max="5.0" step="0.1" value={movieData.rating} onChange={this.handleInputChange.bind(this)} />
                    <Badge sm={2} color="success" style={{ marginLeft: "50%" }}>{movieData.rating}</Badge>  {/* Showing movie rating */}
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col>
                    <Button color="danger" size="lg" block><i class="fa fa-edit" aria-hidden="true"> Update </i></Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
export default Edit;

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Form, Label, Col, Input, FormGroup, Button, Badge } from 'reactstrap';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      director: '',
      rating: 0,
      validationMessage: '',
    }
  }

  handleAddFormSubmit(e) {
    e.preventDefault();
    const movieData = {};
    movieData.title = this.state.title;
    movieData.description = this.state.description;
    movieData.director = this.state.director;
    movieData.rating = this.state.rating;

    // ----- 1st way: Adding movie using axios  --------//
    //axios.post("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/", movieData) 

    // ----- 2nd way: Adding movie using fetch. Reference: https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4?noredirect=1    -----//
    fetch("http://localhost:5000/movies",
      {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(movieData) //JSON-encoded movie object
      }
    )
      .then((response) => {
        // if (response.ok) {
        if (response.status === 201) {
          this.props.history.push({
            pathname: '/',
            state: {
              hasAdded: true,
              //successMessage1: "",
              successMessage1:  "Added Successfully!!!!"
            }
          });
        } else {
          this.setState({ validationMessage: "Please fill in all the fields before proceeding further !!!!" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Add</title>
        </Helmet><br />
        <div className="mainDiv">
          <Card style={{ backgroundColor: 'lightgray', width: "800px" }}>
            <CardHeader style={{ backgroundColor: '#00baff' }}><h3> Add <i class="fa fa-film" aria-hidden="true"></i></h3></CardHeader>
            <CardBody>
              <div className="validationMessage">{this.state.validationMessage}</div> {/* Error messsage */}

              <Form onSubmit={this.handleAddFormSubmit.bind(this)}>
                <FormGroup row>
                  <Label for="title" sm={2}>Title</Label>
                  <Col sm={10}>
                    <Input type="text" name="title" id="title" placeholder="Title" minLength="1" maxLength="40" onChange={(e) => this.setState({ title: e.target.value })} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input type="textarea" name="description" id="description" placeholder="Description" minLength="1" maxLength="300" onChange={(e) => this.setState({ description: e.target.value })} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="director" sm={2}>Director</Label>
                  <Col sm={10}>
                    <Input type="text" name="director" id="director" placeholder="Director" minLength="1" maxLength="40" onChange={(e) => this.setState({ director: e.target.value })} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="rating" sm={2}>Rating</Label>
                  <Col sm={10}>
                    <Input style={{ width: "100%" }} type="range" name="rating" id="rating" placeholder="Rating" min="0.0" max="5.0" step="0.1" value={this.state.rating} onChange={(e) => this.setState({ rating: e.target.value })} />
                    <Badge sm={1} color="success" style={{ marginLeft: "50%" }}>{this.state.rating}</Badge>  {/* Showing movie rating */}
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col>
                    <Button color="danger" size="lg" block><i class="fa fa-plus-square" aria-hidden="true"> Add </i></Button>
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

export default Add;
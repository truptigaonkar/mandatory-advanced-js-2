import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Add = props => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [rating, setRating] = useState(0)
    const [error, setError] = useState(false)
    const [toHome, setToHome] = useState(false)
  
    const handleAdd = (e) =>{
        e.preventDefault()
        /* //Create: Alternate way
        const movieData = {};
        movieData.title = title;
        movieData.description = description;
        movieData.director = director;
        movieData.rating = rating;
        axios.post('http://localhost:5000/movies', movieData)
            .then((res) => {
                console.log(res.data);
                setToHome(true)

            })
            .catch((err) => {
                setError(err.message);
            }); */

        axios.post('http://localhost:5000/movies', { title, description, director, rating })
            .then((res) => {
                //console.log(res.data);
                setToHome(true)
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    return (
        <div>
            <h4>Add</h4>
            {toHome ? <Redirect to="/" /> : null}
            {error && <div>ADD: Please fill in all the fields - <b>{error}</b></div>}
            <form onSubmit={handleAdd}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)}/>
                <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
                <button>Add Movie</button>
            </form>
        </div>
    )
};

export default Add;

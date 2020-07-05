import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Edit = props => {
    const [movie, setMovie] = useState('')
    const {id} = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
        .get(`http://localhost:5000/movies/${id}`)
        .then((res) => {
            setMovie(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [id]);

    return (
        <div>
            <h4>Edit Movie</h4>
            {error && <div>Please fill in all the fields - <b>{error}</b></div>}
            <form>
                <input type="text" name="title" placeholder="Title" value={movie.title} />
                <input type="text" name="description" placeholder="Description" value={movie.description} />
                <input type="text" name="director" placeholder="Director" value={movie.director} />
                <input type="text" name="rating" placeholder="Rating" value={movie.rating} />
                <button>Edit Movie</button>
            </form>
        </div>
    )
};

export default Edit;

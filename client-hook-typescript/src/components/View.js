import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

const View = props => {
    const [movie, setMovie] = useState('')
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/movies/${id}`)
            .then((res) => {
                setMovie(res.data);
                //console.log(res.data);
                setLoad(true);
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }, [id]);

    return (
        <div>
            <h4>View Movie</h4>
            {!load && <div>loading.....</div>}
            {error && <div>VIEW: Something went wrong - <b>{error}</b></div>}
            <li>{movie.id}</li>
            <li>{movie.title}</li>
            <li>{movie.description}</li>
            <li>{movie.director}</li>
            <li>{movie.rating}</li>
        </div>
    )
};

export default View;

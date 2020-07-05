import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useParams, Redirect} from 'react-router-dom'

const Edit = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [rating, setRating] = useState('')

    const {id} = useParams()
    const [error, setError] = useState(false)
    const [toHome, setToHome] = useState(false)

    // fetching old data into inputs
    useEffect(() => {
        axios
        .get(`http://localhost:5000/movies/${id}`)
        .then((res) => {
            console.log(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setDirector(res.data.director)
            setRating(res.data.rating)
        })
        .catch((err) => {
            setError(err.message);
        });
    }, [id]);

    const handleEdit = (e) =>{
        e.preventDefault()

        axios.put(`http://localhost:5000/movies/${id}`,  { title, description, director, rating })
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
            <h4>Edit Movie</h4>
            {toHome ? <Redirect to="/" /> : null}
            {error && <div>Please fill in all the fields - <b>{error}</b></div>}
            <form onSubmit={handleEdit}>
                <input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" name="director" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)}/>
                <input type="text" name="rating" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                <button>Edit Movie</button>
            </form>
        </div>
    )
};

export default Edit;

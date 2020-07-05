import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function List(props:any) {
    const {movies, setMovies} = props
    const [error, setError] = useState(false)

    const handleDelete = (id:any) =>{
        axios.delete(`http://localhost:5000/movies/${id}`) 
            .then(res => {
                const latestState = [...movies]; // latest added movies
                const movieCheck = (movie: any) => id !== movie.id;
                setMovies(latestState.filter(movieCheck))
            })
            .catch((err) => {
                setError(err.message);
            });
    } 

    return (
        <div>
            {error && <div>DELETE: Something went wrong - <b>{error}</b></div>}
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Desciption</th>
                        <th>Director</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {movies.map((movie:any) =>(
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.description}</td>
                        <td>{movie.director}</td>
                        <td>{movie.rating}</td>
                        <td>
                            <button><Link to={`/view/${movie.id}`}>View</Link></button>
                            <button onClick={() => handleDelete(movie.id)}>Delete</button>
                            <button><Link to={`/edit/${movie.id}`}>Edit</Link></button>
                        </td>
                    </tr> 
                ))} 
                </tbody>
            </table>
        </div>
    )
}

export default List;

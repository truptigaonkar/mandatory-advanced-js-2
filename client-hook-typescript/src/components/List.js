import React from 'react';

function List(props) {
    const {movies, setMovies} = props

    /* //Delete: Alternate way
    const handleDelete = (id) =>{
        const latestState = [...movies]
        const itemCheck = (item) => id !== item.id
        setMovies(latestState.filter(itemCheck))
    } */

    const handleDelete = (index) =>{
        const latestState = [...movies]
        latestState.splice(index, 1);
        setMovies(latestState)
    }

    return (
        <div>
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
                {movies.map((movie,index) =>(
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.description}</td>
                        <td>{movie.director}</td>
                        <td>{movie.rating}</td>
                        {/* <td><button onClick={() => handleDelete(movie.id)}>Delete</button></td> */}
                        <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                    </tr> 
                ))} 
                </tbody>
            </table>
        </div>
    )
}

export default List;

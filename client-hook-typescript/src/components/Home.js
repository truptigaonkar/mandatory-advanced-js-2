import React, {useState, useEffect} from 'react'
import axios from 'axios'
import List from './List'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/movies`)
            .then((res) => {
                setMovies(res.data);
                //console.log(res.data);
                setLoad(true);
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }, []);

    return (
        <div>
            <h4>Movies List</h4>
            {!load && <div>loading.....</div>}
            {error && <div>Something went wrong - <b>{error}</b></div>}
            <List movies={movies} setMovies={setMovies}/>
        </div>
    )
}

export default Home;

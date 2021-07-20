import React, {useState, useEffect} from 'react'
import axios from '../../containers/middleware'
import './style.css'
import {PuffLoader} from "react-spinners"
import YouTube from 'react-youtube';
import config from "../../config"

function Carousal({title, fetchURL, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");
    const [spinnerState, setSpinnerState] = useState(false)
    const [trailerSpinnerState, setTrailerSpinnerState] = useState(false)

    const basePath = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            setSpinnerState(false)
            return request;
        }
        setSpinnerState(true)
        fetchData();
    }, [fetchURL]);

    const handleClick = (movie) => {
        setTrailerSpinnerState(true)
        async function fetchData(media_type) {
            const url = `https://api.themoviedb.org/3/${media_type}/${movie.id}/videos?api_key=${config.TMDB_API_KEY}&language=en-US`
            const request = await axios.get(url);
           
            if (request.data.results.length > 0) {
                const idx = request.data.results.findIndex(res => res.type === 'Trailer')
                setTrailerUrl(request.data.results[idx].key)
                setTrailerSpinnerState(false)
            } else {
                alert('Could not find the Trailer!')
            }
            return request
        }
        
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            if (movie.media_type && movie.media_type === 'movie')
            {
                fetchData('movie');
            } else {
                fetchData('tv');
            }
        }
      }


  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  return (
        <div className="carousal">
            <h3>{title}</h3>
            {!spinnerState ? 
                <div className="carousal_posters">
                    {movies.map(movie => (
                        <span 
                            className="carousal_span"
                            onClick={() => handleClick(movie)}
                        >
                            <img
                                key={movie.id}
                                className={`carousal_poster ${isLargeRow && "carousal_posterLarge"}`}
                                src={`${basePath}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        </span>
                    ))}
                </div> : 
                <div className="spinner">
                    <PuffLoader color={'white'}/>
                </div>
            }
            
            {trailerUrl && !trailerSpinnerState && 
                <div style={{ padding: "40px" }}>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            }
            {trailerUrl && trailerSpinnerState && 
                <div className="spinner">
                    <PuffLoader color={'white'}/>
                </div>
            }
        </div>
    )
}

export default Carousal

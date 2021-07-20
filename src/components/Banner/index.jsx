import React, {useState, useEffect} from 'react'
import requests from '../../containers/requestLookup'
import axios from '../../containers/middleware'
import './style.css'
import config from "../../config"
import YouTube from 'react-youtube';
import {PuffLoader} from "react-spinners"

function Banner() {
    const [movie, setMovie] = useState({}) 
    const [trailerUrl, setTrailerUrl] = useState("");
    const [trailerSpinnerState, setTrailerSpinnerState] = useState(false)

    useEffect(() => {
        async function fetchData() {
          const request = await axios.get(requests.fetchTrending);
          setMovie(
            request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
            ]
          );
          return request;
        }
        fetchData();
      }, []);

      function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

      const handleClick = (movie) => {
        console.log(movie)
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
            if (movie.media_type && movie.media_type === 'movie') fetchData('movie');
            else fetchData('tv');
        }
      }

      const opts = {
        height: "450",
        width: "99%",
        playerVars: {
          autoplay: 0,
        }
      }

    return (
      <div>
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: 'center center'
        }}>
            <div className="banner__contents">
                <h1 className='banner__title'>{movie?.title || movie?.original_title}</h1>
                <div className="banner__buttons">
                    <button className="banner__btn" onClick={() => handleClick(movie)}>Play</button>
                    <button className="banner__btn">My List</button>
                </div>
                <p className="banner__description">
                    {truncate(movie?.overview, 150)}
                </p>            
            </div>  
            <div className="banner__blur"></div>  

        </header>
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

export default Banner

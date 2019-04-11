import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

import Context from '../../state/context';
import Header from '../UI/Header';

const home = props => {

    let isUnmounted = false;
    const { history } = props;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const GET_NOW_PLAYING_MOVIES_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
    const TOM_CRUISE_HIGHEST_RANKED = `http://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=${API_KEY}`;
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [tomCruiseMovies, setTomCruisMovies] = useState([]);
    const { dispatch } = useContext(Context);

    useEffect(() => {
        getNowPlayingMovies();
        getTomCruiseMovies();
    }, []);

    const getNowPlayingMovies = async () => {
        try {
            const { data } = await axios.get(GET_NOW_PLAYING_MOVIES_URL);
            if (isUnmounted) {
                return;
            }
            console.log(data.results);
            setNowPlayingMovies(data.results);

            return () => {
                isUnmounted = true;
            }
        } catch (err) {
            console.error('Error getting now playing movies', err);
        }
    }

    const getTomCruiseMovies = async () => {
        try {
            const { data } = await axios.get(TOM_CRUISE_HIGHEST_RANKED);
            if (isUnmounted) {
                return;
            }
            setTomCruisMovies(data.results);

            return () => {
                isUnmounted = true;
            }
        } catch (err) {
            console.error('Error getting actor movies', err);
        }
    }

    const handleCarouselItemClick = itemId => {
        dispatch({ type: 'SELECT_MOVIE', payload: itemId })
        history.push(`/movie/${itemId}`);
    }

    return (
        <Home>
            <Header big>In Theathers</Header>
            <Header>Now playing movies</Header>
            <StyledCarousel
                fade
                keyboard
                indicators={false}
            >
                {nowPlayingMovies.map(movie => (
                    <Carousel.Item key={movie.id} onClick={() => handleCarouselItemClick(movie.id)}>
                        <img
                            className="d-block w-100"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt="First slide"
                        />
                        <StyledCarouseCaption>
                            <Header big>{movie.title}</Header>
                            <Header>{movie.overview.split(' ').slice(0, 15).join(' ')}...</Header>
                        </StyledCarouseCaption>
                    </Carousel.Item>
                ))}
            </StyledCarousel>
        </Home>
    );
}

export default home;

const Home = styled.div`
    padding: 0 5%;
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
        padding: 0;
    }
`;

const StyledCarousel = styled(Carousel)`
    :hover {
        cursor: pointer;
        img {
            -webkit-filter: blur(2px);
            filter: blur(2px);
            transition: .3s filter linear;
        }
    }
`;

const StyledCarouseCaption = styled(Carousel.Caption)`
    top: 25%;


    ${Header} {
        text-shadow: 0px 0px 20px #000;
    }

    @media (max-width: 900px) {
        top: 10%;

        p {
            display: none;
        }
    }
`;
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Context from '../../state/context';
import Header from '../UI/Header';
import Carousel from '../UI/Carousel/Carousel';
import BANNER_BACKGROUND_IMAGE from '../../assets/images/home_banner.jpg';
import Button from '../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = props => {

    let isUnmounted = false;
    const { history } = props;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const GET_NOW_PLAYING_MOVIES_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
    const TOM_CRUISE_HIGHEST_RANKED = `https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=${API_KEY}`;
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

    const handleFindPopularClicked = () => {
        history.push(`/popular`);
    }

    return (
        <Home>
            <Banner>
                <Header big>Camera..Action! Enjoy the movie!</Header>
                <p>Find the movies of your interest by simply searching, or using the popular categories.</p>
                <Button variant="outline-danger" size="lg" onClick={handleFindPopularClicked}>
                    <FontAwesomeIcon icon="arrow-alt-circle-right" /> Find popular
                </Button>
            </Banner>
            <StyledSection>
                <Carousel movies={nowPlayingMovies} onClick={handleCarouselItemClick} />
            </StyledSection>
        </Home>
    );
}

export default home;

const Home = styled.div`
    display: flex;
    flex-direction: column;

    /* .carousel {
        padding: 0 10%;
    } */

    button { 
        margin-top: 30px;
    }
`;

const Banner = styled.div`
    width: 100%;
    height: auto;
    min-height: 400px;
    background: url(${BANNER_BACKGROUND_IMAGE});    
    display: flex;
    flex-direction: column;
    align-items: center;    
    justify-content: center;
`;

const StyledSection = styled.section`
    padding: 0 5%;
    margin: 30px 0;

    @media (max-width: 1200px) {
        padding: 0;
    }
`;
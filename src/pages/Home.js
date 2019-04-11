import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Context from '../state/context';
import Header from '../components/shared/Header';
import Carousel from '../components/shared/Carousel';
import BANNER_BACKGROUND_IMAGE from '../assets/images/home_banner.jpg';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

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
                <Header middle>In Theaters Now</Header>
                <Header>
                    Most popular movies that are currently played in theaters. Click on a movie to get more details.
                </Header>
                <Carousel movies={nowPlayingMovies} onClick={handleCarouselItemClick} />
            </StyledSection>
            <StyledSection>
                <Header middle>Top 4 of Tom Cruise's highest ranked science fiction movies</Header>
                <Header>Did you know?</Header>
                <StyledCardGroup>
                    {tomCruiseMovies.slice(1, 5).map(movie => (
                        <Card
                            key={movie.id}
                            id={movie.id}
                            imageUrl={movie.poster_path}
                            onClick={() => handleCarouselItemClick(movie.id)}
                            title={movie.title}
                        />
                    ))}
                </StyledCardGroup>
            </StyledSection>
        </Home>
    );
}

export default home;

const Home = styled.div`
    display: flex;
    flex-direction: column;

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

const StyledCardGroup = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
        margin: 10px;
        flex: 1 1 22%;
    }

    @media (max-width: 1200px) {
        div {
            flex: 1 1 47%;
        }
    }
    @media (max-width: 900px) {
        div {
            margin: 5px;
            flex: 1 1 45%;
        }
    }
`;
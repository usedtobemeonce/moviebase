import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { Loader } from 'semantic-ui-react'

import Image from '../UI/Image/Image';
import Video from './Video';
import MovieDetails from './MovieDetails';
import Stats from './Stats';
import Cast from './Cast';
import { stringFromArrayNameProps } from '../../util/helper';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const GET_MOVIE_VIDEOS_URL = id => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
const GET_MOVIE_EXTERNAL_IDS_URL = id => `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${API_KEY}`;
const GET_MOVIE_CREDITS_URL = id => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

export default function ({ match, history }) {
    const GET_MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/`;
    // const GET_SIMILAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/450465/similar`;
    // const GET_MOVIE_EXTERNAL_IDS_URL = `https://api.themoviedb.org/3/movie/450465/external_ids`;

    const [movieId, setMovieId] = useState(0);
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieVideos, setMovieVideos] = useState([]);
    const [externalIds, setExternalIds] = useState([]);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const movieIdParam = match.params.movieId;
        const movieId = Number(movieIdParam);
        if (movieId) {
            setMovieId(movieId);
        } else {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        getMovieDetails(movieId);
    }, [movieId]);

    useEffect(() => {
        if (movieDetails) {
            getMovieRelatedData(movieDetails.id);
        }
    }, [movieDetails]);

    const getMovieDetails = async (movieId) => {
        if (movieId <= 0) return;

        try {
            const { data } = await axios.get(`${GET_MOVIE_DETAILS_URL}${movieId}?api_key=${API_KEY}`);
            setMovieDetails(data);
            // console.log(data);
        } catch (error) {
            console.error('Error getting movie details', error);
        }
    }

    /**
     * Get movie related data
     * 
     * @param {*} id the id of the movie
     */
    const getMovieRelatedData = id => {
        getMovieVideos(id);
        getMovieExternalUrls(id);
        getCast(id);
    }

    const getMovieVideos = async id => {
        try {
            const url = GET_MOVIE_VIDEOS_URL(id);
            const { data } = await axios.get(url);
            setMovieVideos(data.results);
        } catch (error) {
            console.log("Error getting movie videos", error);
        }
    }

    const getMovieExternalUrls = async id => {
        try {
            const url = GET_MOVIE_EXTERNAL_IDS_URL(id);
            const { data } = await axios.get(url);
            setExternalIds(data);
        } catch (error) {
            console.log("Error getting external urls", error);
        }
    }

    const getCast = async id => {
        try {
            const url = GET_MOVIE_CREDITS_URL(id);
            const { data } = await axios.get(url);
            setCast(data.cast);
        } catch (error) {
            console.log("Error getting credits", error);
        }
    }

    // let content = <Loader active size='medium' />;
    let content = null;

    if (movieDetails) {
        content = (
            <MovieContainer>
                <StyledImage
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                />

                <StyledMovieDetails
                    title={movieDetails.title}
                    externalIds={externalIds}
                    tagline={movieDetails.tagline}
                    genres={movieDetails.genres}
                    overview={movieDetails.overview}
                />

                <StyledVideo movieVideos={movieVideos} />

                <StyledStats
                    status={movieDetails.status}
                    releaseDate={movieDetails.release_date}
                    budget={movieDetails.budget}
                    revenue={movieDetails.revenue}
                    languages={stringFromArrayNameProps(movieDetails.spoken_languages)}
                    runtime={movieDetails.runtime}
                    countries={stringFromArrayNameProps(movieDetails.production_countries)}
                />

                <StyledCast cast={cast} />
            </MovieContainer>
        );
    }

    return (content);
}

const MovieContainer = styled.div`
    margin: auto;
    max-width: 2000px;
    height: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 20% 50%;
    grid-template-areas:
        "image details"
        "video video"
        "stats stats"
        "cast cast";
    grid-gap: 10px;
    justify-content: center;
    @media (max-width: 1200px) {
        grid-template-columns: auto auto;
        grid-template-areas:
            "image details"
            "video video"
            "stats stats"
            "cast cast";
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "image"
            "details"
            "video"
            "stats"
            "cast";
    }
`;

const StyledImage = styled(Image)`
    grid-area: image;
`;

const StyledMovieDetails = styled(MovieDetails)`
    grid-area: details;
    margin: 10px 0;
`;

const StyledVideo = styled(Video)`
    grid-area: video;
    margin: 10px 0;
`;

const StyledStats = styled(Stats)`
    grid-area: stats;
    margin: 10px 0;
`;

const StyledCast = styled(Cast)`
    grid-area: cast;
    margin: 10px 0;
`;
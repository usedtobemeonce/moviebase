import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
    Badge,
    Spinner,
    Pane,
    Table,
} from 'evergreen-ui';

import Image from '../UI/Image';
import Heading from '../UI/Heading';
import { numberWithCommas } from '../../util/helper';

const MovieContainer = styled.div`
    height: auto;
    display: grid;
    grid-template-columns: minmax(auto, 450px) 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        "image movieDetails"
        "stats stats";
    grid-gap: 10px;
    @media (max-width: 900px) {
        grid-template-areas: 
            "image"
            "movieDetails"
            "stats";
        justify-content: center;
    }
`;

const MovieDetails = styled.div`
    grid-area: movieDetails;
    padding: 20px 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto) 1fr;
    align-items: end;
`;

const Overview = styled.p`
    font-size: calc(12px + .4vw);
`;

const Genres = styled.div`
    cursor: pointer;
    align-self: end !important;
`;

const Stats = styled.div`
    grid-area: stats;
`;

export default function ({ match, history }) {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const GET_MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/`;
    const [movieId, setMovieId] = useState(0);
    const [movieDetails, setMovieDetails] = useState(null);

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

    const getLanguages = languagesList => {
        const languages = languagesList.map(language => language.name).join(', ');
        return languages;
    }

    const getCountries = countriesList => {
        const countries = countriesList.map(country => country.name).join(', ');
        return countries;
    }

    let content = (
        <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
            <Spinner />
        </Pane>
    );

    if (movieDetails) {
        content = (
            <MovieContainer>
                <Image
                    style={{ gridArea: 'image' }}
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                />
                <MovieDetails>
                    <Heading big>{movieDetails.title}</Heading>
                    <Heading>{movieDetails.tagline}</Heading>
                    <Genres>
                        {movieDetails.genres.map(genre => (
                            <Badge key={genre.id} margin={5} color="green" isSolid>{genre.name}</Badge>
                        ))}
                    </Genres>
                    <Overview>{movieDetails.overview}</Overview>
                </MovieDetails>
                <Stats>
                    <Heading>Stats for nerds</Heading>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.TextCell>Status</Table.TextCell>
                                <Table.TextCell>{movieDetails.status}</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Release Date</Table.TextCell>
                                <Table.TextCell>{movieDetails.release_date}</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Budget</Table.TextCell>
                                <Table.TextCell>{numberWithCommas(movieDetails.budget)}</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Revenue</Table.TextCell>
                                <Table.TextCell>{numberWithCommas(movieDetails.revenue)}</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Languages</Table.TextCell>
                                <Table.TextCell>{getLanguages(movieDetails.spoken_languages)}</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Runtime</Table.TextCell>
                                <Table.TextCell>{movieDetails.runtime} minutes</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>Countries</Table.TextCell>
                                <Table.TextCell>{getCountries(movieDetails.production_countries)}</Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Stats>
            </MovieContainer>
        );
    }

    return (content);
}
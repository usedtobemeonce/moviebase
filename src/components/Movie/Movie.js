import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
    Badge,
    Spinner,
    Pane,
    Icon,
    Table,
} from 'evergreen-ui';

import Image from '../UI/Image';
import Heading from '../UI/Heading';

const MovieContainer = styled.div`
    height: auto;
    display: grid;
    grid-template-columns: minmax(auto, 450px) 1fr;
    grid-template-areas: "image info";
    grid-gap: 10px;
    @media (max-width: 769px) {
        grid-template-areas: 
            "image"
            "info";
        justify-content: center;
    }
`;

const MovieDetails = styled.div`
    grid-area: info;
    padding: 20px 10px;
`;

const Overview = styled.p`
    font-size: calc(12px + .4vw);
`;

const TableHead = styled(Table.Head)`
    background-color: #212121 !important;
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
                    <div>
                        {movieDetails.genres.map(genre => (
                            <Badge key={genre.id} margin={5} color="green" isSolid>{genre.name}</Badge>
                        ))}
                    </div>
                    <Overview>{movieDetails.overview}</Overview>
                    <Table>
                        <TableHead>
                            <Table.TextHeaderCell>Status</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Release Date</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Budge</Table.TextHeaderCell>
                        </TableHead>
                        <Table.Body>
                            <Table.Row>
                                <Table.TextCell>{movieDetails.status}</Table.TextCell>
                                <Table.TextCell>{movieDetails.release_date}</Table.TextCell>
                                <Table.TextCell>
                                    <Icon icon="dollar" color="green" marginRight={5} />
                                    {movieDetails.budget}
                                </Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </MovieDetails>
            </MovieContainer>
        );
    }

    return (content);
}
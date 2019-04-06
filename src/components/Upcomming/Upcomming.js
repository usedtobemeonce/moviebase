import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Context from '../../state/context';
import Header from '../UI/Header';
import Grid from '../Grid/Grid';
import Pagination from '../Pagination/Pagination';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const GET_UPCOMMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

export default props => {
    let isUnmounted = false;
    const { dispatch } = useContext(Context);
    const [upcommingMovies, setUpcommingMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getUpcommingMovies();

        return () => {
            isUnmounted = true;
        }
    }, []);

    const getUpcommingMovies = async (page) => {
        try {
            const url = page
                ? `${GET_UPCOMMING_MOVIES_URL}&page=${page}`
                : GET_UPCOMMING_MOVIES_URL;
            const { data } = await axios.get(url);
            if (!isUnmounted) {
                setTotalPages(data.total_pages);
                setUpcommingMovies(data.results);
            }
        } catch (err) {
            console.error("Error getting upcomming movies", err);
        }
    }

    const handleItemClicked = itemId => {
        dispatch({ type: 'SELECT_MOVIE', payload: itemId })
        props.history.push(`/movie/${itemId}`);
    }

    const handlePageChange = (e, { activePage }) => {
        setPage(activePage);
        getUpcommingMovies(activePage);
    }

    return (
        <Container>
            <StyledHeader>
                <Header big as="h1">Upcomming movies</Header>
                <Header as="h3">Latest & Greatest...</Header>
            </StyledHeader>
            <Grid items={upcommingMovies} onItemClicked={handleItemClicked} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    )
}

const Container = styled.div`
    margin: 0 20%;
    display: flex;
    flex-direction: column;
    @media (max-width: 1200px) {
        margin: 0 10%;
    }
    @media(max-width: 900px) {
        margin: 5px;
    }
`;

const StyledHeader = styled.div`
    justify-self: center;
    margin: 20px;
`;
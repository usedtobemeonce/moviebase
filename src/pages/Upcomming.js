import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import Context from '../state/context';
import Results from '../components/results/Results';

export default props => {
    let isUnmounted = false;
    const { history, location } = props;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const UPCOMMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const { state, dispatch } = useContext(Context);
    const { page, pageChangedByApp } = state;

    useEffect(() => {
        const query = queryString.parse(location.search);
        if (query.page && query.page !== page && !pageChangedByApp) {
            dispatch({ type: 'CHANGE_PAGE', payload: query.page });
        } else {
            history.push(`?page=${page}`);
            getMovies(page);
        }

        return () => {
            isUnmounted = true;
        };
    }, [page]);

    const getMovies = async (page) => {
        try {
            const url = `${UPCOMMING_MOVIES_URL}&page=${page}`;
            const { data } = await axios.get(url);
            if (!isUnmounted) {
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);
                setMovies(data.results);
            }
        } catch (err) {
            console.error("Error getting upcomming movies", err);
        }
    }

    return (
        <Container>
            <Results
                resultsTitle={'Upcomming movies'}
                resultsSubtitle={'Latest & Greatest'}
                moviesList={movies}
                totalPages={totalPages}
                totalResults={totalResults}
                page={page}
                {...props}
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    @media(max-width: 900px) {
        margin: 5px;
    }
`;
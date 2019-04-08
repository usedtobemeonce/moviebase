import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import queryString from 'query-string';

import Results from '../Results/Results';
import Context from '../../state/context';

export default function (props) {
    let isUnmounted = false;
    const { location, history } = props;
    const { state, dispatch } = useContext(Context);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const SEARCH_MOVIES_URL = title => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`;

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { page, pageChangedByApp, searchTitle } = state;

    useEffect(() => {
        handleGetData();

        return () => {
            isUnmounted = true;
        }
    }, []);

    useEffect(() => {
        handleGetData();
    }, [page]);

    useEffect(() => {
        handleGetData();
    }, [searchTitle]);

    const handleGetData = () => {
        const query = queryString.parse(location.search);
        if (query.query) {
            if (query.page && !pageChangedByApp) {
                dispatch({ type: 'CHANGE_PAGE', payload: query.page });
                getMovies(query.query, query.page);
            } else {
                const currentPath = location.pathname;
                const searchQuery = query.query;
                let url = `${currentPath}?query=${searchQuery}`;
                url = query.page && query.page === page ? url : `${url}&page=${page}`;
                history.push(url);
                getMovies(query.query, page);
            }
        } else {
            history.push('/');
        }
    }

    const getMovies = async (title, page) => {
        try {
            const url = `${SEARCH_MOVIES_URL(title)}&page=${page}`;
            const { data } = await axios.get(url);
            if (isUnmounted) {
                return;
            }
            data.results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            setTotalPages(data.total_pages);
            setMovies(data.results);
        } catch (err) {
            console.error('Error searching movies', err);
        }
    }

    return (
        <Container>
            <Results
                resultsTitle={'Search results...'}
                resultsSubtitle={'You might be looking for that'}
                isSearch={true}
                moviesList={movies}
                totalPages={totalPages}
                page={page}
                {...props}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    @media(max-width: 900px) {
        margin: 5px;
    }
`;
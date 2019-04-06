import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Loader } from 'semantic-ui-react';

import Context from '../../state/context';
import Grid from '../Grid/Grid';
import Heading from '../UI/Header';
import Pagination from '../Pagination/Pagination';

export default function (props) {
    let isUnmounted = false;
    const { state, dispatch } = useContext(Context);
    const { searchTitle } = state;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const POPULAR_URL = () => `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const SEARCH_MOVIES_URL = title => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isPopular, setIsPopular] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        searchMovies(searchTitle);

        return () => {
            isUnmounted = true;
        }
    }, [searchTitle]);

    const searchMovies = title => {
        getMovies(title);
    }

    const getMovies = async (title, page) => {
        try {
            setIsLoadingData(true);
            const isPopular = (!title || 0 === title.length);
            let url = (isPopular)
                ? POPULAR_URL()
                : SEARCH_MOVIES_URL(title);
            url = page ? `${url}&page=${page}` : url;
            setIsPopular(isPopular);
            const { data } = await axios.get(url);
            if (isUnmounted) {
                setIsLoadingData(false);
                return;
            }
            data.results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            setTotalPages(data.total_pages);
            setMovies(data.results);
            setIsLoadingData(false);
        } catch (err) {
            setIsLoadingData(false);
            console.error('Error searching movies', err);
        }
    }

    const handleItemClicked = itemId => {
        dispatch({ type: 'SELECT_MOVIE', payload: itemId })
        props.history.push(`/movie/${itemId}`);
    }

    const handleClearkSearch = () => {
        setIsPopular(true);
        searchMovies();
        dispatch({ type: 'CLEAR_SEARCH' });
    }

    const handlePageChange = (e, { activePage }) => {
        setPage(activePage);
        getMovies(searchTitle, activePage);
    }

    const content = (
        <>
            {isPopular
                ? <Heading big as="h1">Popular movies</Heading>
                : <HeadingWrapper>
                    <Heading big as="h1">Search results...</Heading>
                    <Button color="grey" onClick={handleClearkSearch}>Clear search</Button>
                </HeadingWrapper>
            }
            <Grid items={movies} onItemClicked={handleItemClicked} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );

    return (
        <Results>
            {
                isLoadingData
                    ? <Loader active size='medium' />
                    : content
            }
        </Results>
    );
}

const Results = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Loader } from 'semantic-ui-react'

import Context from '../../state/context';
import Grid from './Grid/Grid';
import Heading from '../UI/Heading';

export default function (props) {
    let isUnmounted = false;
    const { state, dispatch } = useContext(Context);
    const { searchTitle } = state;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const SEARCH_MOVIES_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isPopular, setIsPopular] = useState(true);

    useEffect(() => {
        searchMovies(searchTitle);

        return () => {
            isUnmounted = true;
        }
    }, [searchTitle]);

    const searchMovies = title => {
        if (!title || 0 === title.length) {
            setIsPopular(true);
            getPopular();
        } else {
            setIsPopular(false);
            getMovies(title);
        }
    }

    const getPopular = async () => {
        try {
            setIsLoadingData(true);
            const { data } = await axios.get(POPULAR_URL);
            if (isUnmounted) {
                setIsLoadingData(false);
                return;
            }
            setMovies(data.results);
            setIsLoadingData(false);
        } catch (err) {
            setIsLoadingData(false);
            console.error('Error loading popular', err);
        }
    }

    const getMovies = async (title) => {
        try {
            setIsLoadingData(true);
            const searchQuery = `&language=en-US&query=${title}`;
            const { data } = await axios.get(`${SEARCH_MOVIES_URL}${searchQuery}`);
            data.results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            if (isUnmounted) {
                setIsLoadingData(false);
                return;
            }
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

    const content = (
        <>
            {isPopular
                ? <Heading>Popular movies</Heading>
                : <HeadingWrapper>
                    <Heading>Search results...</Heading>
                    <Button color="grey" onClick={handleClearkSearch}>Clear search</Button>
                </HeadingWrapper>
            }
            <Grid items={movies} onItemClicked={handleItemClicked} />
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
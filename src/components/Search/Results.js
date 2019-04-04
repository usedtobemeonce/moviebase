import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Context from '../../state/context';
import Grid from './Grid/Grid';
import Heading from '../UI/Heading';

export default function (props) {
    let isUnmounted = false;
    const { dispatch } = useContext(Context);
    const { searchTitle } = props;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
    const SEARCH_MOVIES_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

    const [movies, setMovies] = useState([]);
    // const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const [totalResults, setTotalResults] = useState(1);
    const [isTrending, setIsTrending] = useState(true);

    useEffect(() => {
        searchMovies(searchTitle);

        return () => {
            isUnmounted = true;
        }
    }, [searchTitle]);

    const searchMovies = title => {
        if (!title || 0 === title.length) {
            setIsTrending(true);
            getTrending();
        } else {
            setIsTrending(false);
            getMovies(title);
        }
    }

    const getTrending = async () => {
        try {
            const { data } = await axios.get(TRENDING_URL);
            if (isUnmounted) return;
            setMovies(data.results);
            // setPage(data.page);
            // setTotalPages(data.total_pages);
            // setTotalResults(data.total_results);
        } catch (err) {
            console.error('Error loading trending', err);
        }
    }

    const getMovies = async (title) => {
        try {
            const searchQuery = `&language=en-US&query=${title}`;
            const { data } = await axios.get(`${SEARCH_MOVIES_URL}${searchQuery}`);
            data.results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            if (isUnmounted) return;
            setMovies(data.results);
            // setPage(data.page);
            // setTotalPages(data.total_pages);
            // setTotalResults(data.total_results);
        } catch (err) {
            console.error('Error searching movies', err);
        }
    }

    const handleItemClicked = itemId => {
        dispatch({ type: 'SELECT_MOVIE', payload: itemId })
        props.history.push(`/movie/${itemId}`);
    }

    return (
        <>
            <Heading>{isTrending ? "Popular movies" : "Search results..."}</Heading>
            <Grid items={movies} onItemClicked={handleItemClicked} />
        </>
    );
}

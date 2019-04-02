import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from './List/List';
import Heading from '../ui/Heading';

export default function ({ searchTitle }) {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
    const SEARCH_MOVIES_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(1);
    const [isTrending, setIsTrending] = useState(true);

    useEffect(() => {
        searchMovies(searchTitle);
    }, [searchTitle]);

    const searchMovies = title => {
        if (!title || 0 === title.length) {
            console.log('load trending movies');
            setIsTrending(true);
            getTrending();
        } else {
            console.log('search movies by title: ', title);
            setIsTrending(false);
            getMovies(title);
        }
    }

    const getTrending = async () => {
        try {
            const { data } = await axios.get(TRENDING_URL);
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
            console.log(data);
        } catch (err) {
            console.error('Error loading trending', err);
        }
    }

    const getMovies = async (title) => {
        try {
            const searchQuery = `&language=en-US&query=${title}`;
            const { data } = await axios.get(`${SEARCH_MOVIES_URL}${searchQuery}`);
            data.results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
        } catch (err) {
            console.error('Error searching movies', err);
        }
    }

    const handleItemClicked = item => {
        console.log(item);
    }

    return (
        <>
            <Heading>{isTrending ? "Popular movies" : "Search results..."}</Heading>
            <List movies={movies} onItemClicked={handleItemClicked} />
        </>
    );
}

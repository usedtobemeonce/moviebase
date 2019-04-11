import React, { useContext, useState, useEffect } from 'react';
import queryString from 'query-string';

import Context from '../../state/context';
import Input from '../UI/Input/Input';

export default (props) => {
    const { className, history, location } = props;
    const { state, dispatch } = useContext(Context);
    const { searchTitle } = state;
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(searchTitle);
    }, [searchTitle])

    useEffect(() => {
        const searchQuery = queryString.parse(location.search);
        if (searchQuery.query && !searchTitle) {
            dispatch({ type: 'START_SEARCH', payload: searchQuery.query });
        }
    }, []);

    const handleSubmit = () => {
        dispatch({ type: 'START_SEARCH', payload: title });
        history.push(`/searchResults?query=${title}`);
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleChange = e => {
        setTitle(e.target.value);
    }

    return (
        <Input
            className={className}
            placeholder="Search..."
            aria-label="search"
            value={title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );
}
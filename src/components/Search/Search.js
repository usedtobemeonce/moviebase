import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react'

import Context from '../../state/context';

export default props => {
    const { state, dispatch } = useContext(Context);
    const { searchTitle } = state;
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(searchTitle);
    }, [searchTitle])

    const handleSubmit = () => {
        dispatch({ type: 'START_SEARCH', payload: title });
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
        <SearchField
            icon
            size="huge"
            placeholder='Search...'
            value={title}
            onChange={handleChange}
            onKeyPress={handleKeyPress} >
            <input />
            <Icon name='search' />
        </SearchField>
    );
}


const SearchField = styled(Input)`
    margin-top: 15px;
    input {
        color: white !important;
        border-color: #555 !important;
        background-color: #212121 !important;
    }
    ${Icon} {
        color: grey !important;
    }
`;
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from 'evergreen-ui';

const SearchField = styled(TextInput)`
    background-color: #212121 !important;
    font-size: calc(12px + .3vw) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    :focus{
        color: #03A9F4 !important;
        box-shadow: inset 0 0 2px rgba(67, 90, 111, 0.14), inset 0 0 0 1px #03A9F4, 0 0 0 3px rgba(16, 112, 202, 0.14) !important;
    }
`;

const search = props => {
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        props.onSearch(title);
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
            placeholder="Search movie titles..."
            value={title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            height={70}
            width="100%" />
    );
}

export default search;
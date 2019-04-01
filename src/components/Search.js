import React, { useState } from 'react';
import { SearchInput } from 'evergreen-ui';

const search = props => {

    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        props.onSearch(title);
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter' && title.trim()) {
            handleSubmit();
        }
    }

    const handleChange = e => {
        setTitle(e.target.value);
    }

    return (
        <SearchInput
            appearance="default"
            placeholder="Search movie titles..."
            value={title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            height={50} width="100%" />
    );
}

export default search;
import React, { useState } from 'react';
import Search from "../Search/Search";
import Results from "../Search/Results";

const home = props => {

    const [searchTitle, setSearchTitle] = useState('');

    const handleSearch = title => {
        console.log('enter pressed, title changed: ' + title);
        setSearchTitle(title);
    }

    return (
        <>
            <Search onSearch={handleSearch} />
            <Results {...props} searchTitle={searchTitle} />
        </>
    );
}

export default home;
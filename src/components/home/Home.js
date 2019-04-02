import React, { useState } from 'react';
import Search from "../search/Search";
import Results from "../search/Results";

const home = props => {

    const [searchTitle, setSearchTitle] = useState('');

    const handleSearch = title => {
        console.log('enter pressed, title changed: ' + title);
        setSearchTitle(title);
    }

    return (
        <>
            <Search onSearch={handleSearch} />
            <Results searchTitle={searchTitle} />
        </>
    );
}

export default home;
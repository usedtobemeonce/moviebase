import React from 'react';
import styled from 'styled-components';

// import Search from "../Search/Search";
import Results from "../Search/Results";

const Home = styled.div`
    margin: 0 20%;
    display: flex;
    flex-direction: column;
    @media (max-width: 1200px) {
        margin: 0 10%;
    }
    @media(max-width: 900px) {
        margin: 5px;
    }
`;

const home = props => {
    return (
        <Home>
            {/* <Search /> */}
            <Results {...props} />
        </Home>
    );
}

export default home;
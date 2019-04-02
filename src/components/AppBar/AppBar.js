import React from 'react';
import styled from 'styled-components';

const AppBar = styled.header`
    grid-area: header;
    background-color: #282c34;
    font-size: calc(10px + 1.3vmin);
    font-family: 'Russo One', sans-serif;
    color: white;
    padding: 20px;
    cursor: pointer;
    text-align: center;
`;

const appBar = () => {
    return (
        <AppBar>
            <h2>movie<span style={{ color: '#03A9F4' }}>base</span></h2>
        </AppBar>
    )
}

export default appBar;
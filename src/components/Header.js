import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    grid-area: header;
    background-color: #282c34;
    height: 70px;
    font-size: calc(10px + 1.3vmin);
    color: white;
    padding: 20px;
    cursor: pointer;
    text-align: center;
`;

const header = () => {
    return (
        <Header>
            <h2>moviebase</h2>
        </Header>
    )
}

export default header;
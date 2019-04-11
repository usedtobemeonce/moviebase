import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const home = props => {

    return (
        <Home>
            <h1>Welcome Home</h1>
            <Button>Test</Button>
        </Home>
    );
}

export default home;

const Home = styled.div`
    width: 100%;
    height: 500px;
`;
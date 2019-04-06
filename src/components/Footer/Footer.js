import React from 'react';
import styled from 'styled-components';

import Heading from '../UI/Header';

const Footer = styled.div`
    grid-area: footer;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
`;

export default function () {
    return (
        <Footer>
            <Heading>moviebase © 2019</Heading>
        </Footer>
    );
}
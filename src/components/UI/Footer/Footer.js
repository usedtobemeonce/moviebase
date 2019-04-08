import React from 'react';
import styled from 'styled-components';

import Heading from '../Header';

const Footer = styled.div`
    grid-area: footer;
    padding-top: 10px;
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
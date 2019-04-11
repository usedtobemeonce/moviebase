import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import moviebaseLogo from '../../assets/images/moviebase_logo.svg';

const logoComponent = ({ className }) => {

    return (
        <Logo className={className}>
            <Link to="/">
                <img src={moviebaseLogo} alt="moviebase logo" />
            </Link>
        </Logo>
    );
};

export default logoComponent;


const Logo = styled.div`
    grid-area: logo;
    cursor: pointer;
    width: 200px;
    transition: all 0.5s ease-in;
    @media (max-width: 900px) {
        margin: 0;
        transform: rotate(0);
        transition: all .5s ease-in;
        justify-self: center;
        margin: 2px 0;
    }
`;
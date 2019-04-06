import React, { useContext } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import moviebaseLogo from '../../assets/images/moviebase_logo.svg';
import Context from '../../state/context';

const logoComponent = ({ className }) => {

    const { dispatch } = useContext(Context);

    const handleLogoClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }

    return (
        <Logo onClick={handleLogoClicked} className={className}>
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
    margin-left: 40px;
    width: 150px;
    /* transition: transform .2s ease-in;
    transform: rotate(-2deg);
    :hover {
        transform: rotate(0);
    } */
    @media (max-width: 900px) {
        margin: 0;
        transform: rotate(0);
        transition: transform .2s ease-in;
        justify-self: center;
        margin: 2px 0;
    }
`;
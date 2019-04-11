import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from './Logo';
import Search from "../Search/Search";
import BurgerButton from './BurgerButton';

export default (props) => {
    const { isSmallScreen } = props;

    return (
        <AppBar>
            {isSmallScreen && <BurgerButton style={{ gridArea: 'burgerButton' }} />}
            <Logo />
            {!isSmallScreen && <StyledSearch style={{ gridArea: 'search' }} {...props} />}
            {!isSmallScreen &&
                <SignInButton variant="danger"><FontAwesomeIcon icon="sign-in-alt" /> Sign-In</SignInButton>
            }
        </AppBar>
    )
}

const AppBar = styled.header`
    grid-area: header;
    z-index: 100;
    background-color: #282c34;
    color: white;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 200px 1fr auto;
    grid-template-areas: 
        "logo auto avatar";
    align-items: center; 
    padding: 0 40px;
    @media (max-width: 900px) {
        grid-template-columns: 60px 200px;
        grid-template-areas:
         "burgerButton logo";
    }
`;

const StyledSearch = styled(Search)`
    justify-self: center;
    width: 50%;
    min-width: 400px;
`;

const SignInButton = styled(Button)`
    grid-area: avatar;
    justify-self: end;
`;
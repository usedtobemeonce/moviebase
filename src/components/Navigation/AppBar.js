import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';

import Logo from './Logo';
import Search from "../Search/Search";

export default () => {
    return (
        <AppBar>
            <Logo />
            <StyledSearch style={{ gridArea: 'search' }} />
            <SignInButton color="red"><Icon name="sign in" /> Sign-In</SignInButton>
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
    @media (max-width: 900px) {
        grid-template-areas:
         "logo";
    }
`;

const StyledSearch = styled(Search)`
    justify-self: center;
    width: 50%;
`;

const SignInButton = styled(Button)`
    grid-area: avatar;
    margin-right: 40px !important;
    justify-self: end;
`;
import React from 'react';
import styled from 'styled-components';
import { Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';

const AppBar = styled.header`
    grid-area: header;
    background-color: #282c34;
    color: white;
    padding: 20px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr auto;
    /* justify-content: center; */
    align-items: center;
`;

const Logo = styled.div`
    font-family: 'Russo One', sans-serif;
    font-size: calc(10px + 2vmin);
    cursor: pointer;
    margin-left: 20px;
    /* transition: transform .2s ease-in;
    -webkit-transform: rotate(-2deg);
    transform: rotate(-2deg);
    :hover {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    } */
`;

const Menu = styled.ul`
    list-style: none;
    margin-right: 20px;
`;

const MenuItem = styled(Button)`
    /* display: inline; */
    color: white;
    /* cursor: pointer; */
`;

const MenuItemLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const appBar = ({ history }) => {

    const handleClick = () => {
        history.push('/');
    }

    return (
        <AppBar>
            <Logo big onClick={handleClick}>movie<span style={{ color: '#ea3530' }}>base</span></Logo>

            <div></div>

            <Menu>
                <MenuItem marginRight={5} appearance="minimal" intent="none" height={42}><MenuItemLink to="/">Home</MenuItemLink></MenuItem>
                <MenuItem marginRight={5} appearance="minimal" intent="none" height={42}>About</MenuItem>
                <MenuItem marginRight={5} appearance="minimal" intent="none" height={42}>Contacts</MenuItem>
                <MenuItem marginRight={5} appearance="minimal" intent="none" height={42}>Login</MenuItem>
            </Menu>
        </AppBar>
    )
}

export default appBar;
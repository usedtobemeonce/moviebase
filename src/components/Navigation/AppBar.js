import React, { useContext } from 'react';
import styled from 'styled-components';

import BurgerButton from './BurgerButton';
import menuItems from './menuItems';
import Menu from './Menu';
import Logo from './Logo';
import Context from '../../state/context';

const AppBar = styled.header`
    grid-area: header;
    background-color: #282c34;
    color: white;
    padding: 20px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 
        "logo . menu";
    align-items: center; 
    @media (max-width: 900px) {
        grid-template-areas:
         "burger logo";
    }
`;

const appBar = () => {
    const { state, dispatch } = useContext(Context);
    const { isSmallScreen } = state;

    const handleBurgerClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: true });
    }

    return (
        <AppBar>
            <Logo />
            <div></div>
            {!isSmallScreen && <Menu menuItems={menuItems} />}
            <BurgerButton onClick={handleBurgerClicked} />
        </AppBar>
    )
}

export default appBar;
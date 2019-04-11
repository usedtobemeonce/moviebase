import React, { useContext } from 'react';
import styled from 'styled-components';

import Context from '../../state/context';

const burgerButton = () => {
    const { dispatch } = useContext(Context);

    const handleBurgerClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: true });
    }

    return (
        <Burger onClick={handleBurgerClicked}>
            <div></div>
            <div></div>
            <div></div>
        </Burger>
    );
}

export default burgerButton;

const Burger = styled.div`
    cursor: pointer;
    margin-left: 10px;
    :hover {
        background-color: rgba(67, 90, 111, 0.06);
        div {
            background-color: #ea3530;
        }
    }
    div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 5px 0;
        
    }
`;
import React from 'react';
import styled from 'styled-components';

const burgerButton = () => {

    const handleBurgerClicked = () => {
        console.log('burger button clicked');
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
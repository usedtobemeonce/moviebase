import React from 'react';
import styled from 'styled-components';

const Burger = styled.div`
    grid-area: burger;
    cursor: pointer;
    margin-left: 10px;
    display: none;
    div {
        width: 30px;
        height: 3px;
        background-color: white;
        margin: 5px 0;
    }
    @media (max-width: 900px) {
        display: inline-block;
    }
`;

const burgerButton = (props) => {

    const handleBurgerClicked = () => {
        props.onClick();
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
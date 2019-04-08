import React from "react";
import styled from 'styled-components';

const Backdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    transition: transform 0.3s ease-out;
`;

export default function (props) {

    const handleBackdropClick = () => {
        props.onBackdropClicked();
    }

    return (<Backdrop onClick={handleBackdropClick} />);
}
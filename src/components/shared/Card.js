import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const card = props => {
    const { className, id, imageUrl, title, onClick } = props;

    return (
        <StyledCard key={id} className={className} onClick={onClick}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} />
            <Card.Body>
                <Title>{title}</Title>
            </Card.Body>
        </StyledCard>
    )
}

export default card;

const StyledCard = styled(Card)`
    background-color: #282c34;
    color: white;
    height: auto;
    cursor: pointer;
    transition: transform .5s;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 2s cubic-bezier(.165, .84, .44, 1);
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .15);
        content: '';
        opacity: 0;
        z-index: -1;
    }

    :hover, :focus {
        transform: scale3d(1.006, 1.006, 1);
        &::after {
            opacity: 1;
        }
    }
`;

const Title = styled(Card.Title)`
    text-transform: uppercase;
    text-align: center;
`;
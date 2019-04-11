import React from 'react';
import styled from 'styled-components';

import Poster from './Image';
import ImageOverlay from './ImageOverlay';

export default function (props) {
    const { item } = props;
    const posterUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    const overview = item.overview.split(' ').slice(0, 10).join(' ');

    const title = (!item.original_title || 0 === item.original_title.length)
        ? (!item.original_name || 0 === item.original_name.length)
            ? ''
            : item.original_name
        : item.original_title;

    const handleItemClicked = () => {
        props.onItemClicked(item.id);
    }

    return (
        <Item onClick={handleItemClicked}>
            <Poster src={posterUrl} alt={title} />
            <ImageOverlay>
                <ItemInfo>
                    <Title>{title}</Title>
                    <Overview>{overview}...</Overview>
                </ItemInfo>
            </ImageOverlay>
        </Item>
    );
}

const Overview = styled.p`
    @media (max-width: 900px) {
        display: none;
    }
`;

const Title = styled.h3`
    font-size: calc(12px + 1vw);
`;

const ItemInfo = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    top: 75%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    opacity: 0;
`;

const Item = styled.div`
    position: relative;
    margin: 5px;
    cursor: pointer;
    &:hover ${ImageOverlay} {
        background-color: rgba(0, 0, 0, .8);
    }
    &:hover ${ItemInfo} {
        opacity: 1;
    }
`;
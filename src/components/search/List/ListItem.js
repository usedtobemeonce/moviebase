import React from 'react';
import styled from 'styled-components';

export default function (props) {
    const { movie } = props;
    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const overview = movie.overview.split(' ').slice(0, 10).join(' ');

    const title = (!movie.original_title || 0 === movie.original_title.length)
        ? (!movie.original_name || 0 === movie.original_name.length)
            ? ''
            : movie.original_name
        : movie.original_title;

    const handleItemClicked = () => {
        console.log(props);
        props.onItemClicked(movie);
    }

    return (
        <Item onClick={handleItemClicked}>
            <Poster src={posterUrl} alt={title} />
            <Overlay>
                <ItemInfo>
                    <Title>{title}</Title>
                    <Overview>{overview}...</Overview>
                </ItemInfo>
            </Overlay>
        </Item>
    );
}

const Overview = styled.p`
    @media (max-width: 769px) {
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

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition: .5s ease;
    background-color: rgba(0, 0, 0, 0);
    z-index: -3.0;
`;

const Poster = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
`;

const Item = styled.div`
    position: relative;
    margin: 5px;
    cursor: pointer;
    &:hover ${Overlay} {
        background-color: rgba(0, 0, 0, .8);
    }
    &:hover ${ItemInfo} {
        opacity: 1;
    }
`;
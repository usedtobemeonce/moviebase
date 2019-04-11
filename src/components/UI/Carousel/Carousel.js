import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

import Header from '../Header';

const carousel = props => {

    const { movies, className } = props;

    const handleCarouselItemClick = (movieId) => {
        props.onClick(movieId);
    }

    return (
        <StyledCarousel
            fade
            keyboard
            className={className}
            indicators={false}
        >
            {movies.map(movie => (
                <Carousel.Item key={movie.id} onClick={() => handleCarouselItemClick(movie.id)}>
                    <img
                        className="d-block w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt="First slide"
                    />
                    <StyledCarouseCaption>
                        <Header big>{movie.title}</Header>
                        <Header>{movie.overview.split(' ').slice(0, 15).join(' ')}...</Header>
                    </StyledCarouseCaption>
                </Carousel.Item>
            ))}
        </StyledCarousel>
    );
}

export default carousel;

const StyledCarousel = styled(Carousel)`
    :hover {
        cursor: pointer;
        img {
            -webkit-filter: blur(2px);
            filter: blur(2px);
            transition: .3s filter linear;
        }
    }
`;

const StyledCarouseCaption = styled(Carousel.Caption)`
    top: 25%;


    ${Header} {
        text-shadow: 0px 0px 20px #000;
    }

    @media (max-width: 900px) {
        top: 10%;

        p {
            display: none;
        }
    }
`;
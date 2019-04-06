import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Segment } from 'semantic-ui-react';

import Header from '../UI/Header';

export default ({ className, title, externalIds, tagline, genres, overview }) => {

    let icons = null;
    if (externalIds) {
        icons = (
            <Icons>
                {externalIds.facebook_id &&
                    <a href={`https://www.facebook.com/${externalIds.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Icon name="facebook official" size="big" />
                    </a>
                }
                {externalIds.instagram_id &&
                    <a href={`https://www.instagram.com/${externalIds.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Icon name="instagram" size="big" />
                    </a>
                }
                {externalIds.twitter_id &&
                    <a href={`https://twitter.com/${externalIds.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Icon name="twitter" size="big" />
                    </a>
                }
                {externalIds.imdb_id &&
                    <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Icon name="imdb" size="big" />
                    </a>
                }
            </Icons>
        );
    }

    return (
        <MovieDetails className={className}>
            <Header big as="h1">{title}</Header>
            <Segment inverted raised>
                <Header as="h3">{tagline}</Header>
            </Segment>
            {icons}
            <p>{overview}</p>
            <Genres>
                {genres.map(genre => (
                    <Button basic inverted key={genre.id} color="red">
                        {genre.name}
                    </Button>
                ))}
            </Genres>
        </MovieDetails>
    );
}

const MovieDetails = styled.div`
    grid-area: details;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
`;

const Genres = styled.div`
    cursor: pointer;
    margin: 10px 0;
    align-self: end !important;
`;

const Icons = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    a {
        color: inherit;
        text-decoration: none;
        :hover {
            color: #EA3530;
        }
    }
    i {
        transition: .2s ease-in;
        :hover {
            font-size: calc(12px + 3vw);
        }
    }
`;
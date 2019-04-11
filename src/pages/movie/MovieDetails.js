import React from 'react';
import styled from 'styled-components';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Panel from '../../components/shared/Panel/Panel';

import Header from '../../components/shared/Header';

export default ({ className, title, externalIds, tagline, genres, overview }) => {

    let icons = null;
    if (externalIds) {
        icons = (
            <Icons>
                {externalIds.facebook_id &&
                    <a href={`https://www.facebook.com/${externalIds.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon fixedWidth size="2x" icon={['fab', 'facebook']} />
                    </a>
                }
                {externalIds.instagram_id &&
                    <a href={`https://www.instagram.com/${externalIds.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon fixedWidth size="2x" icon={['fab', 'instagram']} />
                    </a>
                }
                {externalIds.twitter_id &&
                    <a href={`https://twitter.com/${externalIds.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon fixedWidth size="2x" icon={['fab', 'twitter']} />
                    </a>
                }
                {externalIds.imdb_id &&
                    <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon fixedWidth size="2x" icon={['fab', 'imdb']} />
                    </a>
                }
            </Icons>
        );
    }

    return (
        <MovieDetails className={className}>
            <Header big as="h1">{title}</Header>
            <Panel>
                <Header as="h3">{tagline}</Header>
            </Panel>
            {icons}
            <p>{overview}</p>
            <Genres>
                <ButtonToolbar aria-label="Button group with links to all trailers and videos">
                    <ButtonGroup aria-label="Link to trailers and video.">
                        {genres.map(genre => (
                            <Button variant="dark" key={genre.id}>{genre.name}</Button>
                        ))}
                    </ButtonGroup>
                </ButtonToolbar>
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
    svg {
        transition: .2s ease-in;
        :hover {
            font-size: calc(12px + 3vw);
        }
    }
`;
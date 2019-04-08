import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

import EmbeddedPlayer from '../UI/VideoPlayer/EmbeddedPlayer';
import Header from '../UI/Header';

export default ({ movieVideos, className }) => {

    const [movieVideoId, setMovieVideoId] = useState(null);

    useEffect(() => {
        if (movieVideos && movieVideos.length > 0) {
            setMovieVideoId(movieVideos[0].key);
        }
    }, [movieVideos]);

    let content = null;
    if (movieVideoId) {
        content = (
            <div className={className}>
                <Header as="h2">Trailers and videos</Header>
                <EmbeddedPlayer movieVideoId={movieVideoId} />
                <VideoButtons fluid color="black">
                    {movieVideos.map((movieVideo, index) => (
                        <VideoButton
                            key={index}
                            onClick={() => setMovieVideoId(movieVideo.key)}
                        >
                            {index + 1}
                        </VideoButton>
                    ))}
                </VideoButtons>
            </div>
        );
    }

    return (content);
}

const VideoButtons = styled(Button.Group)`
    flex-wrap: wrap;
`;

const VideoButton = styled(Button)`
    flex: none !important;
`;
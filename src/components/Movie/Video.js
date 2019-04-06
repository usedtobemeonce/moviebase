import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

import EmbeddedPlayer from '../UI/EmbeddedPlayer';
import Header from '../UI/Heading';

const video = ({ movieVideos, className }) => {

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
                <Button.Group fluid color="black">
                    {movieVideos.map((movieVideo, index) => (
                        <Button
                            key={index}
                            onClick={() => setMovieVideoId(movieVideo.key)}
                        >
                            {index}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        );
    }

    return (content);
}

export default video;
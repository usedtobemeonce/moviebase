import React from 'react';
import { Embed } from 'semantic-ui-react';

const youtubePlayer = ({ className, movieVideoId, autoplay, active }) => {

    return (
        <Embed
            id={movieVideoId}
            className={className}
            autoplay={autoplay}
            brandedUI
            placeholder={`https://img.youtube.com/vi/${movieVideoId}/maxresdefault.jpg`}
            active={active}
            source="youtube" />
    );
}

export default youtubePlayer;
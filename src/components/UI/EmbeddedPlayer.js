import React from 'react';
import { Embed } from 'semantic-ui-react';

const youtubePlayer = ({ className, movieVideoId, autoplay, active, source }) => {

    return (
        <Embed
            id={movieVideoId}
            className={className}
            autoplay={autoplay}
            brandedUI
            placeholder={`https://img.youtube.com/vi/${movieVideoId}/hqdefault.jpg`}
            active={active}
            source={source || "youtube"} />
    );
}

export default youtubePlayer;
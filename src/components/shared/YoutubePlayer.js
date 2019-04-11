import React from 'react';
import styled from 'styled-components';
import YoutubePlayer from 'react-youtube';

const youtubePlayer = ({ className, movieVideoId, autoplay, active }) => {

    const opts = {
        playerVars: {
            autoplay: autoplay,
        }
    };

    return (
        <StyledVideoPlayerWrapper>
            < StyledVideoPlayer
                videoId={movieVideoId}
                className={className}
                opts={opts}
            />
        </StyledVideoPlayerWrapper>
    );
}

export default youtubePlayer;

const StyledVideoPlayerWrapper = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    margin-bottom: 10px;
`;

const StyledVideoPlayer = styled(YoutubePlayer)`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
`;
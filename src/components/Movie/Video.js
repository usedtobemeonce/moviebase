import React, { useState, useEffect } from 'react';

import YoutubePlayer from '../UI/VideoPlayer/YoutubePlayer';
import Header from '../UI/Header';
import Pagination from '../UI/Pagination/Pagination';

export default ({ movieVideos, className }) => {

    const [movieVideoId, setMovieVideoId] = useState(null);

    useEffect(() => {
        if (movieVideos && movieVideos.length > 0) {
            setMovieVideoId(movieVideos[0].key);
        }
    }, [movieVideos]);

    const handlePageChanged = page => {
        setMovieVideoId(movieVideos[page - 1].key);
    }

    let content = null;
    if (movieVideoId) {
        content = (
            <div className={className}>
                <Header as="h2">Trailers and videos</Header>
                <YoutubePlayer movieVideoId={movieVideoId} />
                <Pagination
                    page={1}
                    totalPages={movieVideos.length}
                    totalResults={movieVideos.length}
                    onChange={handlePageChanged} />
            </div>
        );
    }

    return (content);
}
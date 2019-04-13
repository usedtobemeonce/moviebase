import React from 'react';
import styled from 'styled-components';

import GoogleMap from '../components/watch/CinemaMap';
import Header from '../components/shared/Header';

const Watch = props => {
    return (
        <>
            <WatchWrapper>
                <Header big>Nearby cinemas</Header>
                <Header>Zoom in and out on the map to find nearby cinemas.</Header>
            </WatchWrapper>

            <GoogleMapWrapper>
                <GoogleMap />
            </GoogleMapWrapper>
        </>
    )
}

export default Watch;

const WatchWrapper = styled.div`
    margin: 0 5%;
`;

const GoogleMapWrapper = styled.div`
    height: 80%;
`;
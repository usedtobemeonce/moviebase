import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from '../UI/Header';
import Image from '../UI/Image/Image';
import CustomLink from '../UI/CustomLink';
import Panel from '../UI/Panel/Panel';

const cast = ({ className, cast }) => {

    const [showCastCount, setShowCastCount] = useState(0);
    const [showCast, setShowCast] = useState(false);

    const handleShowCast = () => {
        if (showCast) {
            setShowCastCount(cast.length > 15 ? 15 : cast.length);
        } else {
            setShowCastCount(cast.length);
        }
        setShowCast(!showCast);
    }

    useEffect(() => {
        handleShowCast();
    }, [cast])

    let allCast = (
        cast.slice(0, showCastCount).map(actor => (
            <React.Fragment key={actor.id}>
                <StyledImageCol>
                    <Image src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`} />
                </StyledImageCol>
                <StyledNameCol>
                    <Link to="/">{actor.name}</Link>
                </StyledNameCol>
                <StyledAs>
                    {' '}-{' '}
                </StyledAs>
                <StyledCharacterCol>
                    {actor.character}
                </StyledCharacterCol>
            </React.Fragment>
        ))
    );

    return (
        <div className={className}>
            <Header as="h2">Cast</Header>
            <CustomLink onClick={handleShowCast}>
                {showCast
                    ? `Show less`
                    : `Showing - ${showCastCount}. Click to show all ${cast.length} actors.`
                }
            </CustomLink>
            <StyledCast>
                {allCast}
            </StyledCast>
        </div>
    )
}

export default cast;

const StyledCast = styled(Panel)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    max-width: 800px;
    max-height: 500px;
    overflow-y: auto;
`;

const StyledImageCol = styled.div`
    margin: 10px 0;
    flex: 1 0 10%;
`;

const StyledNameCol = styled.div`
    padding: 0 10px;
    margin: 10px 0;
    flex: 1 0 35%;
`;

const StyledAs = styled(Header)`
    padding: 0 10px;
    flex: 1 0 5%;
`;

const StyledCharacterCol = styled(Header)`
    padding: 0 10px;
    flex: 1 0 45%;
`;
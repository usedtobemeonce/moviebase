import React, { useContext } from 'react';
import styled from 'styled-components';

import Context from '../../state/context';
import Header from '../UI/Header';
import Pagination from '../UI/Pagination';
import Grid from '../UI/MovieGrid/Grid';

export default ({ resultsTitle, resultsSubtitle, moviesList, totalPages, history, page }) => {

    const { dispatch } = useContext(Context);

    const handleItemClicked = itemId => {
        dispatch({ type: 'SELECT_MOVIE', payload: itemId })
        history.push(`/movie/${itemId}`);
    }

    const handlePageChange = (e, { activePage }) => {
        dispatch({ type: 'CHANGE_PAGE', payload: activePage });
        dispatch({ type: 'CHANGE_PAGE_BY', payload: true });
    }

    return (
        <Container>
            <StyledHeader>
                <Header big as="h1">{resultsTitle}</Header>
                <Header as="h3">{resultsSubtitle}</Header>
            </StyledHeader>
            <Grid items={moviesList} onItemClicked={handleItemClicked} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    )
}

const Container = styled.div`
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    @media (max-width: 1200px) {
        margin: 5px;
    }
`;

const StyledHeader = styled.div`
    justify-self: center;
    margin: 20px;
`;
import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 25%);
`;

export default function ({ movies }) {

    const handleItemClicked = movie => {
        console.log('you clicked on: ', movie);
    }

    return (
        <List>
            {movies.map(movie => {
                return <ListItem key={movie.id} movie={movie} onItemClicked={handleItemClicked} />
            })}
        </List>
    );
}
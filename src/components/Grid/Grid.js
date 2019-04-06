import React from 'react';
import styled from 'styled-components';

import GridItem from './GridItem';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 25%);
`;

export default function (props) {
    const { items } = props;

    const handleItemClicked = itemId => {
        props.onItemClicked(itemId);
    }

    return (
        <Grid>
            {items.map(item => {
                return <GridItem key={item.id} item={item} onItemClicked={handleItemClicked} />
            })}
        </Grid>
    );
}
import React from 'react';
import styled from 'styled-components';

import GridItem from './GridItem';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 20%);
    @media (max-widht: 1200px) {
        grid-template-columns: repeat(auto-fill, 25%);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(auto-fill, 33%);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, 50%);
    }
`;

export default function (props) {
    const { items } = props;

    const handleItemClicked = itemId => {
        props.onItemClicked(itemId);
    }

    return (
        <Grid>
            {items.map(item => {
                return <GridItem
                    key={item.id}
                    item={item}
                    onItemClicked={handleItemClicked}
                />
            })}
        </Grid>
    );
}
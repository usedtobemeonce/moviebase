import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'semantic-ui-react';

export default props => {
    const { totalPages, page } = props;

    return (
        <StyledPagination
            defaultActivePage={page}
            pointing
            secondary
            boundaryRange={0}
            siblingRange={1}
            onPageChange={props.onPageChange}
            totalPages={totalPages}
        />
    );
}

const StyledPagination = styled(Pagination)`
    background-color: #282c34 !important;
    margin: 0 5px !important;
    a {
        color: white !important;
        &.active {
            color: #EA3530 !important;
            border-color: #EA3530 !important;
        }
    }
`;
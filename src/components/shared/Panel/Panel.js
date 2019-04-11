import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const panel = ({ className, children }) => {

    return (
        <StyledPanel className={className}>
            {children}
        </StyledPanel>
    );
}

export default panel;

const StyledPanel = styled(Card)`
    background-color: #1b1c1d;
    padding: 15px;
`;
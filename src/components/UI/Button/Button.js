import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const button = props => {

    const { children, className, variant, size, onClick } = props;

    return (
        <StyledButton
            className={className}
            variant={variant}
            size={size}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    )
}

export default button;

const StyledButton = styled(Button)`
        border-radius: 2px;
        padding: 10px 20px;

        &.btn-danger {
            background-color: #ea3530;
        }

        &.btn-outline-danger:hover {
            background-color: #ea3530;
        }
`;
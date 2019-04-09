import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const customLink = props => {
    const { onClick, children, to } = props;
    const isLink = to ? true : false;

    const content = (
        isLink
            ? <Link to={to} {...props}>{children}</Link>
            : <a onClick={evt => evt.preventDefault()} {...props}>
                {children}
            </a>
    );

    return (
        <StyledLink onClick={evt => {
            evt.preventDefault();
            onClick && onClick();
        }}>
            {content}
        </StyledLink>
    );
}

export default customLink;

const StyledLink = styled.div`
    ${Link} {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        margin: 10px;
        :hover {
            color: #ea3530;
        }
    }
    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        margin: 10px;
        :hover {
            color: #ea3530;
        }
    }
`;

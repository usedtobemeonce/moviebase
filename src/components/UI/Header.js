import styled, { css } from 'styled-components';

export default styled.div`
    color: white !important;
    margin: 10px 0;
    ${props => props.big && css`
        font-weight: 700;
        font-size: calc(12px + 2.5vw);
    `}
`;
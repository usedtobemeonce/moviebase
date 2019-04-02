import styled, { css } from 'styled-components';

export default styled.div`
    font-size: calc(12px + 1vw);
    ${props => props.big && css`
        font-size: calc(12px + 2.5vw);
    `}
    /* margin: 10px 5px; */
`;
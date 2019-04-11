import styled, { css } from 'styled-components';
// import { Header } from 'semantic-ui-react';

export default styled.div`
    color: white !important;
    margin: 10px 0;
    ${props => props.big && css`
        font-size: calc(12px + 2.5vw);
    `}
`;
import styled, { css } from 'styled-components';
import { Header } from 'semantic-ui-react';

export default styled(Header)`
    color: white !important;
    margin: 10px 0;
    /* font-size: calc(12px + 1vw); */
    ${props => props.big && css`
        font-size: calc(12px + 3vw);
    `}
`;
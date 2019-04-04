import React, { useContext } from "react";
import styled, { css } from 'styled-components';

import menuItems from './menuItems';
import Menu from './Menu';
import Logo from './Logo';
import Context from '../../state/context';

const SideBar = styled.aside`
    width: 300px;
    max-width: 70%;
    height: 100%;
    background-color: #212121;
    box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;
    overflow-y: auto;
    ${props => props.show && css`
        transform: translateX(0);
    `}
`;

const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const LogoWrapper = styled(Logo)`
    align-self: center;
`;

const StyledMenu = styled(Menu)`
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-top: 40px;
    border-top: 1px solid #555;
`;

const sidebar = (props) => {
    const { state } = useContext(Context);
    const { isSmallScreen, isSideBarOpen } = state;

    return (
        <SideBar show={isSmallScreen && isSideBarOpen}>
            <SideBarWrapper>
                <LogoWrapper />
                <StyledMenu isSideBarMenu menuItems={menuItems} />
            </SideBarWrapper>
        </SideBar>
    );
};

export default sidebar;
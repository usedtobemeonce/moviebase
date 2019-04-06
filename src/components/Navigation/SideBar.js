import React, { useContext } from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import Context from '../../state/context';
import menuItems from './menuItems';

export default (props) => {
    const { state, dispatch } = useContext(Context);
    const { isSmallScreen, isSideBarOpen } = state;

    const handleMenuItemClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }

    return (
        <SideBar show={isSmallScreen && isSideBarOpen}>
            <SideBarWrapper>
                <LogoWrapper />

                <StyledMenu>
                    {menuItems.map(item =>
                        <StyledMenuItem
                            key={item.id}
                            to={item.link}
                            onClick={handleMenuItemClicked}
                        >
                            {item.text}
                        </StyledMenuItem>
                    )}
                </StyledMenu>

            </SideBarWrapper>
        </SideBar>
    );
};

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

const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-top: 40px;
    border-top: 1px solid #555;
    color: white !important;
`;

const StyledMenuItem = styled(Link)`
    display: block;
    padding: 15px;
    color: #ea3530;
    font-size: calc(12px + 1vw);
    :hover {
        color: #ea3530;
        background-color: rgba(67, 90, 111, 0.06);
    }
`;
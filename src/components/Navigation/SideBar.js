import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import menuItems from './menuItems';
import Context from '../../state/context';
import Backdrop from '../UI/Backdrop/Backdrop';

export default ({ className, isSmallScreen }) => {
    const { state, dispatch } = useContext(Context);
    const { isSideBarOpen } = state;

    const handleBackdropClicked = () => {
        isSmallScreen && hideSideBar();
    }

    const handleMenuItemClick = () => {
        isSmallScreen && hideSideBar();
    }

    const hideSideBar = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }

    let content = null;

    content = (
        <>
            <Backdrop show={isSideBarOpen} onBackdropClicked={handleBackdropClicked} />
            <SideBar className={className} isSmallScreen={isSmallScreen} isSideBarOpen={isSideBarOpen}>
                <SideBarWrapper>
                    <StyledMenu>
                        {menuItems.map(item =>
                            <StyledMenuItem
                                key={item.id}
                                onClick={handleMenuItemClick}
                                to={item.link}
                            >
                                <Icon name={item.icon} style={{ marginRight: '24px' }} />
                                {' '}
                                {item.text}
                            </StyledMenuItem>
                        )}
                    </StyledMenu>
                    <Button color="red">Sign In</Button>
                </SideBarWrapper>
            </SideBar>
        </>
    );

    return (content);
};

const SideBar = styled.aside`
    ${props => !props.isSmallScreen && css`
        width: 250px;
        height: 100%;
        background-color: #212121;
        box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.3);
        transform: translateX(0);
        transition: transform 0.3s ease-in;
        -webkit-transition: transform 0.3 ease-in;
    `}
    ${props => props.isSmallScreen && css`
        position: fixed;
        width: 250px;
        max-width: 70%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        background-color: #212121;
        box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease-out;
        -webkit-transition: transform 0.3 ease-out;
        transform: translateX(0);
    `}
    ${props => props.isSmallScreen && !props.isSideBarOpen && css`
        transform: translateX(-100%);
    `}
`;

const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    color: white !important;
    margin: 10px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
`;

const StyledMenuItem = styled(Link)`
    display: block;
    padding: 15px 24px;
    color: white;
    font-size: 16px;
    :hover {
        color: #ea3530;
        background-color: rgba(67, 90, 111, 0.06);
    }
`;
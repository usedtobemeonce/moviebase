import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import menuItems from './menuItems';
import Context from '../../state/context';
import Backdrop from '../UI/Backdrop/Backdrop';

export default ({ className, isSmallScreen, location }) => {
    const { state, dispatch } = useContext(Context);
    const { isSideBarOpen } = state;

    const handleBackdropClicked = () => {
        isSmallScreen && hideSideBar();
    }

    const handleMenuItemClick = link => {
        if (location.pathname !== link) {
            dispatch({ type: 'CHANGE_PAGE', payload: 1 });
            dispatch({ type: 'CHANGE_PAGE_BY', payload: true });
        }
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
                                onClick={() => handleMenuItemClick(item.link)}
                                exact
                                activeClassName="is-active"
                                to={item.link}>
                                <FontAwesomeIcon fixedWidth icon={item.icon} style={{ marginRight: '24px' }} />
                                {' '}
                                {item.text}
                            </StyledMenuItem>
                        )}
                    </StyledMenu>
                    <Button variant="danger"><FontAwesomeIcon icon="sign-in-alt" /> Sign In</Button>
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
        height: 100vh;
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
    .is-active {
        color: #ea3530;
        background-color: rgba(67, 90, 111, 0.3);
    }
`;

const StyledMenuItem = styled(NavLink)`
    display: block;
    padding: 15px 24px;
    color: white;
    font-size: 16px;
    text-decoration: none !important;
    :hover {
        color: #ea3530;
        background-color: rgba(67, 90, 111, 0.5);
        text-decoration: none !important;
    }
`;
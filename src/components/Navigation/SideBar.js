import React from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import menuItems from './menuItems';

export default ({ className, isSmallScreen }) => {

    let content = null;

    if (!isSmallScreen) {
        content = (
            <SideBar className={className} isSmallScreen={isSmallScreen}>
                <SideBarWrapper>
                    <StyledMenu>
                        {menuItems.map(item =>
                            <StyledMenuItem
                                key={item.id}
                                to={item.link}
                            >
                                <Icon name={item.icon} style={{ marginRight: '24px' }} />
                                {' '}
                                {item.text}
                            </StyledMenuItem>
                        )}
                    </StyledMenu>
                    <hr style={{ margin: '10px' }} />
                    <Button color="red">Sign In</Button>
                </SideBarWrapper>
            </SideBar>
        );
    }

    return (content);
};

const SideBar = styled.aside`
    width: 250px;
    height: 100%;
    background-color: #212121;
    box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
    transform: translateX(0);
    transition: transform 0.3s ease-in;
    -webkit-transition: transform 0.3 ease-in;
    /* ${props => props.isSmallScreen && css`
        transform: translateX(-100%);
        transition: transform 0.3s ease-out;
        -webkit-transition: transform 0.3 ease-out;
    `} */
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
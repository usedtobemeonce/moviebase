import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import menuItems from './menuItems';

export default ({ className }) => {
    return (
        <SideBar className={className}>
            <SideBarWrapper>
                <StyledMenu>
                    {menuItems.map(item =>
                        <StyledMenuItem
                            key={item.id}
                            to={item.link}
                        >
                            <Icon name={item.icon} />
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
};

const SideBar = styled.aside`
    width: 250px;
    height: 100%;
    background-color: #212121;
    box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
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
`;

const StyledMenuItem = styled(Link)`
    display: block;
    padding: 15px 30px;
    color: white;
    text-transform: uppercase;
    :hover {
        color: #ea3530;
        background-color: rgba(67, 90, 111, 0.06);
    }
`;
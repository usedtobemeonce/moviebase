import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'

import Context from '../../state/context';

export default ({ menuItems, className }) => {

    const { state, dispatch } = useContext(Context);
    const { isSideBarOpen } = state;

    const handleMenuItemClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }

    return (
        <Menu className={className}>
            {menuItems.map(item =>
                <MenuItem
                    key={item.id}
                    transparent={(item.isTransparent || isSideBarOpen) ? 1 : 0}
                    color={(item.color && !isSideBarOpen) ? item.color : null}
                    onClick={() => handleMenuItemClicked()}>
                    <MenuItemLink transparent={(item.isTransparent && isSideBarOpen) ? 1 : 0} to={item.link}>
                        {!item.isTransparent && <Icon name="play" size="small" />}
                        {item.text}
                    </MenuItemLink>
                </MenuItem>
            )}
        </Menu>
    );
}

const Menu = styled.div`
    grid-area: menu;
    margin-right: 20px;
`;

const MenuItem = styled(Button)`
    text-transform: uppercase !important;
    ${props => props.transparent && css`
        background: transparent !important;
        color: white !important;
    `}
`;

const MenuItemLink = styled(Link)`
    color: inherit;
    :hover, :active, :focus {
        color: white !important;
    }
    ${props => props.transparent && css`
        :hover, :active, :focus {
            color: #ea3530 !important;
        }
    `}
`;
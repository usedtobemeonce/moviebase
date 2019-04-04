import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';

import Context from '../../state/context';

const Menu = styled.div`
    grid-area: menu;
    margin-right: 20px;
`;

const MenuItem = styled(Button)`
    color: white;
`;

const MenuLinkItem = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-variant-caps: small-caps;
`;

const menuComponent = ({ menuItems, isSideBarMenu, className }) => {

    const { dispatch } = useContext(Context)

    const handleMenuItemClicked = () => {
        dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }

    return (
        <Menu className={className}>
            {menuItems.map(item => (
                <MenuItem
                    key={item.id}
                    marginRight={5}
                    appearance={(!isSideBarMenu && item.appearance) || "minimal"}
                    intent={item.intent || "danger"}
                    height={42}
                    iconBefore={item.iconBefore || null}
                    onClick={() => handleMenuItemClicked()}
                >
                    <MenuLinkItem to={item.link}>
                        {item.text}
                    </MenuLinkItem>
                </MenuItem>
            ))}
        </Menu>
    );
}

export default menuComponent;
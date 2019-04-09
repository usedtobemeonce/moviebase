import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import Header from '../Header';
import CustomLink from '../CustomLink';

const Footer = styled.footer`
    grid-area: footer;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    background-color: #282c34;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
    z-index: 200;
`;

const FooterMenuWrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const FooterMenu = styled.div`
    justify-self: center;
    margin: 10px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        color: inherit;
    }
`;

const FooterSocialMedia = styled.div`
    align-items: center;
    justify-self: center;
    text-align: center;
    margin: 10px 50px;
`;

const SocialMediaLinks = styled.div`
    display: flex;
`;

export default function () {
    return (
        <Footer>
            <FooterMenuWrapper>
                <FooterMenu>
                    <CustomLink to="/">About</CustomLink>
                    <CustomLink to="/">Contacts</CustomLink>
                    <CustomLink to="/">FAQ</CustomLink>
                </FooterMenu>
                <FooterSocialMedia>
                    <Header>Follow us on social media</Header>
                    <SocialMediaLinks>
                        <CustomLink><Icon name="facebook official" size="big" /></CustomLink>
                        <CustomLink><Icon name="instagram" size="big" /></CustomLink>
                        <CustomLink><Icon name="twitter" size="big" /></CustomLink>
                        <CustomLink><Icon name="youtube" size="big" /></CustomLink>
                    </SocialMediaLinks>
                </FooterSocialMedia>
            </FooterMenuWrapper>
            <Header>moviebase © 2019</Header>
        </Footer>
    );
}
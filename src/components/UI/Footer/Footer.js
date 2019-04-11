import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../Header';
import CustomLink from '../CustomLink';

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
                        <FontAwesomeIcon fixedWidth size="lg" icon={['fab', 'facebook']} />
                        <FontAwesomeIcon fixedWidth size="lg" icon={['fab', 'instagram']} />
                        <FontAwesomeIcon fixedWidth size="lg" icon={['fab', 'twitter']} />
                        <FontAwesomeIcon fixedWidth size="lg" icon={['fab', 'youtube']} />
                    </SocialMediaLinks>
                </FooterSocialMedia>
            </FooterMenuWrapper>
            <Header>moviebase © 2019</Header>
        </Footer>
    );
}

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
    justify-content: center;
    svg {
        :hover {
            color: #ea3530;
        }
    }
`;
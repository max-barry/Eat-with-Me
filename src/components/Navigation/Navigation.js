import React from 'react';
import {
    NavigationContainer,
    NavigationList,
    NavigationListItem,
    NavigationLogoContainer
} from './Navigation.styles';

const Navigation = ({ items = [] }) => (
    <NavigationContainer>
        <NavigationLogoContainer>
            <a href="/">
                <img src="https://placehold.it/52x52" />
            </a>
            <button>London</button>
        </NavigationLogoContainer>
        <NavigationList>
            {items.map((item, i) => (
                <NavigationListItem key={i}>
                    <a href={item.link}>{item.text}</a>
                </NavigationListItem>
            ))}
        </NavigationList>
    </NavigationContainer>
);

export default Navigation;

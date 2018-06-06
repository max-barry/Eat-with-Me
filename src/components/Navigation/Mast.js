import React from 'react';
import {
    MastContainer as Container,
    MastList as List,
    MastListItem as ListItem,
    MastLogoContainer as LogoContainer
} from './Mast.styles';

const Mast = ({ items = [] }) => (
    <Container>
        <LogoContainer>
            <a href="/">
                <img alt="" src="https://placehold.it/52x52" />
            </a>
            <button>London</button>
        </LogoContainer>
        <List>
            {items.map((item, i) => (
                <ListItem key={i}>
                    <a href={item.link}>{item.text}</a>
                </ListItem>
            ))}
        </List>
    </Container>
);

export default Mast;

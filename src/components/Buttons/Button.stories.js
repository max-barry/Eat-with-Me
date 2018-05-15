import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import ButtonSimple, {
    ButtonSimpleIcon,
    ButtonAddToCollection
} from './ButtonSimple';
import ButtonLink from './ButtonLink';
import { tick, cross, add } from '../SVGs/paths';

const action = _ => console.log('Clicked');
const randomName = _ => `${faker.name.firstName()} ${faker.name.lastName()}`;

storiesOf('Buttons', module)
    .add('Simple', () => <ButtonSimple onClick={action}>Click me</ButtonSimple>)
    .add(
        'Simple.Icon',
        withState({ completed: false })(({ store }) => (
            <ButtonSimpleIcon
                icon={store.state.completed ? tick : add}
                onClick={() =>
                    store.set({
                        completed: !store.state.completed
                    })
                }
            >
                {randomName()}
            </ButtonSimpleIcon>
        ))
    )
    .add(
        'Simple.AddToCollection',
        withState({ added: false })(({ store }) => (
            <ButtonAddToCollection
                added={store.state.added}
                onClick={() => store.set({ added: !store.state.added })}
            />
        ))
    )
    .add('Link', () => <ButtonLink onClick={action}>Click me</ButtonLink>);

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import centered from '@storybook/addon-centered';
import ButtonSimple, {
    ButtonSimpleIcon,
    ButtonAddToCollection
} from './ButtonSimple';
import ButtonLink from './ButtonLink';
import ButtonIcon from './ButtonIcon';
import { tick, add } from '../SVGs/paths';
import MapLocationSvg from '../SVGs/images/flaticons/map-location.svg';

const action = _ => console.log('Clicked');
const randomName = _ => `${faker.name.firstName()} ${faker.name.lastName()}`;

storiesOf('Buttons', module)
    .addDecorator(centered)
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
    .add('Icon', () => (
        <ButtonIcon icon={MapLocationSvg} onClick={action}>
            Map it
        </ButtonIcon>
    ))
    .add('Link', () => <ButtonLink onClick={action}>Click me</ButtonLink>);

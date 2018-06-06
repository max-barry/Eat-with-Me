import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import centered from '@storybook/addon-centered';
import { css } from 'emotion';
import ButtonSimple, {
    ButtonSimpleIcon,
    ButtonAddToCollection
} from './ButtonSimple';
import ButtonLink from './ButtonLink';
import ButtonIcon from './ButtonIcon';
import { tick, add } from '../SVGs/paths';
import { sFlexed, colors } from '../../settings/styles';
import { randomIcon } from '../../stories/shared';

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
        <div className={css(sFlexed)}>
            {[colors.black, colors.secondary, colors.primary].map((c, i) => (
                <ButtonIcon
                    icon={randomIcon()}
                    onClick={action}
                    color={c}
                    key={i}
                >
                    {faker.commerce.productMaterial()}
                </ButtonIcon>
            ))}
        </div>
    ))
    .add('Link', () => <ButtonLink onClick={action}>Click me</ButtonLink>);

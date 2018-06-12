import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import centered from '@storybook/addon-centered';
import { css } from 'emotion';
import ButtonSimple, {
    ButtonSimpleIcon,
    ButtonSimpleIconMorph
} from './ButtonSimple';
import ButtonAddToCollection from './ButtonAddToCollection';
import ButtonLink from './ButtonLink';
import ButtonIcon from './ButtonIcon';
import ButtonDominant from './ButtonDominant';
import { tick, add } from '../SVGs/paths';
import { sFlexed, colors } from '../../settings/styles';
import { randomIcon } from '../../stories/shared';
import garbageSvg from '../SVGs/images/flaticons/garbage.svg';

const action = _ => console.log('Clicked');
const randomName = _ => `${faker.name.firstName()} ${faker.name.lastName()}`;

storiesOf('Buttons', module)
    .addDecorator(centered)
    .add('Simple', () => <ButtonSimple onClick={action}>Click me</ButtonSimple>)
    .add(
        'Simple.Icon',
        withState({
            completed: false,
            name1: randomName(),
            name2: randomName()
        })(({ store }) => (
            <div>
                <ButtonSimpleIcon
                    icon={garbageSvg}
                    onClick={() => console.log('clicked')}
                >
                    {store.state.name1}
                </ButtonSimpleIcon>
                <ButtonSimpleIconMorph
                    icon={store.state.completed ? tick : add}
                    onClick={() =>
                        store.set({
                            completed: !store.state.completed
                        })
                    }
                >
                    {store.state.name2}
                </ButtonSimpleIconMorph>
            </div>
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
                    hasValue={i === 1}
                >
                    {faker.commerce.productMaterial()}
                </ButtonIcon>
            ))}
        </div>
    ))
    .add('Link', () => (
        <div className={css(sFlexed)}>
            {[null, colors.secondary, colors.primaryDark].map((color, i) => (
                <ButtonLink key={i} onClick={action} color={color}>
                    Click me
                </ButtonLink>
            ))}
        </div>
    ))
    .add('Dominant', () => (
        <ButtonDominant onClick={action} color={colors.primary}>
            Click me
        </ButtonDominant>
    ));

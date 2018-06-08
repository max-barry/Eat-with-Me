import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
import faker from 'faker';
import { css } from 'emotion';
import { Card } from './Card';
import Drawer from './Drawer';
import { tick } from '../SVGs/paths';
import {
    ButtonSimple,
    ButtonAddToCollection,
    ButtonSimpleIcon
} from '../Buttons';
import { bs, colors } from '../../settings/styles';

const action = _ => console.log('Clicked');

storiesOf('Structures', module)
    .add(
        'Drawer',
        withState({ isOpen: false })(({ store }) => (
            <div>
                <ButtonSimple onClick={() => store.set({ isOpen: true })}>
                    Open
                </ButtonSimple>
                <Drawer
                    isOpen={store.state.isOpen}
                    overlayClass={css({ backgroundColor: colors.grey1 })}
                    contentClass={css({ backgroundColor: colors.grey2 })}
                >
                    <div style={{ padding: bs() }}>
                        <ButtonSimple
                            onClick={() => store.set({ isOpen: false })}
                        >
                            Close
                        </ButtonSimple>
                    </div>
                </Drawer>
            </div>
        ))
    )
    .addDecorator(centered)
    .add('Card', () => (
        <Card
            title={faker.company.catchPhrase()}
            deck={faker.company.catchPhrase()}
            src={`https://source.unsplash.com/featured/300x200/`}
            badge="92.83"
            strap={[
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word()
            ].join(' • ')}
            action={
                <ButtonSimpleIcon icon={tick} onClick={action}>
                    Action
                </ButtonSimpleIcon>
            }
        />
    ))
    .add(
        'Card (Restaurant)',
        withState({ added: false })(({ store }) => (
            <Card
                title="Dishoom (Shoreditch)"
                deck="Collected by 20 people"
                src={`https://cdn.londonandpartners.com/asset/dishoom-kings-cross-e68f09d6444bb3c20d8e48ccfeb3c386.jpg`}
                badge="92.83"
                strap={['Indian', 'Shoreditch', '3.4mil'].join(' • ')}
                action={
                    <ButtonAddToCollection
                        added={store.state.added}
                        onClick={() => store.set({ added: !store.state.added })}
                    />
                }
            />
        ))
    );

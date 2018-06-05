import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
import faker from 'faker';
import { Card, CardCompact } from './Card';
import { tick, add } from '../SVGs/paths';
import {
    ButtonSimpleIcon,
    ButtonAddToCollection
} from '../Buttons/ButtonSimple';

const action = _ => console.log('Clicked');
const makeCompact = _ => ({
    title: faker.company.catchPhrase(),
    deck: faker.company.catchPhrase(),
    id: faker.lorem.word() + (Math.random() * 10).toFixed(2),
    strap: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].join(
        ' • '
    )
});
const randomCompacts = _ =>
    Array(Math.floor(Math.random() * 6) + 2)
        .fill()
        .map(_ => makeCompact());

storiesOf('Structures', module)
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
// .add(
//     'Card.Compact',
//     withState({ expanded: false, props: makeCompact() })(({ store }) => (
//         <CardCompact
//             {...store.state.props}
//             isExpanded={store.state.expanded}
//             onClick={() => store.set({ expanded: !store.state.expanded })}
//         />
//     ))
// );

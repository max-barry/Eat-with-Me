import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';
import Chip from './Chip';
import { colors } from '../../settings/styles';
import { css } from 'emotion';

const props = {
    id: 'someid',
    name: 'somename',
    checked: false,
    onChange: () => console.log('Action'),
    title: () => 'Title for component',
    tag: () => 'Tag underneath the title'
};

storiesOf('Forms', module)
    .add('Checkbox', () => <Checkbox {...props} />)
    .add('Toggle', () => <Toggle {...props} />)
    .add('Toggle with label', () => <ToggleWithLabel {...props} />)
    .add('Chip', () => (
        <div className={css({ padding: '20px' })}>
            <Chip
                {...props}
                title="Mexican"
                color={colors.primary}
                textColor="white"
            />
        </div>
    ))
    .add('Chip (green)', () => (
        <div className={css({ padding: '20px' })}>
            <Chip
                {...props}
                title="Mexican"
                color="#B5FED9"
                textColor="#577769"
            />
        </div>
    ));

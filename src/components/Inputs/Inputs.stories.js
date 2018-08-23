import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, color } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import tinycolor from 'tinycolor2';
import Checkbox from './Checkbox';
import Chip from './Chip';
import Toggle from './Toggle';
import Range from './Range';
import { colors } from '../../settings';
import { arrOf } from '../../shared';
import EditableHeadline from './EditableHeadline';

const makeRangeItem = (_, i) => ({
    label: i,
    checked: faker.random.boolean()
});

storiesOf('Inputs', module)
    .add('Inputs.Checkbox', _ => (
        <Checkbox
            checked={boolean('Checked', false)}
            name="MyCheckbox"
            title={text('Title', 'Hello Storybook')}
            tag={text('Tag', 'Hello Storybook')}
            color={color('Color', colors.secondary)}
            onChange={() => console.log('Clicked')}
        />
    ))
    .add('Inputs.Chip', _ => (
        <Chip
            name="MyChip"
            color={color('Color', colors.primary)}
            checked={boolean('Checked', false)}
            disabled={boolean('Disabled', false)}
            label={text('Label', 'Hello Storybook')}
            onChange={() => console.log('Clicked')}
        />
    ))
    .add('Inputs.Toggle', _ => (
        <Toggle
            name="MyToggle"
            color={tinycolor(color('Color', colors.secondary)).toHexString()}
            checked={boolean('Checked', false)}
            disabled={boolean('Disabled', false)}
            title={text('Title', 'Hello Storybook')}
            tag={text('Tag', 'Hello Storybook')}
            onChange={() => console.log('Clicked')}
        />
    ))
    .add('Inputs.Range', _ => (
        <Range
            name="MyRange"
            title={text('Title', 'Hello Storybook')}
            tag={text('Tag', 'Hello Storybook')}
            color={color('Color', colors.secondary)}
            disabled={boolean('Disabled', false)}
            steps={arrOf(makeRangeItem, 4)}
            onChange={changed => console.log(`Clicked ${changed}`)}
        />
    ))
    .add(
        'Inputs.EditableHeadline',
        withState({ text: 'Enter new text' })(({ store }) => (
            <EditableHeadline
                value={store.state.text}
                onChange={({ newValue }) => store.set({ text: newValue })}
                required={true}
            />
        ))
    );

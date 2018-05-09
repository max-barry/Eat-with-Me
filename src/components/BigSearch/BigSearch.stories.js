import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { css } from 'emotion';
import BigSearch from './BigSearch';
import Chip from '../Forms/Chip';
import { blankArr } from '../../shared';

const onType = (event, callback) => {
    console.log('searching');
    setTimeout(() => {
        console.log('done');
        callback();
    }, 1000);
};

const onClick = event => console.log('clicked');

// name: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     checked

const items = blankArr(9).map((_, i) => (
    <Chip
        title={faker.commerce.department()}
        onChange={onClick}
        name={`chip_${i}`}
        checked={false}
        key={i}
    />
));

storiesOf('Big search', module).add('default', () => (
    <div
        className={css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        })}
    >
        <BigSearch
            placeholder="Tell me a story"
            onChange={onType}
            items={items}
        />
    </div>
));

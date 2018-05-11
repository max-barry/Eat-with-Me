import React from 'react';

import { cx, css } from 'react-emotion';
import { Spring, config as SpringConfig } from 'react-spring';
import MdFavorite from 'react-icons/lib/md/favorite';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';

import iconEnhance from '../enhance';
import {
    FavouriteContainer,
    FavouriteIconElement,
    FavouriteIconInterior
} from './Favourite.styles';

const Favourite = ({ active, initial, ...props }) => (
    <FavouriteContainer {...props}>
        <MdFavoriteOutline className={FavouriteIconElement} />
        <Spring
            config={SpringConfig.wobbly}
            to={{ progress: active ? 1 : 0 }}
            immediate={initial}
            children={({ progress }) => (
                <MdFavorite
                    className={cx(
                        FavouriteIconElement,
                        FavouriteIconInterior,
                        css({
                            transform: `scale(${progress})`,
                            opacity: progress
                        })
                    )}
                />
            )}
        />
    </FavouriteContainer>
);

export default iconEnhance(Favourite);

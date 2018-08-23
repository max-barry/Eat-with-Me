import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { keys, filter, pluck, length, pick } from 'ramda';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Chip } from '../../components/Inputs';
import { Badge, BADGE_SIZE } from '../../components/Buttons';
import { setInitialChecked, clearChecked } from './Filters.shared';
import { restaurantActions } from '../../redux/ducks/restaurants';
import { cuisineSelectors } from '../../redux/ducks/restaurants/restaurants.selectors';
import {
    mq,
    dimensions,
    bs,
    colors,
    isCursor,
    shevy,
    fontWeights,
    transitionTimes,
    styles
} from '../../settings';

const { pad } = styles.fn;

export const FACET_CUISINE = 'all_category_groups.group';

const badge = css(
    mq({
        position: 'absolute',
        top: 5,
        zIndex: 2,
        // right: [-0.7 * BADGE_SIZE, 0]
        right: [-0.7 * BADGE_SIZE, 0]
    })
);

const tabs = css(
    mq({
        position: 'relative',
        zIndex: 0,
        maxWidth: [dimensions.input * 1.5, 'none'],
        marginBottom: bs(2)
    })
);

const headers = css(
    mq({
        display: ['inline-flex', 'flex'],
        borderBottom: `1px solid ${colors.grey2}`,
        marginBottom: bs(1.5)
    })
);

const header = css(
    shevy.h6,
    mq({
        cursor: 'pointer',
        fontWeight: fontWeights.medium,
        padding: [pad(0.5, 0.25), pad(0.5, 0.75)],
        margin: [pad(0, 0.25), 0],
        position: 'relative',
        // zIndex: 0,
        color: colors.greyDark,
        '&::before': {
            content: '""',
            height: 3,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transition: `background-color ${transitionTimes.weak}ms,
                        transform ${transitionTimes.weak}ms`,
            transform: 'scaleY(0)',
            transformOrigin: 'bottom'
        },
        '&.react-tabs__tab--selected::before': {
            backgroundColor: colors.secondaryDark,
            transform: 'none'
        },
        [isCursor]: {
            '&.react-tabs__tab--selected:focus, &:focus, &:hover': {
                backgroundColor: colors.grey1
            },
            '&:focus, &:hover': {
                outline: 0
            }
        }
    })
);

const panel = css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

const chip = css({
    margin: bs(0.25)
});

const { isFavorite, isNational, isGenre, hasLoaded } = cuisineSelectors;

const getGroup = (selector, cuisines) => pluck('group')(selector(cuisines));

class Cuisine extends Component {
    state = setInitialChecked(this.props.items);

    get reduxState() {
        return pick(['restaurants'], this.props);
    }

    get sortedCuisines() {
        const items = this.state;
        const cuisineState = this.reduxState;

        const favorites = pick(getGroup(isFavorite, cuisineState), items);
        const country = pick(getGroup(isNational, cuisineState), items);
        const rest = pick(getGroup(isGenre, cuisineState), items);

        return [
            {
                name: 'Most popular',
                items: favorites
            },
            {
                name: 'By country',
                items: country,
                count: length(keys(filter(Boolean, country)))
            },
            {
                name: 'Everything else',
                items: rest,
                count: length(keys(filter(Boolean, rest)))
            }
        ];
    }

    componentDidMount() {
        const { fetchCuisines, onMount } = this.props;

        fetchCuisines();
        if (onMount) onMount(this);
    }

    clear = () => this.setState(clearChecked(this.props.items));

    onChange = label =>
        this.setState({
            [label]: !this.state[label]
        });

    render() {
        if (!hasLoaded(this.reduxState)) return <p>Loading</p>;

        const sortedCuisines = this.sortedCuisines;

        return (
            <Tabs className={tabs}>
                <TabList className={headers}>
                    {sortedCuisines.map(({ name, count }, i) => (
                        <Tab className={header} key={`Tab_${i}`}>
                            {name}
                            <Badge aria-hidden={true} className={badge}>
                                {count || null}
                            </Badge>
                        </Tab>
                    ))}
                </TabList>

                {sortedCuisines.map(({ items: panelItems }, i) => (
                    <TabPanel className={panel} key={`tabPanel_${i}`}>
                        {Object.entries(panelItems).map(
                            ([label, refined], z) => {
                                const onChange = _ => this.onChange(label);
                                const key = `Chip_${z}`;
                                return (
                                    <Chip
                                        key={key}
                                        name={key}
                                        label={label}
                                        checked={refined}
                                        onChange={onChange}
                                        className={chip}
                                    />
                                );
                            }
                        )}
                    </TabPanel>
                ))}
            </Tabs>
        );
    }
}

Cuisine.defaultProps = {};

Cuisine.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            isRefined: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

const enhance = compose(
    connect(
        pick(['restaurants']),
        restaurantActions
    )
);

export default enhance(Cuisine);

import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import {
    setPropTypes,
    compose,
    defaultProps,
    onlyUpdateForKeys
} from 'recompose';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Trail, config, animated } from 'react-spring';
import {
    BigSearchInput as Input,
    BigSearchContainer as Container,
    BigSearchThemes as themes,
    bigSearchLongClass as longListClass,
    BigSearchLongContainer as LongListContainer,
    bigSearchItemClass as listItemClass
} from './BigSearch.styles';
import { css } from 'emotion';
import { sFlexed } from '../../settings/styles';
import { distributeArray, blankArr, startAnimation } from '../../shared';

const BigSearchLongList = ({ items, loading, initialAnimation: initial }) => {
    // Divide equally among 3 lists
    const grouped = distributeArray(!loading ? items : blankArr(), 3);

    return (
        <LongListContainer>
            <Trail
                native
                to={{
                    // opacity: initial ? 1 : 0,
                    listProgress: initial ? 0 : 100
                }}
                keys={grouped.map((_, i) => `list_${i}`)}
            >
                {grouped.map(list => ({ listProgress }) => (
                    <animated.ul
                        className={longListClass}
                        style={{
                            transform: listProgress.interpolate(
                                listProgress =>
                                    `translate3d(0px, ${listProgress}px ,0)`
                            )
                        }}
                    >
                        <Trail
                            native
                            to={{
                                opacity: initial ? 1 : 0,
                                progress: initial ? 0 : 100
                            }}
                            keys={list.map((_, x) => `item_${x}`)}
                        >
                            {list.map(item => ({ opacity, progress }) => (
                                <animated.li
                                    className={listItemClass}
                                    style={{
                                        opacity,
                                        transform: progress.interpolate(
                                            progress =>
                                                `translate3d(0px, ${progress}px ,0)`
                                        )
                                    }}
                                >
                                    {item}
                                </animated.li>
                            ))}
                        </Trail>
                    </animated.ul>
                ))}
            </Trail>
        </LongListContainer>
    );
};

const EnhancedLongList = onlyUpdateForKeys([
    'items',
    'loading',
    'initialAnimation'
])(BigSearchLongList);

class BigSearch extends Component {
    state = { isSearching: false, initialAnimation: false };

    constructor(props) {
        super(props);

        this.onChangeComplete = this.onChangeComplete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeFunc = this.changeFunc.bind(this);
    }

    componentDidMount() {
        startAnimation(() => this.setState({ initialAnimation: true }));
    }

    changeFunc = this.props.shouldDebounce
        ? debounce(
              event => this.props.onChange(event, this.onChangeComplete),
              this.props.shouldDebounce
          )
        : event => this.props.onChange(event, this.onChangeComplete);

    onChange(event) {
        event.persist();
        this.setState({ isSearching: true });
        return this.changeFunc(event);
    }

    onChangeComplete() {
        this.setState({ isSearching: false });
    }

    render() {
        const {
            onChange,
            changeFunc,
            isSearching,
            theme = 'default',
            placeholder = 'Enter your text',
            items,
            ...props
        } = this.props;

        return (
            <ThemeProvider theme={themes[theme]}>
                <Container>
                    <div
                        className={css(sFlexed, {
                            flexDirection: 'column',
                            alignItems: 'center'
                        })}
                    >
                        <Input
                            type={props.type || 'text'}
                            placeholder={placeholder}
                            onChange={this.onChange}
                        />
                        <EnhancedLongList
                            items={items}
                            loading={this.state.isSearching}
                            initialAnimation={this.state.initialAnimation}
                        />
                    </div>
                </Container>
            </ThemeProvider>
        );
    }
}

const enhance = compose(
    defaultProps({ shouldDebounce: 220, items: [] }),
    setPropTypes({
        placeholder: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.oneOfType(PropTypes.func, PropTypes.element)
        ).isRequired,
        shouldDebounce: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        type: PropTypes.string,
        theme: PropTypes.oneOf(Object.keys(themes))
    }),
    onlyUpdateForKeys(['items'])
);

export default enhance(BigSearch);

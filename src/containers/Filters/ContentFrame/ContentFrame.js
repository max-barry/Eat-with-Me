import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    map,
    prop,
    zipObj,
    flip,
    pluck,
    sortWith,
    descend,
    ascend
} from 'ramda';
import MediaQuery from 'react-responsive';
import {
    ContentFrameExterior as Exterior,
    ContentFrameInterior as Interior,
    ActionsList as Ul,
    ActionsListItem as Li
} from './ContentFrame.styles.js';
import {
    ButtonLink,
    ButtonSimpleIcon,
    ButtonDominant
} from '../../../components/Buttons';
import { colors, breakpoints } from '../../../settings/styles.js';
import garbageIcon from '../../../components/SVGs/images/flaticons/garbage.svg';

const copy = {
    clear: 'Reset',
    close: 'Close',
    apply: 'Apply'
};

const Actions = ({ apply, close, clear }) => {
    const isJustApply = !close && !clear;
    return (
        <Ul fixed={isJustApply}>
            {clear && (
                <Li>
                    <ButtonSimpleIcon onClick={clear} icon={garbageIcon}>
                        {copy.clear}
                    </ButtonSimpleIcon>
                </Li>
            )}
            {close && (
                <Li>
                    <ButtonLink onClick={close}>{copy.close}</ButtonLink>
                </Li>
            )}
            {apply && (
                <Li style={{ width: isJustApply ? '100%' : 'auto' }}>
                    {isJustApply && (
                        <ButtonDominant onClick={apply}>
                            {copy.apply}
                        </ButtonDominant>
                    )}
                    {!isJustApply && (
                        <ButtonLink onClick={apply} color={colors.primaryDark}>
                            {copy.apply}
                        </ButtonLink>
                    )}
                </Li>
            )}
        </Ul>
    );
};

Actions.propTypes = {
    apply: PropTypes.func,
    close: PropTypes.func,
    clear: PropTypes.func
};

class ContentFrame extends Component {
    constructor(props) {
        super(props);
        this.process = this.process.bind(this);
        this.onChildMount = this.onChildMount.bind(this);
        // Create an empty object to store rendered references of each object
        this.facetRefs = {};
    }

    get attributes() {
        return map(prop('attribute'), this.props.children);
    }

    orderItems(items) {
        // Potentially memoize this...?
        return sortWith([descend(prop('count')), ascend(prop('label'))])(items);
    }

    process() {
        // Process all currently active facets and return a dictionary
        // containing key:value pairs of facet name and processed values
        // Get a list of the attributes in the content frame
        const attributes = this.attributes;

        // Call the process method on each attribute's component.
        // This creates a key:value dict of attribute name and refined values
        return zipObj(
            attributes,
            map(pluck('refined', flip(prop)(this.facetRefs)), attributes)
        );
    }

    onChildMount(attribute, rendered) {
        this.facetRefs[attribute] = rendered;
    }

    render() {
        const {
            children,
            apply,
            close,
            clear,
            currentRefinement,
            ...props
        } = this.props;
        // TODO : Check if ...props actually has a value to it
        return (
            <Exterior>
                <MediaQuery maxWidth={breakpoints.mobile}>
                    <Actions close={close} clear={clear} />
                </MediaQuery>
                <Interior>
                    {children.map(({ attribute, component: Child }, i) => (
                        <Child
                            key={`facet_${attribute}`}
                            initial={this.orderItems(
                                currentRefinement[attribute]
                            )}
                            onMount={r => this.onChildMount(attribute, r)}
                            {...props}
                        />
                    ))}
                </Interior>
                <MediaQuery maxWidth={breakpoints.mobile}>
                    <Actions apply={apply} />
                </MediaQuery>
                <MediaQuery minWidth={breakpoints.mobile + 1}>
                    <Actions apply={apply} close={close} clear={clear} />
                </MediaQuery>
            </Exterior>
        );
    }
}

ContentFrame.propTypes = {
    apply: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    currentRefinement: PropTypes.object.isRequired
};

export default ContentFrame;

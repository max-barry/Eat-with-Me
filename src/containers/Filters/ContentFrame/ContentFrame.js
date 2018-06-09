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
import {
    ContentFrameExterior as Exterior,
    ContentFrameInterior as Interior,
    ActionsList as List,
    ActionsListItem as ListItem
} from './ContentFrame.styles.js';
import {
    ButtonLink,
    ButtonSimpleIcon
} from '../../../components/Buttons/index.js';
import { cross } from '../../../components/SVGs/paths.js';
import { colors } from '../../../settings/styles.js';

const Actions = ({ apply, close, clear }) => (
    <List>
        {clear && (
            <ListItem>
                <ButtonSimpleIcon onClick={clear} icon={cross}>
                    Reset
                </ButtonSimpleIcon>
            </ListItem>
        )}
        <ListItem>
            <ButtonLink onClick={close}>Cancel</ButtonLink>
        </ListItem>
        <ListItem>
            <ButtonLink onClick={apply} color={colors.primaryDark}>
                Apply
            </ButtonLink>
        </ListItem>
    </List>
);

Actions.propTypes = {
    apply: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
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
                <Interior>
                    {children.map(({ attribute, component: Child }, i) => {
                        const initial = this.orderItems(
                            currentRefinement[attribute]
                        );
                        return (
                            <Child
                                key={`facet_${attribute}`}
                                initial={initial}
                                onMount={r => this.onChildMount(attribute, r)}
                                {...props}
                            />
                        );
                    })}
                </Interior>
                <Actions apply={apply} close={close} clear={clear} />
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

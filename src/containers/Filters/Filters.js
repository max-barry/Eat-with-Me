import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import Modal from 'react-modal';
import { prop, mapObjIndexed, path, omit } from 'ramda';
import { bpProps } from '../../settings';
import { Drawer } from '../../components/Display';
import {
    modalOverlay,
    modalContent,
    MODAL_WIDTH,
    Main,
    AddedArea,
    AddedInterior
} from './Filters.styles';
import { DesktopActions } from './Filters.Navigation';
import {
    formatPropsFromVirtuals,
    checkIfNewRefinements,
    mobileDrawerItems,
    componentMapArray
} from './Filters.shared';
import { Results, Added, ModalContent } from './Filters.Content';

// https://www.algolia.com/doc/api-reference/api-parameters/filters/
// https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/

Modal.setAppElement('#root');

class Filters extends Component {
    _applied = {};
    virtualRefs = {};
    ModalContent = React.createRef();
    openModal = this.toggleModal.bind(this, true);
    closeModal = this.toggleModal.bind(this, false);
    state = {
        modalPosition: {},
        visibleAttributes: [],
        isOpen: false,
        collection: {}
    };

    /**
     * Track what facets have been applied with _applied
     * _applied is an object with the facet attribute as a key
     * and value of true if the facet has been applied.
     * If the new value is an empty call (e.g. quarter.name = []) then
     * you want to set it's key (quarter.name) to false.
     *
     * @memberof Filters
     */
    set applied(refinements) {
        // Format refinements in to just booleans (true for value applied, false otherwise)
        // If it's a refinement list then true for .length > 0 else false
        // If it's a refinement toggle then check for a value vs. the default refinement
        this._applied = {
            ...this._applied,
            ...checkIfNewRefinements(refinements)
        };
    }

    get applied() {
        return this._applied;
    }

    get attributeObjects() {
        return formatPropsFromVirtuals(
            this.state.visibleAttributes,
            this.virtualRefs
        );
    }

    /**
     * Toggle the modal open / close. Visible attributes will be an array
     * of attributes that this modal instance should show OR undefined on a close
     *
     * This method is rebound as .openModal and .closeModal
     *
     * @param {array} visibleAttributes
     * @memberof Filters
     */
    toggleModal(
        isOpen = false,
        event = {},
        visibleAttributes = [],
        isMobile = false
    ) {
        const modalPosition = {};
        // If the modal is not currently open then we need to fix a left / top value for it's position
        if (isOpen && !isMobile) {
            const $target = event.target;
            // Get the bounding rect of the clicked element to work out left value
            let { left } = $target.getBoundingClientRect();
            // Adjust for the window being very small and the filter now being off the screen
            // Delta is either 0 if no adjustment is needed or an integer to shift the open filter component left by that
            // The width of the container (basically the window) minus how far left this filter component
            // needs to be and the width of the component OR 0 if we have space
            const min = Math.min;
            left -= Math.abs(min(window.innerWidth - (left + MODAL_WIDTH), 0));
            // Set this on the position
            modalPosition.left = left;
            // Get the parent node and find the bottom edge of this element
            const { bottom } = $target.parentNode.getBoundingClientRect();
            // Set these on the empty dimensions object
            modalPosition.top = bottom;
        }

        // Is this an opening call but the modal is already open?
        if (this.state.isOpen && isOpen) {
            // Then you need to refine the currently opened content
            const refinedAttrs = this.ModalContent.current.refinedAttrs;
            // Call the refine function
            this.refine(refinedAttrs);
        }

        this.setState({
            modalPosition,
            visibleAttributes,
            isOpen: isOpen
        });
    }

    /**
     * Loop over visible attributes and
     * fish the refine fn from the corresponding virtual.
     * Call that virtual refine with the value you've been given.
     *
     * @param {object} refinedAttrs
     * @memberof Filters
     */
    refine = refinedAttrs => {
        this.applied = refinedAttrs;

        mapObjIndexed(
            (_, key) =>
                // Get the refinement function from the virtual refs property
                path([key, 'refine'], this.virtualRefs)(
                    // Use that refine function with the new refinement for this attribute
                    prop(key, refinedAttrs)
                ),
            refinedAttrs
        );
    };

    /**
     * Call the refine fn (above) and then close the modal
     *
     * @param {object} refinedAttrs
     * @memberof Filters
     */
    refineAndClose = refinedAttrs => {
        this.refine(refinedAttrs);
        this.closeModal();
    };

    addToCollection = hit =>
        this.setState({
            collection: {
                ...this.state.collection,
                [hit.id]: hit
            }
        });

    removeFromCollection = hit =>
        this.setState({
            collection: omit([hit.id], this.state.collection)
        });

    render() {
        const {
            modalPosition: { left, top },
            isOpen: modalIsOpen
        } = this.state;

        const Content = (
            <ModalContent
                ref={this.ModalContent}
                refine={this.refineAndClose}
                closeModal={this.closeModal}
                attributes={this.attributeObjects}
            />
        );

        return (
            <Fragment>
                <MediaQuery {...bpProps.notMobile}>
                    <DesktopActions
                        applied={this.applied}
                        openModal={this.openModal}
                    />
                    <Modal
                        contentLabel="Filters modal"
                        isOpen={modalIsOpen}
                        onRequestClose={this.closeModal}
                        overlayClassName={modalOverlay(top)}
                        className={modalContent(left)}
                    >
                        {Content}
                    </Modal>
                </MediaQuery>

                <MediaQuery {...bpProps.mobile}>
                    <Drawer
                        isOpen={modalIsOpen}
                        items={[...mobileDrawerItems(this.openModal)]}
                    >
                        {Content}
                    </Drawer>
                </MediaQuery>

                <Main>
                    <div>
                        <Results />
                    </div>
                    <MediaQuery {...bpProps.notMobile}>
                        <AddedArea>
                            <AddedInterior>
                                <Added />
                            </AddedInterior>
                        </AddedArea>
                    </MediaQuery>
                </Main>

                {componentMapArray.map(
                    (
                        [attr, { virtual: VirtualComponent, virtualProps }],
                        key
                    ) => (
                        <VirtualComponent
                            limit={20}
                            attribute={attr}
                            key={`VirtualRefinement_${key}`}
                            ref={el => (this.virtualRefs[attr] = el)}
                            {...virtualProps}
                        />
                    )
                )}
            </Fragment>
        );
    }
}

export default Filters;

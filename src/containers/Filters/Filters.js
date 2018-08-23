import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {
    prop,
    mapObjIndexed,
    path,
    omit,
    propOr,
    isEmpty,
    pick,
    pathOr
} from 'ramda';
import { compose } from 'recompose';
import { bpProps } from '../../settings';
import { Drawer } from '../../components/Display';
import {
    modalOverlay,
    modalContent,
    MODAL_WIDTH,
    Main,
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
import listSvg from '../../../public/images/icons/list-1.svg';
import { collectionsActions } from '../../redux/ducks/collections';
import { EMPTY_COLLECTION } from '../../redux/ducks/collections/collections.reducers';

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
        showResults: false
        // collectionId: EMPTY_COLLECTION.id
        // collection: pathOr(
        //     EMPTY_COLLECTION,
        //     ['props', 'collections', ''],
        //     this
        // )
        // collectionName: pathOr(
        //     '',
        //     ['props', 'collections', 'activeCollection', 'name'],
        //     this
        // )
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

    get collectionIsEmpty() {
        return isEmpty(this.state.collection);
    }

    componentDidMount() {
        const isEdit = false;
        // if (!isEdit) this.props.createNewCollection(); // TODO : This needs readding
    }

    toggleResultsOnMobile = () =>
        this.setState({
            showResults: !this.state.showResults
        });

    refineCurrentlyOpen = () => {
        // Then you need to refine the currently opened content
        const refinedAttrs = this.ModalContent.current.refinedAttrs;
        // Call the refine function
        this.refine(refinedAttrs);
    };

    calculateModalPosition = $target => {
        const modalPosition = {};
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

        return modalPosition;
    };

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
        const newState = { isOpen, visibleAttributes };

        // If the modal is not currently open then we need to fix a left / top value for it's position
        if (isOpen && !isMobile) {
            newState.modalPosition = this.calculateModalPosition(event.target);
        }

        // Is this an opening call but the modal is already open?
        if (this.state.isOpen && isOpen) this.refineCurrentlyOpen();

        this.setState(newState);
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

    /**
     * Add the provided restaurant to the collection
     *
     * @param {object} restaurant The object supplied by Algolia with the restaurant's details
     */
    addToCollection = restaurant =>
        this.setState({
            collection: {
                ...this.state.collection,
                [restaurant.id]: restaurant
            }
        });

    /**
     * Remove the restaurant from the current collection
     *
     * @param {object|string} restaurant Either the restaurant ID or the object containing the ID
     * @memberof Filters
     */
    removeFromCollection = restaurant =>
        this.setState({
            collection: omit(
                [propOr(restaurant, 'id', restaurant)],
                this.state.collection
            )
        });

    renameCollection = ({ newValue: name }) =>
        this.props.updateActiveCollectionName(name);

    render() {
        const {
            modalPosition: { left, top },
            isOpen: modalIsOpen,
            // collection,
            showResults
        } = this.state;

        const collection = pathOr(EMPTY_COLLECTION, [], this.props);

        const removeFromCollection = this.removeFromCollection;
        const addToCollection = this.addToCollection;
        const applied = this.applied;
        const openModal = this.openModal;
        const closeModal = this.closeModal;
        const collectionIsEmpty = this.collectionIsEmpty;
        const toggleResultsOnMobile = this.toggleResultsOnMobile;
        const renameCollection = this.renameCollection;

        const FacetDisplay = (
            <ModalContent
                ref={this.ModalContent}
                refine={this.refineAndClose}
                closeModal={closeModal}
                attributes={this.attributeObjects}
            />
        );

        const CurrentCollection = (
            <Added
                collection={collection}
                remove={removeFromCollection}
                close={toggleResultsOnMobile}
                isEmpty={collectionIsEmpty}
                renameCollection={renameCollection}
            />
        );

        return (
            <Fragment>
                <MediaQuery {...bpProps.notMobile}>
                    <DesktopActions applied={applied} openModal={openModal} />
                    <Modal
                        contentLabel="Filters modal"
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        overlayClassName={modalOverlay(top)}
                        className={modalContent(left)}
                    >
                        {FacetDisplay}
                    </Modal>
                </MediaQuery>

                <MediaQuery {...bpProps.mobile}>
                    <Drawer
                        isOpen={modalIsOpen || showResults}
                        items={[
                            ...mobileDrawerItems(openModal, applied),
                            {
                                label: 'Your list',
                                icon: listSvg,
                                onClick: toggleResultsOnMobile,
                                hasBadge: !collectionIsEmpty
                            }
                        ]}
                    >
                        {showResults ? CurrentCollection : FacetDisplay}
                    </Drawer>
                </MediaQuery>

                <Main>
                    <div>
                        <Results
                            collection={collection}
                            add={addToCollection}
                            remove={removeFromCollection}
                        />
                    </div>
                    <MediaQuery {...bpProps.notMobile}>
                        <div style={{ position: 'relative' }}>
                            <AddedInterior>{CurrentCollection}</AddedInterior>
                        </div>
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

const enhance = compose(
    connect(
        pick(['collections']),
        collectionsActions
    )
);

export default enhance(Filters);

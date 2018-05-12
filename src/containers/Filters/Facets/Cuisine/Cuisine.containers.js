import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { compose } from 'recompose';
import { FACET_CUISINE } from '../../Filters.shared';

const CuisineTabs = props => (
    <Tabs>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
            <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 2</h2>
        </TabPanel>
    </Tabs>
);

class Cuisine extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_CUISINE, this.state.refinement, !force);

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    update([refine, value]) {
        // refine(value);
        this.setState({ refinement: value });
    }

    render() {
        return (
            <div>
                <CuisineTabs />
            </div>
        );
    }
}

const enhance = compose();

export default enhance(Cuisine);

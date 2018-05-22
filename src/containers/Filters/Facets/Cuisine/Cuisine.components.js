import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { compose } from 'recompose';
// import ChipLite from '../../../../components/Forms/ChipLite';
import Chip from '../../../../components/Forms/Chip';
import {
    cuisineTabsClass as tabsClass,
    cuisineHeaderListClass as headerListClass,
    cuisineHeaderClass as headerClass,
    cuisinePanelClass as panelClass,
    cuisineChipClass as chipClass
} from './Cuisine.styles';
import { withPanelledUpdate } from '../Facets.shared';

const enhance = compose(withPanelledUpdate);

export const CuisineTabs = enhance(({ items, update }) => (
    <Tabs className={tabsClass}>
        <TabList className={headerListClass}>
            {items.map((panel, i) => (
                <Tab className={headerClass} key={`tab_${i}`}>
                    {panel.name}
                </Tab>
            ))}
        </TabList>

        {items.map((panel, i) => (
            <TabPanel className={panelClass} key={`tabPanel_${i}`}>
                {panel.items.map((cuisine, z) => (
                    <Chip
                        key={`checkbox_${z}`}
                        className={chipClass}
                        label={cuisine.label}
                        checked={cuisine.isRefined}
                        name={`cuisine_${z}`}
                        onChange={_ => update(panel.name, cuisine.label)}
                    />
                ))}
            </TabPanel>
        ))}
    </Tabs>
));

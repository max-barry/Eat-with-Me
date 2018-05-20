import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ChipLite from '../../../../components/Forms/ChipLite';
import Chip from '../../../../components/Forms/Chip';
import {
    cuisineTabsClass as tabsClass,
    cuisineHeaderListClass as headerListClass,
    cuisineHeaderClass as headerClass,
    cuisinePanelClass as panelClass,
    cuisineChipClass as chipClass
} from './Cuisine.styles';
import { compose, lifecycle, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        update: ({ items, onChange }) => (panelLabel, cuisineLabel) => {
            // Find the value associated with this label
            // (kind of assumes all labels and panel names are unique)
            const panel = items.find(({ name }) => name === panelLabel);
            const cuisine = panel.items.find(
                ({ label }) => label === cuisineLabel
            );
            onChange(cuisine.value);
        }
    })
);
// lifecycle({
//     componentDidUpdate(prevProps) {
//         Object.keys(this.props).forEach(key => {
//             if (this.props[key] !== prevProps[key]) {
//                 console.log(
//                     key,
//                     'changed from',
//                     prevProps[key],
//                     'to',
//                     this.props[key]
//                 );
//             }
//         });
//     }
// })

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

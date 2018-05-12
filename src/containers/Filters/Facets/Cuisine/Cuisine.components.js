import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Chip from '../../../../components/Forms/Chip';
import {
    cuisineTabsClass as tabsClass,
    cuisineHeaderListClass as headerListClass,
    cuisineHeaderClass as headerClass,
    cuisinePanelClass as panelClass,
    cuisineChipClass as chipClass
} from './Cuisine.styles';

export const CuisineTabs = ({ items, onChange }) => (
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
                        className={chipClass}
                        key={`checkbox_${z}`}
                        label={cuisine.label}
                        checked={cuisine.isRefined}
                        name={`cuisine_${z}`}
                        onChange={isChecked => onChange(cuisine.value)}
                    />
                ))}
            </TabPanel>
        ))}
    </Tabs>
);

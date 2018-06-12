import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Chip } from '../../../../components/Forms';
import {
    cuisineTabsClass as tabsClass,
    cuisineHeaderListClass as headerListClass,
    cuisineHeaderClass as headerClass,
    cuisinePanelClass as panelClass,
    cuisineChipClass as chipClass
} from './Cuisine.styles';
import { Badge } from '../../../../components/Forms';
import { dimensions } from '../../../../settings/styles';

export const CuisineTabs = ({ items, update }) => (
    <Tabs className={tabsClass}>
        <TabList className={headerListClass}>
            {items.map((panel, i) => (
                <Tab className={headerClass} key={`tab_${i}`}>
                    {panel.name}{' '}
                    <Badge
                        aria-hidden={true}
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: -0.7 * dimensions.badge
                        }}
                        count={
                            panel.hideCount
                                ? 0
                                : panel.items.filter(
                                      cuisine => cuisine.isRefined
                                  ).length
                        }
                    />
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
                        onChange={_ => update(cuisine.label)}
                    />
                ))}
            </TabPanel>
        ))}
    </Tabs>
);

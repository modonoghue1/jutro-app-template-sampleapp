import React from 'react';
import { Flex } from '@jutro/layout';
import { InfoLabel } from '@jutro/components';

export const Info = () => (
    <div>
        <Flex>
            <span>Welcome!</span>
            <InfoLabel id="appInfo" icon="info" message="App Info" />
        </Flex>
        <p>
            This page contains a codeless form and the /floorplan route matches
            a different floorplan. As a result:
        </p>
        <ul>
            <li>the main content is scrollable</li>
            <li>a footer is present</li>
            <li>navigation routes are on the left</li>
            <li>collapsible right side is present</li>
        </ul>
    </div>
);

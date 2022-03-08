import React from 'react';
import { FlexItem, BreakpointTrackerContext } from '@jutro/layout';
import { ActionTitleBar } from '../ActionTitleBar';
import { TitleElement } from '../TitleElement';

describe('ActionTitleBar', () => {
    it('[JUT-7127] should place the title element on the left side', () => {
        const wrapper = shallow(
            <ActionTitleBar>
                <TitleElement>Title 1</TitleElement>
                <button>Action 1</button>
                <button>Action 2</button>
            </ActionTitleBar>
        );

        expect(wrapper.find(FlexItem).first().childAt(0).type()).toBe(
            TitleElement
        );
    });

    it('[JUT-7128] should place all the actions on the right side', () => {
        const wrapper = shallow(
            <ActionTitleBar>
                <TitleElement>Title 1</TitleElement>
                <button>Action 1</button>
                <button>Action 2</button>
            </ActionTitleBar>
        );

        expect(wrapper.find(FlexItem).at(1).childAt(0).type()).toBe('button');
        expect(wrapper.find(FlexItem).at(1).childAt(0).text()).toBe('Action 1');
        expect(wrapper.find(FlexItem).at(1).childAt(1).type()).toBe('button');
        expect(wrapper.find(FlexItem).at(1).childAt(1).text()).toBe('Action 2');
    });

    ['phone', 'phoneWide', 'tablet'].forEach(breakpoint => {
        it(`[JUT-7129] should render overrides for ${breakpoint}`, () => {
            const overriddenTitle = `Title ${breakpoint}`;

            const props = {
                [breakpoint]: {
                    children: <TitleElement>{overriddenTitle}</TitleElement>,
                },
            };

            const wrapper = mount(
                <BreakpointTrackerContext.Provider value={breakpoint}>
                    <ActionTitleBar {...props}>
                        <TitleElement>Title</TitleElement>
                    </ActionTitleBar>
                </BreakpointTrackerContext.Provider>
            );

            expect(wrapper.text()).toBe(overriddenTitle);
        });
    });

    it('[JUT-7136] should apply passed className', () => {
        const className = 'test-class-name';

        const wrapper = shallow(
            <ActionTitleBar className={className}>
                <TitleElement>Title</TitleElement>
            </ActionTitleBar>
        );

        expect(wrapper).toHaveClassName(className);
    });
});

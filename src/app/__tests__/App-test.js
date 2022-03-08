import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { GlobalizationProvider } from '@jutro/locale';
import { validateMetadata } from '@jutro/uiconfig';
import { App } from '../App';
import floorplanMetadata from '../App.metadata.json5';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <GlobalizationProvider defaultLocale="en">
            <MemoryRouter>
                <App />
            </MemoryRouter>
        </GlobalizationProvider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('[JUT-6139] metadata is valid', () => {
    const onError = jest.fn();
    validateMetadata(floorplanMetadata, onError);

    expect(onError).not.toHaveBeenCalled();
});

it("package-lock.json doesn't have references to internal Guidewire artifactory", () => {
    const fs = require('fs');
    const fileText = fs.readFileSync('./package-lock.json', 'utf8');

    expect(fileText.includes('artifactory.guidewire')).toBe(false);
});

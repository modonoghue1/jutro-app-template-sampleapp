import React from 'react';
import { validateMetadata } from '@jutro/uiconfig';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mountWithTranslatorAndRouterContext } from '@jutro/test';
import uiMetadata from '../CodelessForm.metadata.json5';
import { CodelessForm } from '../CodelessForm';

expect.extend(toHaveNoViolations);

describe('Codeless', () => {
    it('metadata is valid', () => {
        const onError = jest.fn();
        validateMetadata(uiMetadata, onError);

        expect(onError).not.toHaveBeenCalled();
    });

    it('has no a11y violations', async () => {
        const wrapper = mountWithTranslatorAndRouterContext(
            <main>
                <CodelessForm />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });
});

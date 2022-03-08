// @ts-check
import React, { useContext } from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { TranslatorContext } from '@jutro/locale';

import styles from './Welcome.module.scss';
import uiMetadata from './Welcome.metadata.json5';
import packageJson from '../../../package.json';
import messages from './Welcome.messages';

/**
 *
 * @param {string} version - The package.json version property
 * @returns {object} -  Jutro version and Jutro component URI corresponding to Jutro Version provided
 */
export const getJutroVersion = version => {
    return {
        version,
        jutroComponentsURI:
            'http://tenant-jutro-staticapp-bucket.s3-website-us-west-2.amazonaws.com/storybook/',
    };
};

export const Welcome = () => {
    const translator = useContext(TranslatorContext);
    const { version, jutroComponentsURI } = getJutroVersion(
        packageJson.version
    );

    const overrideProps = {
        needSupportStorybookLink: {
            content: translator(messages.jutroVersion, { version }),
            href: jutroComponentsURI,
        },
    };

    return (
        <div className={styles.welcome}>
            <MetadataForm
                uiProps={uiMetadata['jutro-app.metadata-driven.welcome']}
                classNameMap={styles}
                overrideProps={overrideProps}
            />
        </div>
    );
};

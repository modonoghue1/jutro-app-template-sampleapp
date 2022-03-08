import React from 'react';
import { MatchPathProps } from '@jutro/prop-types';
export declare type ScrollToTopProps = {
    /**
     * array or single path to pages which should be exclude from automatic scroll to top
     */
    excludeRoutes?: MatchPathProps;
};
export declare const ScrollToTop: React.FC<ScrollToTopProps>;

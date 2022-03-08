/**
 * Created based on basic.metadata.schema.json which is the source of truth
 */
import { IntlMessageObject, IntlMessageShape } from '@jutro/prop-types';
import { metadataTypes } from './types';
export declare type MetadataTypes = typeof metadataTypes[keyof typeof metadataTypes];
export interface MetadataComponentBasic {
    id: string;
    type: MetadataTypes;
}
export interface MetadataComponentType extends MetadataComponentBasic {
    component: string;
    componentProps?: Record<string, unknown>;
}
export interface MetadataLayoutProps {
    component: string;
    componentProps?: Record<string, unknown>;
}
export interface MetadataContentLayout {
    contentLayout?: MetadataLayoutProps;
}
export interface MetadataContentArray {
    content?: Array<MetadataNode>;
}
export interface MetadataContentIntl {
    content?: IntlMessageShape;
}
export interface MetadataContent {
    content?: MetadataNode | Array<MetadataNode>;
}
export interface MetadataSelfLayout {
    selfLayout?: MetadataLayoutProps;
}
export interface MetadataAction extends MetadataComponentType, MetadataContentIntl, MetadataSelfLayout {
    type: 'action';
}
export interface MetadataElement extends MetadataComponentType, MetadataContentIntl, MetadataSelfLayout {
    type: 'element';
}
export interface MetadataContainer extends MetadataComponentType, MetadataContent, MetadataContentLayout, MetadataSelfLayout {
    type: 'container';
}
export interface MetadataField extends MetadataComponentBasic, MetadataContent, MetadataContentLayout, MetadataSelfLayout {
    type: 'field';
    component?: string;
    datatype?: string;
    componentProps?: Record<string, unknown>;
}
export interface MetadataIterable extends MetadataComponentType {
    type: 'iterable';
    content?: undefined;
}
export interface MetadataLayout extends MetadataComponentType, MetadataContent {
    type: 'layout';
}
export interface MetadataComponent extends MetadataComponentType {
    type: 'component';
}
export interface MetadataPage extends Omit<MetadataComponentBasic, 'type'>, MetadataContent, MetadataContentLayout {
    type: 'page';
}
export interface MetadataNodeWizard {
    type: 'wizard';
}
export interface MetadataNodeWizardPage {
    type: 'wizardpage';
}
export interface MetadataNodeFloorPlan {
    type: 'floorplan';
    [key: string]: any;
}
export declare type MetadataNode = MetadataAction | MetadataElement | MetadataContainer | MetadataField | MetadataIterable | MetadataLayout | MetadataPage | IntlMessageObject;
export declare type MetadataNodeRoot = MetadataNode | MetadataComponent | MetadataNodeWizard | MetadataNodeWizardPage | MetadataNodeFloorPlan;
export interface MetadataJSONMeta {
    $schema: string;
    jutro: string;
}
export interface MetadataJSON extends MetadataJSONMeta {
    [key: string]: MetadataNodeRoot;
}

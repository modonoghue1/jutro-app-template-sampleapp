/**
 * Maps a named datatype to a corresponding field component (and optional props)
 *
 * @param {string} datatype - The name of the data type to look up
 * @param {boolean} [useDefault=true] - Flag indicating whether to return the default component type for string if the datatype is missing
 * @returns {object|null} - The data field component or null
 */
export function resolveComponentFromDatatype(datatype: string, useDefault?: boolean | undefined): object | null;
/**
 * Maps a named component to actual component class (and optional props)
 * Useful for json configuration definitions
 *
 * @param {string} name - The name of the component to look up
 * @returns {{ component: any }|undefined} - The named component or undefined
 */
export function resolveComponentFromName(name: string): {
    component: any;
} | undefined;
/**
 * Overrides simpleDatatypeComponentMap components classes with specified
 * component classes in componentMap.
 *
 * Merges new Components types into simpleNamedComponentMap
 *
 * @param {object} componentMap - json representation of component overrides
 * @param {object} components - object containing references to new component class definitions
 */
export function setComponentMapOverrides(componentMap: object, components: object): void;
/**
 * Merges the simpleNamedComponentMaps with the new component maps provided
 *
 * @param {object} componentMapOverrides - json representation of component overrides
 */
export function setSimpleNamedComponentMapOverrides(componentMapOverrides: object): void;
/**
 * Append new components to simpleNamedComponentMaps
 *
 * @param {object} componentsMap - json representation of new components map
 */
export function appendSimpleNamedComponentMap(componentsMap: object): void;
/**
 * Merges the simpleDatatypeComponentMap with the new component maps provided
 *
 * @param {object} componentMapOverrides - json representation of component overrides
 */
export function setSimpleDatatypeComponentMapOverrides(componentMapOverrides: object): void;
export namespace simpleDatatypeComponentMap {
    namespace boolean {
        export { ToggleField as component };
    }
    namespace checkbox {
        export { CheckboxField as component };
    }
    namespace currency {
        export { CurrencyField as component };
    }
    namespace number {
        export { InputNumberField as component };
    }
    namespace integer {
        export { InputNumberField as component };
    }
    namespace radio {
        export { RadioButtonField as component };
    }
    namespace select {
        export { DropdownSelectField as component };
    }
    namespace string {
        export { InputField as component };
    }
    namespace tel {
        export { PhoneNumberField as component };
    }
    namespace text {
        export { InputField as component };
    }
    namespace textarea {
        export { TextAreaField as component };
    }
    namespace typelist {
        export { DropdownSelectField as component };
    }
    namespace date {
        export { DateField as component };
    }
    namespace year {
        export { YearField as component };
    }
    namespace yesno {
        export { ToggleField as component };
    }
}
export namespace simpleNamedComponentMap {
    namespace Accordion {
        export { Accordion as component };
    }
    namespace AccordionCard {
        export { AccordionCard as component };
    }
    namespace AddressDisplay {
        export { AddressDisplay as component };
    }
    namespace AsyncLink {
        export { AsyncLink as component };
    }
    namespace AsyncButtonLink {
        export { AsyncButtonLink as component };
    }
    namespace Avatar {
        export { Avatar as component };
    }
    namespace Badge {
        export { Badge as component };
    }
    namespace Breadcrumb {
        export { Breadcrumb as component };
    }
    namespace Button {
        export { Button as component };
    }
    namespace ButtonLink {
        export { ButtonLink as component };
    }
    namespace IconButton {
        export { IconButton as component };
    }
    namespace Toggle {
        export { ToggleField as component };
    }
    namespace Card {
        export { Card as component };
    }
    namespace ClickableCard {
        export { ClickableCard as component };
    }
    namespace Checkbox {
        export { CheckboxField as component };
    }
    namespace CheckboxGroup {
        export { CheckboxGroupField as component };
    }
    namespace Chevron {
        export { Chevron as component };
    }
    namespace ColorPicker {
        export { ColorPicker as component };
    }
    namespace ColorSwatch {
        export { ColorSwatch as component };
    }
    namespace Currency {
        export { CurrencyField as component };
    }
    namespace CurrencyValue {
        export { CurrencyValue as component };
    }
    namespace DateValue {
        export { DateValue as component };
    }
    namespace DropdownMenu {
        export { DropdownMenu as component };
    }
    namespace DropdownMenuAvatar {
        export { DropdownMenuAvatar as component };
    }
    namespace DropdownMenuButton {
        export { DropdownMenuButton as component };
    }
    namespace DropdownMenuHeader {
        export { DropdownMenuHeader as component };
    }
    namespace DropdownMenuLink {
        export { DropdownMenuLink as component };
    }
    namespace DropdownMenuSeparator {
        export { DropdownMenuSeparator as component };
    }
    namespace FieldIcon {
        export { FieldIcon as component };
    }
    namespace FieldValue {
        export { FieldValue as component };
    }
    namespace Flex {
        export { Flex as component };
    }
    namespace FlexItem {
        export { FlexItem as component };
    }
    namespace Footer {
        export { Footer as component };
    }
    namespace FooterText {
        export { FooterText as component };
    }
    namespace FooterNavBar {
        export { FooterNavBar as component };
    }
    namespace FooterCopyright {
        export { FooterCopyright as component };
    }
    namespace FooterNavLink {
        export { FooterNavLink as component };
    }
    namespace FormattedCurrency {
        export { FormattedCurrency as component };
    }
    namespace FormattedDate {
        export { FormattedDate as component };
    }
    namespace FormattedDateRange {
        export { FormattedDateRange as component };
    }
    namespace FormattedNumber {
        export { FormattedNumber as component };
    }
    namespace Fragment {
        const component: React.ExoticComponent<{
            children?: React.ReactNode;
        }>;
    }
    namespace Grid {
        export { Grid as component };
    }
    namespace GridItem {
        export { GridItem as component };
    }
    namespace GridLayout {
        export { GridLayout as component };
    }
    namespace ColumnsLayout {
        export { ColumnsLayout as component };
    }
    namespace Icon {
        export { Icon as component };
    }
    namespace Image {
        export { Image as component };
    }
    namespace ImageRadioButton {
        export { ImageRadioButtonField as component };
    }
    namespace InfoLabel {
        export { InfoLabel as component };
    }
    namespace InlineNotification {
        export { InlineNotification as component };
    }
    namespace Input {
        export { InputField as component };
    }
    namespace InputMask {
        export { InputMaskField as component };
    }
    namespace InputNumber {
        export { InputNumberField as component };
    }
    namespace PhoneNumber {
        export { PhoneNumberField as component };
    }
    namespace FileUpload {
        export { FileUploadField as component };
    }
    namespace Link {
        export { Link as component };
    }
    namespace Loader {
        export { Loader as component };
    }
    namespace Lookup {
        export { LookupField as component };
    }
    namespace GlobalizationChooser {
        export { GlobalizationChooser as component };
    }
    namespace MapArea {
        export { MapArea as component };
    }
    namespace NotificationAction {
        export { NotificationAction as component };
    }
    namespace NumberValue {
        export { NumberValue as component };
    }
    namespace RadioButtonCard {
        export { RadioButtonCardField as component };
    }
    namespace RadioButton {
        export { RadioButtonField as component };
    }
    namespace DropdownSelect {
        export { DropdownSelectField as component };
    }
    namespace Stepper {
        export { StepperField as component };
    }
    namespace Switch {
        export { SwitchField as component };
    }
    namespace Slider {
        export { Slider as component };
    }
    namespace TabSet {
        export { TabSet as component };
    }
    namespace Tab {
        export { Tab as component };
    }
    namespace TextArea {
        export { TextAreaField as component };
    }
    namespace ThemeChooser {
        export { ThemeChooser as component };
    }
    namespace TypeaheadMultiSelect {
        export { TypeaheadMultiSelectField as component };
    }
    namespace Date {
        export { DateField as component };
    }
    namespace DateTime {
        export { DateTimeField as component };
    }
    namespace DateTimeZone {
        export { DateTimeZoneField as component };
    }
    namespace Year {
        export { YearField as component };
    }
    namespace Panel {
        export { Panel as component };
    }
    namespace Header {
        export { Header as component };
    }
    namespace HeaderActions {
        export { HeaderActions as component };
    }
    namespace LogoTitle {
        export { LogoTitle as component };
    }
    namespace TopNavigation {
        export { TopNavigation as component };
    }
    namespace SideNavigation {
        export { SideNavigation as component };
    }
    namespace StickyFooter {
        export { StickyFooter as component };
    }
    namespace InlineLoader {
        export { InlineLoader as component };
    }
    namespace IFrame {
        export { IFrame as component };
    }
    namespace IntlElement {
        export { IntlElement as component };
    }
    namespace Tag {
        export { Tag as component };
    }
    namespace TagCollection {
        export { TagCollection as component };
    }
    namespace HelpHeading {
        export { HelpHeading as component };
    }
    namespace HelpParagraph {
        export { HelpParagraph as component };
    }
    namespace HelpLink {
        export { HelpLink as component };
    }
    namespace SimpleProgressBar {
        export { SimpleProgressBar as component };
    }
    namespace PhaseProgressBar {
        export { PhaseProgressBar as component };
    }
    namespace StepProgressBar {
        export { StepProgressBar as component };
    }
    namespace IntlPhoneNumber {
        export { IntlPhoneNumberField as component };
    }
    namespace DateRange {
        export { DateRangeField as component };
    }
    namespace ErrorBoundary {
        export { ErrorBoundary as component };
    }
    namespace FormattedPhoneNumber {
        export { FormattedPhoneNumber as component };
    }
    namespace PhoneNumberValue {
        export { PhoneNumberValue as component };
    }
}
export const lowercaseSimpleNamedComponentMap: {};
import { ToggleField } from "@jutro/components";
import { CheckboxField } from "@jutro/components";
import { CurrencyField } from "@jutro/components";
import { InputNumberField } from "@jutro/components";
import { RadioButtonField } from "@jutro/components";
import { DropdownSelectField } from "@jutro/components";
import { InputField } from "@jutro/components";
import { PhoneNumberField } from "@jutro/components";
import { TextAreaField } from "@jutro/components";
import { DateField } from "@jutro/components";
import { YearField } from "@jutro/components";
import { Accordion as Accordion_1 } from "@jutro/components";
import { AccordionCard as AccordionCard_1 } from "@jutro/components";
import { AddressDisplay as AddressDisplay_1 } from "@jutro/components";
import { AsyncLink as AsyncLink_1 } from "@jutro/router";
import { AsyncButtonLink as AsyncButtonLink_1 } from "@jutro/router";
import { Avatar as Avatar_1 } from "@jutro/components";
import { Badge as Badge_1 } from "@jutro/components";
import { Breadcrumb as Breadcrumb_1 } from "@jutro/components";
import { Button as Button_1 } from "@jutro/components";
import { ButtonLink as ButtonLink_1 } from "@jutro/router";
import { IconButton as IconButton_1 } from "@jutro/components";
import { Card as Card_1 } from "@jutro/components";
import { ClickableCard as ClickableCard_1 } from "@jutro/components";
import { CheckboxGroupField } from "@jutro/components";
import { Chevron as Chevron_1 } from "@jutro/components";
import { ColorPicker as ColorPicker_1 } from "@jutro/components";
import { ColorSwatch as ColorSwatch_1 } from "@jutro/components";
import { CurrencyValue as CurrencyValue_1 } from "@jutro/components";
import { DateValue as DateValue_1 } from "@jutro/components";
import { DropdownMenu as DropdownMenu_1 } from "@jutro/router";
import { DropdownMenuAvatar as DropdownMenuAvatar_1 } from "@jutro/router";
import { DropdownMenuButton as DropdownMenuButton_1 } from "@jutro/router";
import { DropdownMenuHeader as DropdownMenuHeader_1 } from "@jutro/router";
import { DropdownMenuLink as DropdownMenuLink_1 } from "@jutro/router";
import { DropdownMenuSeparator as DropdownMenuSeparator_1 } from "@jutro/router";
import { FieldIcon as FieldIcon_1 } from "@jutro/components";
import { FieldValue as FieldValue_1 } from "@jutro/components";
import { Flex as Flex_1 } from "@jutro/layout";
import { FlexItem as FlexItem_1 } from "@jutro/layout";
import { Footer as Footer_1 } from "@jutro/components";
import { FooterText as FooterText_1 } from "@jutro/components";
import { FooterNavBar as FooterNavBar_1 } from "@jutro/components";
import { FooterCopyright as FooterCopyright_1 } from "@jutro/components";
import { FooterNavLink as FooterNavLink_1 } from "@jutro/components";
import { FormattedCurrency as FormattedCurrency_1 } from "@jutro/components";
import { FormattedDate as FormattedDate_1 } from "@jutro/components";
import { FormattedDateRange as FormattedDateRange_1 } from "@jutro/components";
import { FormattedNumber as FormattedNumber_1 } from "@jutro/components";
import React from "react";
import { Grid as Grid_1 } from "@jutro/layout";
import { GridItem as GridItem_1 } from "@jutro/layout";
import { GridLayout as GridLayout_1 } from "@jutro/layout";
import { ColumnsLayout as ColumnsLayout_1 } from "@jutro/layout";
import { Icon as Icon_1 } from "@jutro/components";
import { Image as Image_1 } from "@jutro/components";
import { ImageRadioButtonField } from "@jutro/components";
import { InfoLabel as InfoLabel_1 } from "@jutro/components";
import { InlineNotification as InlineNotification_1 } from "@jutro/components";
import { InputMaskField } from "@jutro/components";
import { FileUploadField } from "@jutro/components";
import { Link as Link_1 } from "@jutro/components";
import { Loader as Loader_1 } from "@jutro/components";
import { LookupField } from "@jutro/components";
import { GlobalizationChooser as GlobalizationChooser_1 } from "@jutro/components";
import { MapArea as MapArea_1 } from "@jutro/components";
import { NotificationAction as NotificationAction_1 } from "@jutro/components";
import { NumberValue as NumberValue_1 } from "@jutro/components";
import { RadioButtonCardField } from "@jutro/components";
import { StepperField } from "@jutro/components";
import { SwitchField } from "@jutro/components";
import { Slider as Slider_1 } from "@jutro/components";
import { TabSet as TabSet_1 } from "@jutro/components";
import { Tab as Tab_1 } from "@jutro/components";
import { ThemeChooser as ThemeChooser_1 } from "@jutro/components";
import { TypeaheadMultiSelectField } from "@jutro/components";
import { DateTimeField } from "@jutro/components";
import { DateTimeZoneField } from "@jutro/components";
import { Panel as Panel_1 } from "@jutro/components";
import { Header as Header_1 } from "@jutro/components";
import { HeaderActions as HeaderActions_1 } from "@jutro/components";
import { LogoTitle as LogoTitle_1 } from "@jutro/components";
import { TopNavigation as TopNavigation_1 } from "@jutro/router";
import { SideNavigation as SideNavigation_1 } from "@jutro/router";
import { StickyFooter as StickyFooter_1 } from "@jutro/components";
import { InlineLoader as InlineLoader_1 } from "@jutro/components";
import { IFrame as IFrame_1 } from "@jutro/components";
import { IntlElement as IntlElement_1 } from "@jutro/components";
import { Tag as Tag_1 } from "@jutro/components";
import { TagCollection as TagCollection_1 } from "@jutro/components";
import { HelpHeading as HelpHeading_1 } from "@jutro/components";
import { HelpParagraph as HelpParagraph_1 } from "@jutro/components";
import { HelpLink as HelpLink_1 } from "@jutro/components";
import { SimpleProgressBar as SimpleProgressBar_1 } from "@jutro/components";
import { PhaseProgressBar as PhaseProgressBar_1 } from "@jutro/components";
import { StepProgressBar as StepProgressBar_1 } from "@jutro/components";
import { IntlPhoneNumberField } from "@jutro/components";
import { DateRangeField } from "@jutro/components";
import { ErrorBoundary as ErrorBoundary_1 } from "@jutro/components";
import { FormattedPhoneNumber as FormattedPhoneNumber_1 } from "@jutro/components";
import { PhoneNumberValue as PhoneNumberValue_1 } from "@jutro/components";

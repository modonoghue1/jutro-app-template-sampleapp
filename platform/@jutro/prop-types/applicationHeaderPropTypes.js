import PropTypes from"prop-types";import{dropdownMenuLinkPropTypes}from"./dropdownMenuLinkPropTypes";import{availableValuesIdDisplayNameObject}from"./availableValuePropTypes";import{intlMessageShape}from"./intlMessageShape";import{appSwitcherItemsObject}from"./appSwitcherRoutePropTypes";import{linkShape}from"./linkShape";import{avatarShape}from"./avatarPropTypes";import{routesShape}from"./routePropTypes";const lookupOptionShape=PropTypes.shape({...availableValuesIdDisplayNameObject,type:PropTypes.string.isRequired}),dropdownMenuLinkShape=PropTypes.shape({...dropdownMenuLinkPropTypes,title:intlMessageShape});export const applicationHeaderPropTypes={className:PropTypes.string,logoSrc:PropTypes.string,logoUrl:PropTypes.string,logoTitle:intlMessageShape,onSearchValueChange:PropTypes.func,onLoadValues:PropTypes.func,searchAvailableValues:PropTypes.arrayOf(lookupOptionShape.isRequired),showNotifications:PropTypes.bool,notificationChildren:PropTypes.node,showAvatar:PropTypes.bool,avatarChildren:PropTypes.node,avatarProps:avatarShape,commonAvatarRoutes:PropTypes.arrayOf(dropdownMenuLinkShape.isRequired),searchFieldPlaceholder:intlMessageShape,showAppSwitcher:PropTypes.bool,appSwitcherItems:appSwitcherItemsObject,useAuthInfo:PropTypes.bool,showHelp:PropTypes.bool,helpUrl:PropTypes.oneOfType([intlMessageShape,linkShape]),helpPopoverItems:PropTypes.arrayOf(PropTypes.object),callbackMap:PropTypes.shape({}),appSwitcherFooterText:intlMessageShape,appSwitcherFooterUrl:intlMessageShape,onAppSwitcherFooterClick:PropTypes.func,appSwitcherSearchEnabled:PropTypes.bool,appSwitcherCollapsibleGroupsThreshold:PropTypes.number,appSwitcherHideFooter:PropTypes.bool,burgerMenuRoutes:routesShape};
import{warning}from"@jutro/logger";const loggedMessages=new Set;export const logDeprecationMessage=(deprecated,alternative,extraMessage="",dropTargetVersion)=>{let message=`${deprecated} has been deprecated.`;alternative&&(message+=` Please use ${alternative} instead.`),extraMessage&&(message+=` ${extraMessage}`),dropTargetVersion&&(message+=` It will be removed in the "${dropTargetVersion}" Jutro release.`),loggedMessages.has(message)||(loggedMessages.add(message),warning(message,{bold:!0}))};
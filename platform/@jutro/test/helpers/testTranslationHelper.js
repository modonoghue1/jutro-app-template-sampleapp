import{TEST_TRANSLATION_PREFIX}from"./translationHelpers";export function getTranslation(input){return"string"==typeof input?`${TEST_TRANSLATION_PREFIX}${input}`:`${TEST_TRANSLATION_PREFIX}${input.defaultMessage}`}
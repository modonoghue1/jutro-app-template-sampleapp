import isString from"lodash/isString";export const sortWithLocale=language=>(a,b)=>isString(a)&&isString(b)?new Intl.Collator(language).compare(a,b):a>b?1:a<b?-1:0;
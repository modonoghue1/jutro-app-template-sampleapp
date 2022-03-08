import omit from"lodash/omit";import findKey from"lodash/findKey";import{COLLAPSE,TOGGLE,COLLAPSE_ALL}from"./types";export function reducer(state,{type:type,payload:payload}){switch(type){case COLLAPSE:{const viewIndex=findKey(state,(({rowId:rowId})=>rowId===payload));return void 0===viewIndex?state:omit(state,[viewIndex])}case TOGGLE:{const rowId=payload.rowId,viewIndex=payload.viewIndex,oldExpanded=payload.allowMultiple?state:{};return state[viewIndex]?omit(state,[viewIndex]):{...oldExpanded,[viewIndex]:{rowId:rowId}}}case COLLAPSE_ALL:return{};default:return state}}
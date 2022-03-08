import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import{useAccessibility}from"../state/accessibility/useAccessibility";import{getA11yTrGroupProps,getA11yTrProps,getA11yTableProps,getA11yTheadThPropsSortableHeader,getA11yTheadThPropsHeader,getA11yTdProps}from"./accessibilityProps.js";const getInitialColumn=(selectionType,isExpandable)=>{let initialColumn=0;return"none"===selectionType&&isExpandable||"single"===selectionType&&isExpandable?initialColumn=1:"single"===selectionType&&isExpandable&&(initialColumn=2),initialColumn};export const useAccessibilityProps=({selectionType:selectionType,isExpandable:isExpandable,tableId:tableId,sorted:sorted,tableLabel:tableLabel})=>{const _useAccessibility=useAccessibility({focused:{row:0,column:getInitialColumn(selectionType,isExpandable),columnId:void 0}}),_useAccessibility2=_slicedToArray(_useAccessibility,2),focused=_useAccessibility2[0].focused,setFocused=_useAccessibility2[1].setFocused;return{getA11yTrGroupProps:getA11yTrGroupProps,getA11yTrProps:getA11yTrProps,getA11yTableProps:getA11yTableProps(tableLabel),getA11yTheadThPropsSortableHeader:getA11yTheadThPropsSortableHeader(tableId,sorted,focused,setFocused),getA11yTheadThPropsHeader:getA11yTheadThPropsHeader(tableId,focused,setFocused),getA11yTdProps:getA11yTdProps(tableId,focused,setFocused)}};
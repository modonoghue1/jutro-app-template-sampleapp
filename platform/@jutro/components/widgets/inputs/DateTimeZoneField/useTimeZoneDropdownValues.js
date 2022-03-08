import{useMemo,useContext}from"react";import{TranslatorContext}from"@jutro/locale";import{timezones}from"./timezones";import{messages}from"./DateTimeZoneField.messages";const currentTimeZone=(new Intl.DateTimeFormat).resolvedOptions().timeZone,isCurrentIanaInTimeZone=({name:name,group:group})=>name===currentTimeZone||group.includes(currentTimeZone);export const useTimeZoneDropdownValues=timezoneIncludeList=>{const translator=useContext(TranslatorContext),filteredTimeZones=useMemo((()=>(timezoneIncludeList=>{const timezoneList=Object.keys(timezones).map((key=>({name:key,group:timezones[key]})));return null!=timezoneIncludeList&&timezoneIncludeList.length?timezoneList.filter((timezone=>timezoneIncludeList.includes(timezone.name))):timezoneList})(timezoneIncludeList)),[timezoneIncludeList]);return useMemo((()=>{var _filteredTimeZones$fi;const timezoneValue=null===(_filteredTimeZones$fi=filteredTimeZones.find(isCurrentIanaInTimeZone))||void 0===_filteredTimeZones$fi?void 0:_filteredTimeZones$fi.name,timezoneValues=filteredTimeZones.map((({name:name})=>({code:name,name:translator(messages[name])})));return timezoneValue?[timezoneValue,timezoneValues]:[currentTimeZone,[...timezoneValues,{code:currentTimeZone,name:messages[currentTimeZone]}]]}),[filteredTimeZones,translator])};
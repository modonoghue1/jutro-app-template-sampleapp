import get from"lodash/get";import isEmpty from"lodash/isEmpty";import set from"lodash/set";import has from"lodash/has";import{warning}from"@jutro/logger";import{simpleDatatypeComponentMap}from"../render/componentMap";export function extractSubSchema(schema,targetDefinition,schemaProps){const isOpenAPI=!!schema.openapi,targetRef=function(schema,targetDefinition,isOpenAPI){if(isOpenAPI){var _schema$components;if(null!=schema&&null!==(_schema$components=schema.components)&&void 0!==_schema$components&&_schema$components["x-gw-superSchemas"]){const targetRef=`#/components/x-gw-superSchemas/${targetDefinition}`,refPath=refToPath(targetRef,2);if(has(schema,refPath))return targetRef}return`#/components/schemas/${targetDefinition}`}return`#/definitions/${targetDefinition}`}(schema,targetDefinition.replace(/\//g,"~1"),isOpenAPI),newSchema={$schema:"http://json-schema.org/draft-07/schema#",...schemaProps,type:"object",$ref:targetRef};isOpenAPI?(newSchema.openapi=schema.openapi,newSchema.components={schemas:{}},gatherReferences(targetRef,schema.components,newSchema.components,isOpenAPI)):(newSchema.swagger=schema.swagger,newSchema.definitions={},gatherReferences(targetRef,schema.definitions,newSchema.definitions,isOpenAPI));const refPath=refToPath(targetRef,2),mainDefinition=get(newSchema,refPath);if(!isEmpty(mainDefinition))return newSchema;warning(`Unable to create subschema for "${targetDefinition}"`)}function refToPath(ref,offset=0){return ref.replace(/\//g,".").replace(/~1/g,"/").substr(offset)}function gatherReferences(ref,source,target,isOpenAPI){const refPath=refToPath(ref,(isOpenAPI?"#/components/":"#/definitions/").length);if(get(target,refPath))return;const refProps=get(source,refPath);set(target,refPath,refProps||{}),refProps&&gatherReferencesForProperty(refProps,source,target,isOpenAPI)}function gatherReferencesForProperty(schemaProperty,source,target,isOpenAPI){var _schemaProperty$items;if(schemaProperty.$ref&&gatherReferences(schemaProperty.$ref,source,target,isOpenAPI),null!=schemaProperty&&null!==(_schemaProperty$items=schemaProperty.items)&&void 0!==_schemaProperty$items&&_schemaProperty$items.$ref&&gatherReferences(schemaProperty.items.$ref,source,target,isOpenAPI),schemaProperty.properties){Object.keys(schemaProperty.properties).forEach((key=>{gatherReferencesForProperty(schemaProperty.properties[key],source,target,isOpenAPI)}))}schemaProperty.additionalProperties&&gatherReferencesForProperty(schemaProperty.additionalProperties,source,target,isOpenAPI)}export function generateUIFromSchema(dataProps,contentLayout){return contentLayout||(contentLayout={component:"Grid",componentProps:{gap:"large"}}),{content:Object.keys(dataProps).filter((key=>has(simpleDatatypeComponentMap,dataProps[key].datatype)||dataProps[key].component)).map((dataKey=>({id:dataKey,type:"field",componentProps:{path:dataKey,label:dataKey}}))),contentLayout:contentLayout}}
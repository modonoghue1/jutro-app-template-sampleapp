import{Tracer,ExplicitContext,ConsoleRecorder,BatchRecorder,jsonEncoder}from"zipkin";import wrapFetch from"zipkin-instrumentation-fetch";import{HttpLogger}from"zipkin-transport-http";import{getConfigValue}from"@jutro/config";import{REQUEST_HANDLER_TYPE}from"../HttpRequestBuilder";const wrapWindowFetch=wrapFetch,JSON_V2=jsonEncoder.JSON_V2;export function zipkinTraceHandler(remoteServiceName,localServiceName,zipkinUrl,debug,fetchCall=globalThis.fetch){let recorder;const zipkinDebugConfigValue=getConfigValue("zipkinDebug"),zipkinUrlConfigValue=getConfigValue("JUTRO_ZIPKIN_URL");recorder=debug||zipkinDebugConfigValue?new ConsoleRecorder:zipkinUrl||zipkinUrlConfigValue?new BatchRecorder({logger:new HttpLogger({endpoint:zipkinUrl||(null==zipkinUrlConfigValue?void 0:zipkinUrlConfigValue.toString()),jsonEncoder:JSON_V2})}):{record:()=>{}};const zipkinLocalServiceNameConfigValue=getConfigValue("JUTRO_ZIPKIN_LOCAL_SERVICE_NAME"),tracer=new Tracer({ctxImpl:new ExplicitContext,recorder:recorder,localServiceName:localServiceName||(null==zipkinLocalServiceNameConfigValue?void 0:zipkinLocalServiceNameConfigValue.toString())});return{[REQUEST_HANDLER_TYPE.FETCH]:(url,options,theFetch=fetchCall)=>wrapWindowFetch(theFetch,{tracer:tracer,remoteServiceName:remoteServiceName})(url,options)}}
import{datadogLogs}from"@datadog/browser-logs";export default function loadDataDog(dataDogClientToken,dataDogservice,environment,jutroversion="6.5.0",dataDogSite="datadoghq.com"){datadogLogs.init({clientToken:dataDogClientToken,site:dataDogSite,env:`atmos-${environment}`,forwardErrorsToLogs:!0,sampleRate:100,version:jutroversion,service:dataDogservice})}
import{start as renderApp}from"@jutro/app";import{exposeMicroApp}from"./startMicroApp";export const start=(Main,launchProps={})=>{var _document$currentScri;null!==(_document$currentScri=document.currentScript)&&void 0!==_document$currentScri&&_document$currentScri.hasAttribute("micro-app-name")?exposeMicroApp(Main,launchProps):renderApp(Main,launchProps)};
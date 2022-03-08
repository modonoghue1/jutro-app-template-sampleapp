const fs = require('fs');
const JSON5 = require('json5');
const { camelCase, capitalize, get } = require('lodash');
const Handlebars = require('handlebars');

const classTemplatePath =
    './scripts/jutro/clientapiTemplates/class.js.handlebars';
const listTemplatePath =
    './scripts/jutro/clientapiTemplates/list.js.handlebars';
const createTemplatePath =
    './scripts/jutro/clientapiTemplates/create.js.handlebars';
const getTemplatePath = './scripts/jutro/clientapiTemplates/get.js.handlebars';
const patchTemplatePath =
    './scripts/jutro/clientapiTemplates/patch.js.handlebars';
const postTemplatePath =
    './scripts/jutro/clientapiTemplates/post.js.handlebars';
const deleteTemplatePath =
    './scripts/jutro/clientapiTemplates/delete.js.handlebars';
const unknownTemplatePath =
    './scripts/jutro/clientapiTemplates/unknown.js.handlebars';
const optsHandlingPath =
    './scripts/jutro/clientapiTemplates/optsHandling.js.handlebars';

function resolveReference(ref, schemaFile) {
    if (!ref) {
        return;
    }

    const refPath = ref.substr(2).replace(/\//g, '.');
    return get(schemaFile, refPath);
}

function resolveDataAttributesReference(ref, schemaFile) {
    if (!ref) {
        return;
    }

    let precedentType = resolveReference(ref, schemaFile);
    let dataRef;
    while (
        get(precedentType, 'properties.data.$ref') ||
        get(precedentType, 'properties.data.items.$ref')
    ) {
        dataRef =
            get(precedentType, 'properties.data.$ref') ||
            get(precedentType, 'properties.data.items.$ref');
        precedentType = resolveReference(dataRef, schemaFile);
    }
    const attrRef = get(precedentType, 'properties.attributes.$ref');
    const attrType = attrRef.substr(attrRef.lastIndexOf('/') + 1);
    return attrType;
}

function getParamsList(pathParams, schemaFile, paramInfoIn) {
    if (!pathParams || !schemaFile) {
        return [];
    }

    const paramsList = pathParams.reduce((list, value) => {
        const paramInfo = resolveReference(value.$ref, schemaFile);
        if (paramInfo.in === paramInfoIn) {
            let paramType = capitalize(paramInfo.schema.type);
            if (!paramType) paramType = '*';
            if (paramType === 'Array') {
                if (
                    paramInfo.in === 'query' &&
                    (value.$ref.split('/').pop() === 'include' ||
                        value.$ref.split('/').pop() === 'includeTotal' ||
                        value.$ref.split('/').pop() === 'pageSize')
                ) {
                    paramType = capitalize(paramInfo.schema.items?.type);
                } else {
                    paramType += `<${capitalize(
                        paramInfo.schema.items?.type
                    )}>`;
                }
            }
            paramType = new Handlebars.SafeString(paramType);
            list.push({
                name: paramInfo.name,
                description: paramInfo.description,
                type: paramType,
            });
        }
        return list;
    }, []);

    return paramsList;
}

function detectMethodType(pathInfo) {
    let docType;
    const methods = Object.keys(pathInfo).filter(
        method => method !== 'parameters'
    );
    if (methods.includes('get')) {
        const pageOffsetParam = pathInfo.get.parameters.filter(
            param => param.$ref === '#/components/parameters/pageOffset'
        );
        if (pageOffsetParam?.length) {
            methods.splice(methods.indexOf('get'), 1, 'getList');
        }
    }

    if (methods.includes('post')) {
        const createResponse = pathInfo.post.responses['201'];
        docType =
            pathInfo.post.requestBody?.content['multipart/form-data'] || false;
        if (createResponse) {
            methods.splice(methods.indexOf('post'), 1, 'postCreate');
        }
        const pageOffsetParam = pathInfo.post.parameters?.filter(
            param => param.$ref === '#/components/parameters/pageOffset'
        );
        if (pageOffsetParam?.length) {
            methods.splice(methods.indexOf('post'), 1, 'postList');
        }
    }
    if (methods.includes('patch')) {
        docType =
            pathInfo.patch.requestBody?.content['multipart/form-data'] || false;
    }

    return { methodType: methods, docType: docType };
}

function generateMethodUrl(path) {
    return path.replace(/{/g, `$\{`);
}

function generateStandardMethod(
    schemaFile,
    pathInfo,
    resourceType /** returned resource type */,
    path,
    docType = false,
    method /** 'get', 'post', 'patch' */,
    responseNum /** '200', '201', '204' */,
    messages /**  {responseDesc1: ..., responseDesc2: ..., requestDesc1:..., requestDesc2:... } */,
    templateFunction
) {
    let generatedMethod = '';
    const { parameters: pathParams = [] } = pathInfo;
    const {
        operationId,
        description,
        parameters: optsPathParams,
        requestBody,
        responses,
    } = pathInfo[method];

    // process method/operation params
    const methodParams = getParamsList(pathParams, schemaFile, 'path');
    const optsParams = getParamsList(optsPathParams, schemaFile, 'query');

    // process request body
    let requestRef = get(requestBody, 'content.application/json.schema.$ref');
    if (!requestRef)
        requestRef = get(
            requestBody,
            'content.multipart/form-data.schema.properties.metadata.$ref'
        );
    const requestType = resolveDataAttributesReference(requestRef, schemaFile);
    const requestInfo = requestBody
        ? {
              name: camelCase(requestType),
              description: `${
                  messages.requestDesc1 ? messages.requestDesc1 : ''
              }${requestType}${
                  messages.requestDesc2 ? messages.requestDesc2 : ''
              }`,
              type: requestType,
          }
        : undefined;

    // process response body
    const responseRef =
        get(responses?.[responseNum], 'content.application/json.schema.$ref') ||
        get(responses?.['200'], 'content.application/json.schema.$ref');
    const responseType =
        resourceType || resolveDataAttributesReference(responseRef, schemaFile);
    const responseInfo =
        responses?.[responseNum] || responses?.['200']
            ? {
                  description: `${
                      messages.responseDesc1 ? messages.responseDesc1 : ''
                  }${responseType}${
                      messages.responseDesc2 ? messages.responseDesc2 : ''
                  }`,
                  type: responseType,
                  unwrap: true,
              }
            : {
                  description: `Results of this action`,
                  type: 'boolean',
                  unwrap: false,
              };

    let inferredIdParam;
    if (method === 'patch') inferredIdParam = methodParams.pop().name;

    if (operationId) {
        generatedMethod += '\n';
        generatedMethod += templateFunction({
            methodName: operationId,
            methodPath: `${method.toUpperCase()} ${path}`,
            methodUrl: generateMethodUrl(path),
            methodParams,
            optsParams,
            description,
            docType,
            inferredIdParam,
            responseInfo,
            requestInfo,
        });
    }
    return generatedMethod;
}

function buildClientAPI(schemaFilePath, className, pathName) {
    let generatedMethods = '';
    const schemaFile = JSON5.parse(fs.readFileSync(schemaFilePath));

    const classTemplateFile = fs.readFileSync(classTemplatePath, 'utf8');
    const listTemplateFile = fs.readFileSync(listTemplatePath, 'utf8');
    const createTemplateFile = fs.readFileSync(createTemplatePath, 'utf8');
    const getTemplateFile = fs.readFileSync(getTemplatePath, 'utf8');
    const patchTemplateFile = fs.readFileSync(patchTemplatePath, 'utf8');
    const postTemplateFile = fs.readFileSync(postTemplatePath, 'utf8');
    const deleteTemplateFile = fs.readFileSync(deleteTemplatePath, 'utf8');
    const unknownTemplateFile = fs.readFileSync(unknownTemplatePath, 'utf8');
    const optsHandlingFile = fs.readFileSync(optsHandlingPath, 'utf8');

    Handlebars.registerHelper('curly_bracket', (object, open) =>
        open ? '{' : '}'
    );
    Handlebars.registerHelper('if_equals', function (arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });

    const classTemplate = Handlebars.compile(classTemplateFile, {
        noEscape: true,
    });
    const listTemplate = Handlebars.compile(listTemplateFile);
    const createTemplate = Handlebars.compile(createTemplateFile);
    const getTemplate = Handlebars.compile(getTemplateFile);
    const patchTemplate = Handlebars.compile(patchTemplateFile);
    const postTemplate = Handlebars.compile(postTemplateFile);
    const deleteTemplate = Handlebars.compile(deleteTemplateFile);
    const unknownTemplate = Handlebars.compile(unknownTemplateFile);

    Handlebars.registerPartial('optsHandling', optsHandlingFile);

    let paths;
    if (schemaFile.openapi) {
        const pathKeys = Object.keys(schemaFile.paths);
        paths = pathKeys.filter(path => path.startsWith(pathName));
    }

    paths.forEach(path => {
        const pathInfo = schemaFile.paths[path];
        const { methodType, docType } = detectMethodType(pathInfo);

        if (methodType.includes('getList')) {
            const resourceType = pathInfo.get['x-gw-childResourceType'];
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                resourceType,
                path,
                docType,
                'get',
                '200',
                { responseDesc1: 'the list matching ' },
                listTemplate
            );
        }

        if (methodType.includes('postList')) {
            const resourceType = pathInfo.post['x-gw-childResourceType'];
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                resourceType,
                path,
                'post',
                '200',
                {
                    requestDesc1: 'Attributes to pass into this operation (',
                    requestDesc2: ')',
                    responseDesc1: 'the list matching '
                },
                listTemplate
            );
        }

        if (methodType.includes('postCreate')) {
            const resourceType = pathInfo.post['x-gw-childResourceType'];
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                resourceType,
                path,
                docType,
                'post',
                '201',
                {
                    requestDesc1: 'The details of the ',
                    requestDesc2: ' to create',
                    responseDesc1: 'The details for the newly-created ',
                },
                createTemplate
            );
        }

        if (methodType.includes('get')) {
            const resourceType = pathInfo.get['x-gw-resourceType'];
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                resourceType,
                path,
                docType,
                'get',
                '200',
                {
                    responseDesc1: 'The ',
                    responseDesc2: ' matching the id',
                },
                getTemplate
            );
        }

        if (methodType.includes('post')) {
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                undefined,
                path,
                docType,
                'post',
                '201',
                {
                    requestDesc1: 'Attributes to pass into this operation (',
                    requestDesc2: ')',
                    responseDesc1: 'The details for the ',
                    responseDesc2: ' changed by this action',
                },
                postTemplate
            );
        }

        if (methodType.includes('patch')) {
            const resourceType = pathInfo.patch['x-gw-resourceType'];
            generatedMethods += generateStandardMethod(
                schemaFile,
                pathInfo,
                resourceType,
                path,
                docType,
                'patch',
                '200',
                {
                    requestDesc1: 'The change delta of the ',
                    requestDesc2: ' to update',
                    responseDesc1: 'The details for the updated ',
                },
                patchTemplate
            );
        }

        if (methodType.includes('delete')) {
            const { parameters: pathParams = [] } = pathInfo;
            const { operationId, description } = pathInfo.delete;
            const methodParams = getParamsList(pathParams, schemaFile, 'path');
            if (operationId) {
                generatedMethods += '\n';
                generatedMethods += deleteTemplate({
                    methodName: operationId,
                    methodPath: `DELETE ${path}`,
                    methodUrl: generateMethodUrl(path),
                    methodParams,
                    description,
                });
            }
        }

        if (methodType.includes('put')) {
            const { operationId, description } = pathInfo.put;
            if (operationId) {
                generatedMethods += '\n';
                generatedMethods += unknownTemplate({
                    methodName: operationId,
                    methodPath: `PUT ${path}`,
                    description,
                });
            }
        }
    });

    const actionMap = {};
    paths.forEach(path => {
        const pathInfo = schemaFile.paths[path];
        const methods = Object.keys(pathInfo).filter(
            method => method !== 'parameters'
        );
        const test = methods.reduce((obj, method) => {
            obj[method] = pathInfo[method].operationId;
            return obj;
        }, {});
        const parts = path.split('/');
        const newParts = parts.map(part => (part.startsWith('{') ? '*' : part));
        const generalizedPath = newParts.join('/');
        actionMap[generalizedPath] = test;
    });

    const generatedClass = classTemplate({
        name: className,
        methods: generatedMethods,
        actionMap: JSON.stringify(actionMap, null, 2),
    });

    return generatedClass;
}

module.exports = { buildClientAPI };

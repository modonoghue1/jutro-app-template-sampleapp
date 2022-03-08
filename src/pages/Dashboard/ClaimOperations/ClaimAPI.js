import { camelCase } from 'lodash';

function buildSearchString(params, append) {
    if (!params) {
        return '';
    }

    const fakeUrl = new URL('http://www.gw.com');
    Object.keys(params).forEach(key => {
        const param = params[key];
        if (Array.isArray(param)) {
            param.forEach(arrayValue =>
                fakeUrl.searchParams.append(key, arrayValue)
            );
        } else {
            fakeUrl.searchParams.append(key, param);
        }
    });
    return append ? `&${fakeUrl.search.substr(1)}` : fakeUrl.search;
}

const actionMap = {
    '/claims': {
        post: 'createClaim',
    },
    '/claims/*': {
        patch: 'patchClaim',
        delete: 'deleteClaim',
    },
    '/claims/*/close': {
        post: 'closeClaim',
    },
    '/claims/*/submit': {
        post: 'submitClaim',
    },
    '/claims/*/validate': {
        post: 'validate',
    },
    '/claims/*/activities': {
        post: 'createActivity',
    },
    '/claims/*/documents': {
        post: 'createClaimDocument',
    },
    '/claims/*/notes': {
        post: 'createClaimNote',
    },
};

function lookupAction(href, method) {
    return actionMap?.[href]?.[method];
}

function makeGenericHref(href) {
    const base = href?.substr('claims/v1'.length);
    const parts = base?.split('/');
    const newParts = parts.map(part => {
        if (part.includes(':')) {
            return '*';
        }
        return part;
    });
    if (newParts.length) {
        return newParts.join('/');
    }
    return href;
}

function unwrap(item, included) {
    const { attributes, checksum, related, links } = item;

    // look for links to update the allowed 'actions' for this item
    let actions;
    if (links) {
        actions = Object.keys(links).reduce((list, link) => {
            const test = links[link];
            const genericHref = makeGenericHref(test.href);
            if (link === 'self') {
                test.methods.forEach(method => {
                    if (method === 'get') {
                        return;
                    }

                    list.push(lookupAction(genericHref, method) || method);
                });
            } else {
                test.methods.forEach(method => {
                    if (method === 'get') {
                        return;
                    }

                    list.push(
                        lookupAction(genericHref, method) ||
                            camelCase(`create ${link}`)
                    );
                });
            }
            return list;
        }, []);
    }

    const unwrappedItem = {
        ...attributes,
        _checksum: checksum,
        _actions: actions,
    };

    if (related && included) {
        const relatedKeys = Object.keys(related);
        relatedKeys.forEach(relatedKey => {
            const relatedItem = related[relatedKey];
            const { id: relatedId, type: relatedType } = relatedItem.data[0];
            const unwrappedReference = included[relatedType].find(
                test2 => test2.id === relatedId
            );
            if (unwrappedReference) {
                unwrappedItem[relatedKey] = {
                    ...unwrappedItem[relatedKey],
                    _ref: unwrappedReference,
                };
            }
        });
    }
    return unwrappedItem;
}

export default class ClaimAPI {
    constructor(restService, baseUrl) {
        this.restService = restService;
        this.baseUrl = baseUrl;
    }

    /**
     * Retrieves a list of assigned claims
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don't want as well as to request optional fields that aren't included by default.  The parameter is of the form fields=<field list> or fields=<include>:<field list>.  The <field list> is a comma-separated list of fields desired on the response, and <include> indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The \"checksum\" and \"links\" properties are special and can be included by specifying \"$checksum\" and \"$links\" respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields=<field list>&fields=<include1>:<field list>&fields=<include2>:<field list>. Special values beginning with the '*' character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The '*default' set will include whatever set of the fields the endpoint would normally return if the \"fields\" query parameter wasn't specified. For example, specifying fields=firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields=default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other '' options are '*detail', '*summary', and '*all'. Properties on sub-objects can be selected via dot-separated paths, for example fields=assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. <include> can also represent a nested included resource, such as fields=activities.notes:subject,body.
     * @param {Array.<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter's value should be of the form <field>:<operator>:<value> or <include>:<field>:<operator>:<value>.  If the <include>: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include \"eq\", \"ne\", \"lt\", \"gt\", \"le\", \"ge\", \"in\", \"ni\", \"sw\", and \"cn\". Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be \"true\" or \"false\" and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a \":\" character, this character can be escaped with an additional \":\". For example, to compare against \"some:value\", the query parameter would take the form <field>:<operator>:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. <include> can also represent a nested included resource, such as filter=activities.notes:subject:cn:NoteSubject.
     * @param {Array.<String>} opts.include Indicates that the caller would like additional resources returned along with this call in the \"included\" section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include=vehicleincidents,mainContact&include=vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {Array.<String>} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal=<true|false> or includeTotal=<include>:<true|false>.  Specifying the <include>: prefix on the query parameter will apply the includeTotal option to the included list. <include> can also represent a nested included resource, such as includeTotal=activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the \"next\" and \"prev\" links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array.<String>} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize=<size> or pageSize=<include>:<size>, where <include> represents the name of an included resource.  For example, ?pageSize=100 will indicate that 100 resources should be returned, while ?include=activities&pageSize=activities:5 will indicate that 5 activities should be returned along with the response. <include> can also represent a nested included resource, such as pageSize=activities.notes:5.
     * @returns {Array.<Claim>} Array of claims
     *
     * @example
     * "GET /claim"
     */
    getClaims(opts) {
        // ?filter=state:in:open,closed,draft
        // ?filter=state:in:open,draft,closed
        // ?filter=state:eq:draft
        // &filter=assignedUser:eq:demo_sample::1
        // ;owned:ne:null

        const {
            fields,
            filters,
            includes,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};

        let search = '';
        if (filters) {
            search += buildSearchString({ filter: filters }, !!search);
        }
        if (includes) {
            search += buildSearchString({ include: includes }, !!search);
        }
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }

        const url = `${this.baseUrl}/claims${search}`;
        return this.restService.get(url).then(resultData => {
            let results;
            // if 'includes', then response has 'related' on each element that
            // refers to 'included'. Resolve references and return
            if (resultData?.included) {
                const includedKeys = Object.keys(resultData.included);
                includedKeys.forEach(key => {
                    resultData.included[key] = resultData.included[
                        key
                    ].map(item => unwrap(item));
                });
                results = resultData?.data?.map(item =>
                    unwrap(item, resultData.included)
                );
            } else {
                results = resultData?.data?.map(item => unwrap(item));
            }

            // wrap results if pagination/total is included
            if (pageOffset || pageSize || resultData?.total) {
                return {
                    offset: pageOffset ?? 0,
                    count: resultData?.count,
                    total: resultData?.total,
                    data: results,
                };
            }
            return results;
        });
    }

    createClaim(claim) {
        const url = `${this.baseUrl}/claims`;
        const { id, ...rest } = claim;
        const wrapper = {
            data: {
                attributes: { ...rest },
            },
        };
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Retrieve a claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don't want as well as to request optional fields that aren't included by default.  The parameter is of the form fields=<field list> or fields=<include>:<field list>.  The <field list> is a comma-separated list of fields desired on the response, and <include> indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The \"checksum\" and \"links\" properties are special and can be included by specifying \"$checksum\" and \"$links\" respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields=<field list>&fields=<include1>:<field list>&fields=<include2>:<field list>. Special values beginning with the '*' character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The '*default' set will include whatever set of the fields the endpoint would normally return if the \"fields\" query parameter wasn't specified. For example, specifying fields=firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields=default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other '' options are '*detail', '*summary', and '*all'. Properties on sub-objects can be selected via dot-separated paths, for example fields=assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. <include> can also represent a nested included resource, such as fields=activities.notes:subject,body.
     * @param {Array.<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter's value should be of the form <field>:<operator>:<value> or <include>:<field>:<operator>:<value>.  If the <include>: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include \"eq\", \"ne\", \"lt\", \"gt\", \"le\", \"ge\", \"in\", \"ni\", \"sw\", and \"cn\". Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be \"true\" or \"false\" and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a \":\" character, this character can be escaped with an additional \":\". For example, to compare against \"some:value\", the query parameter would take the form <field>:<operator>:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. <include> can also represent a nested included resource, such as filter=activities.notes:subject:cn:NoteSubject.
     * @param {Array.<String>} opts.include Indicates that the caller would like additional resources returned along with this call in the \"included\" section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include=vehicleincidents,mainContact&include=vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {Array.<String>} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal=<true|false> or includeTotal=<include>:<true|false>.  Specifying the <include>: prefix on the query parameter will apply the includeTotal option to the included list. <include> can also represent a nested included resource, such as includeTotal=activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the \"next\" and \"prev\" links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array.<String>} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize=<size> or pageSize=<include>:<size>, where <include> represents the name of an included resource.  For example, ?pageSize=100 will indicate that 100 resources should be returned, while ?include=activities&pageSize=activities:5 will indicate that 5 activities should be returned along with the response. <include> can also represent a nested included resource, such as pageSize=activities.notes:5.
     * @returns {Claim} a claim
     */
    getClaim(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    patchClaim(claim) {
        const {
            id: claimId,
            _checksum: checksum,
            _actions: actions,
            ...claimAttributes
        } = claim;
        const url = `${this.baseUrl}/claims/${claimId}`;
        const test = { id: claimId, ...claimAttributes };
        const wrapper = {
            data: {
                attributes: test,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    cancelClaim(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}/cancel`;
        return this.restService.post(url);
    }

    closeClaim(claimId, closeAttrs) {
        const url = `${this.baseUrl}/claims/${claimId}/close`;
        const wrapper = closeAttrs
            ? {
                  data: {
                      attributes: closeAttrs,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    submitClaim(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}/submit`;
        return this.restService.post(url).then(result => unwrap(result?.data));
    }

    validateClaim(claimId, validateAttrs) {
        const url = `${this.baseUrl}/claims/${claimId}/validate`;
        const wrapper = validateAttrs
            ? {
                  data: {
                      attributes: validateAttrs,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    deleteClaim(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}`;
        return this.restService
            .delete(url)
            .then(result => unwrap(result?.data));
    }

    getClaimActivities(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}/activities?sort=status,dueDate`;
        return this.restService
            .get(url)
            .then(resultData => resultData?.data?.map(item => unwrap(item)));
    }

    createClaimActivity(claimId, entity) {
        const url = `${this.baseUrl}/claims/${claimId}/activities`;
        const { id, ...rest } = entity;
        return this.restService.post(url, rest);
    }

    // claim details
    // path: "/claims/{claimId}/contacts"
    // path: "/claims/{claimId}/documents"
    // path: "/claims/{claimId}/injury-incidents"
    // path: "/claims/{claimId}/living-expenses-incidents"
    // path: "/claims/{claimId}/dwelling-incidents"
    // path: "/claims/{claimId}/fixed-property-incidents"
    // path: "/claims/{claimId}/vehicle-incidents"
    // path: "/claims/{claimId}/exposures"
    // path: "/claims/{claimId}/notes"
    // path: "/claims/{claimId}/policy"
    // path: "/claims/{claimId}/policy/coverage"
    // path: "/claims/{claimId}/policy/endorsements"
    // path: "/claims/{claimId}/policy/locations"
    // path: "/claims/{claimId}/related-objects"
    // path: "/claims/{claimId}/service-requests"

    // claim actions
    // path: "/claims/{claimId}/submit"
    // path: "/claims/{claimId}/validate"
    // path: "/claims/{claimId}/cancel"

    getClaimContacts(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}/contacts`;
        return this.restService
            .get(url)
            .then(resultData => resultData?.data?.map(item => unwrap(item)));
    }

    getClaimNotes(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}/notes`;
        return this.restService
            .get(url)
            .then(resultData => resultData?.data?.map(item => unwrap(item)));
    }

    getClaimVehicleIncidents(claimId) {
        const url = `${this.baseUrl}/claims/${claimId}//vehicle-incidents`;
        return this.restService
            .get(url)
            .then(resultData => resultData?.data?.map(item => unwrap(item)));
    }

    searchClaims(claimInfo) {
        const url = `${this.baseUrl}/search/claims`;
        const wrapper = {
            data: {
                attributes: { ...claimInfo },
            },
        };
        return this.restService
            .post(url, wrapper)
            .then(resultData => resultData?.data?.map(item => unwrap(item)));
    }

    formatApiError(ex) {
        if (
            ex?.errorCode ===
            'gw.api.modules.rest.framework.v1.exceptions.ConcurrentModificationException'
        ) {
            return 'A newer version of this entity was found on the server. Please refresh and try your changes again';
        }
        const userMessage = ex?.userMessage || ex?.message;
        const developerMessage = ex?.developerMessage;
        const detailMessages = ex?.details
            ?.map(part => part.message)
            .join('\n');
        const messages = [userMessage, developerMessage, detailMessages].filter(
            a => a
        );
        return messages.join('\n');
    }
}

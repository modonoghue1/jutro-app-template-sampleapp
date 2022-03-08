import { warning } from '@jutro/logger';
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

export const waitForClaims = async (request, shouldExit, data, retries = 4) => {
    try {
        const claims = await request();
        if (retries > 0 && !shouldExit(claims)) {
            waitForClaims(request, shouldExit, data, --retries);
        } else {
            return data;
        }
    } catch (err) {
        warning(err);
        return data;
    }
};

const actionMap = {
    '/claims/*/assign': {
        post: 'assignClaim',
    },
    '/claims': {
        get: 'getClaims',
        post: 'createClaim',
    },
    '/claims/*': {
        get: 'getClaim',
        patch: 'patchClaim',
    },
    '/claims/*/activities': {
        get: 'getClaimActivities',
        post: 'createClaimActivity',
    },
    '/claims/*/activity-assignees': {
        get: 'getClaimActivityAssignees',
    },
    '/claims/*/activity-patterns': {
        get: 'getClaimActivityPatterns',
    },
    '/claims/*/cancel': {
        post: 'cancel',
    },
    '/claims/*/close': {
        post: 'closeClaim',
    },
    '/claims/*/contact-role-owners': {
        get: 'getClaimContactRoleOwners',
    },
    '/claims/*/contacts': {
        get: 'getClaimContacts',
        post: 'createClaimContact',
    },
    '/claims/*/contacts/*': {
        delete: 'deleteClaimContact',
        get: 'getClaimContact',
        patch: 'patchClaimContact',
    },
    '/claims/*/documents': {
        get: 'getClaimDocuments',
        post: 'createClaimDocument',
    },
    '/claims/*/documents/*': {
        delete: 'deleteClaimDocument',
        get: 'getClaimDocument',
        patch: 'patchClaimDocument',
    },
    '/claims/*/documents/*/content': {
        get: 'getDocumentContent',
    },
    '/claims/*/dwelling-incidents': {
        get: 'getDwellingIncidents',
        post: 'createClaimDwellingIncident',
    },
    '/claims/*/dwelling-incidents/*': {
        get: 'getDwellingIncident',
        patch: 'patchDwellingIncident',
    },
    '/claims/*/exposures': {
        get: 'getClaimExposures',
        post: 'createClaimExposure',
    },
    '/claims/*/exposures/*': {
        delete: 'deleteExposure',
        get: 'getExposure',
        patch: 'patchExposure',
    },
    '/claims/*/exposures/*/close': {
        post: 'closeExposure',
    },
    '/claims/*/exposures/*/validate': {
        post: 'validateExposure',
    },
    '/claims/*/fixed-property-incidents': {
        get: 'getClaimFixedPropertyIncidents',
        post: 'createClaimFixedPropertyIncident',
    },
    '/claims/*/fixed-property-incidents/*': {
        delete: 'deleteFixedPropertyIncident',
        get: 'getFixedPropertyIncident',
        patch: 'patchFixedPropertyIncident',
    },
    '/claims/*/injury-incidents': {
        get: 'getClaimInjuryIncidents',
        post: 'createClaimInjuryIncident',
    },
    '/claims/*/injury-incidents/*': {
        delete: 'deleteInjuryIncident',
        get: 'getInjuryIncident',
        patch: 'patchInjuryIncident',
    },
    '/claims/*/living-expenses-incidents': {
        get: 'getLivingExpensesIncidents',
        post: 'createClaimLivingExpensesIncident',
    },
    '/claims/*/living-expenses-incidents/*': {
        get: 'getLivingExpensesIncident',
        patch: 'patchLivingExpensesIncident',
    },
    '/claims/*/notes': {
        get: 'getClaimNotes',
        post: 'createClaimNote',
    },
    '/claims/*/policy': {
        get: 'getPolicy',
    },
    '/claims/*/policy/coverages': {
        get: 'getPolicyCoverages',
    },
    '/claims/*/policy/coverages/*': {
        get: 'getPolicyCoverage',
    },
    '/claims/*/policy/endorsements': {
        get: 'getPolicyEndorsements',
    },
    '/claims/*/policy/endorsements/*': {
        get: 'getPolicyEndorsement',
    },
    '/claims/*/policy/location-based-risk-units': {
        get: 'getLocationBasedRiskUnits',
    },
    '/claims/*/policy/location-based-risk-units/*': {
        get: 'getLocationBasedRiskUnit',
    },
    '/claims/*/policy/locations': {
        get: 'getPolicyLocations',
    },
    '/claims/*/policy/locations/*': {
        get: 'getPolicyLocation',
    },
    '/claims/*/policy/vehicle-risk-units': {
        get: 'getVehicleRiskUnits',
    },
    '/claims/*/policy/vehicle-risk-units/*': {
        get: 'getVehicleRiskUnit',
    },
    '/claims/*/related-objects': {
        get: 'getClaimRelatedObjects',
    },
    '/claims/*/service-requests': {
        get: 'getServiceRequestsForClaim',
        post: 'addServiceRequestToClaim',
    },
    '/claims/*/service-requests/*': {
        get: 'getServiceRequest',
        patch: 'changeServiceRequest',
    },
    '/claims/*/service-requests/*/accept': {
        post: 'acceptServiceRequest',
    },
    '/claims/*/service-requests/*/assign': {
        post: 'assignServiceRequest',
    },
    '/claims/*/service-requests/*/cancel': {
        post: 'cancelServiceRequest',
    },
    '/claims/*/service-requests/*/complete-work': {
        post: 'completeRequestedWork',
    },
    '/claims/*/service-requests/*/decline': {
        post: 'declineServiceRequest',
    },
    '/claims/*/service-requests/*/internal-cancel': {
        post: 'internalCancelServiceRequest',
    },
    '/claims/*/service-requests/*/invoices': {
        get: 'getServiceRequestInvoices',
        post: 'addInvoice',
    },
    '/claims/*/service-requests/*/invoices/*': {
        get: 'getInvoice',
    },
    '/claims/*/service-requests/*/invoices/*/withdraw': {
        post: 'withdrawInvoice',
    },
    '/claims/*/service-requests/*/submit': {
        post: 'submitServiceRequest',
    },
    '/claims/*/submit': {
        post: 'submitClaim',
    },
    '/claims/*/validate': {
        post: 'validate',
    },
    '/claims/*/vehicle-incidents': {
        get: 'getClaimVehicleIncidents',
        post: 'createClaimVehicleIncident',
    },
    '/claims/*/vehicle-incidents/*': {
        delete: 'deleteVehicleIncident',
        get: 'getVehicleIncident',
        patch: 'patchVehicleIncident',
    },
    '/notes/*': {
        delete: 'deleteNote',
        get: 'getNote',
        patch: 'updateNote',
    },
};

function lookupAction(href, method) {
    return actionMap?.[href]?.[method];
}

function makeGenericHref(href) {
    const [one, two] = href?.substr(1)?.split('/') ?? [];
    const baseLength = one?.length + two?.length + 2;
    const base = href?.substr(baseLength);
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
        this.commonUrl = baseUrl.replace('claim', 'common');
        this.compositeUrl = baseUrl.replace('claim', 'composite');
    }

    /**
     * Retrieves a list of assigned claims
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Claim>} Array of The details for the newly-created Claim
     *
     * @example
     * "GET /claims"
     */
    getClaims(opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
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

    /**
     * Create a new draft claim
     * @param {Claim} claim The details of the Claim to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Claim} The details for the newly-created Claim
     *
     * @example
     * "POST /claims"
     */
    createClaim(claim, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims${search}`;
        const { id, ...rest } = claim;
        const wrapper = {
            data: {
                attributes: { ...rest },
            },
        };
        return this.restService.post(url, wrapper).then(result => {
            const claimData = unwrap(result?.data);
            this.assignClaim(claimData);
            const getCreatedClaims = () =>
                this.getClaims({
                    filter: [
                        'assignedUser:eq:demo_sample::1',
                        'state:eq:draft',
                    ],
                });
            const hasCreatedClaim = claims =>
                claims.some(({ id: _id }) => _id === claimData.id);
            return waitForClaims(getCreatedClaims, hasCreatedClaim, claimData);
        });
    }

    /**
     * Retrieve a claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Claim} The Claim matching the id
     *
     * @example
     * "GET /claims/{claimId}"
     */
    getClaim(claimId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update a claim
     * @param {Claim} claim The change delta of the Claim to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Claim} The details for the updated Claim
     *
     * @example
     * "PATCH /claims/{claimId}"
     */
    patchClaim(claim, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const { id, _checksum: checksum, _actions: actions, ...rest } = claim;
        const claimId = id;
        const url = `${this.baseUrl}/claims/${claimId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Returns a list of activities associated with this claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Activity>} Array of The details for the newly-created Activity
     *
     * @example
     * "GET /claims/{claimId}/activities"
     */
    getClaimActivities(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/activities${search}`;
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

    /**
     * Creates a new activity associated with this claim
     * @param {String} claimId The identifier for the claim
     * @param {Activity} activity The details of the Activity to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Activity} The details for the newly-created Activity
     *
     * @example
     * "POST /claims/{claimId}/activities"
     */
    createClaimActivity(claimId, activity, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/activities${search}`;
        const { id, ...rest } = activity;
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
     * The list of suggested people, groups, queues, etc. that new activities on this claim can be assigned to

     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Assignee>} Array of The details for the newly-created Assignee
     *
     * @example
     * "GET /claims/{claimId}/activity-assignees"
     */
    getClaimActivityAssignees(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/activity-assignees${search}`;
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

    /**
     * Returns a list of activity patterns that can be used to create activities on this claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<ActivityPattern>} Array of The details for the newly-created ActivityPattern
     *
     * @example
     * "GET /claims/{claimId}/activity-patterns"
     */
    getClaimActivityPatterns(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/activity-patterns${search}`;
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

    /**
     * Cancels and removes the given claim; only allowed on draft claims.
     * @param {String} claimId The identifier for the claim
     * @returns {boolean} Results of this action
     *
     * @example
     * "POST /claims/{claimId}/cancel"
     */
    cancel(claimId) {
        const search = '';
        const url = `${this.baseUrl}/claims/${claimId}/cancel${search}`;
        const wrapper = undefined;
        return this.restService.post(url, wrapper);
    }

    /**
     * Close this claim and transition it to the &#x27;closed&#x27; state
     * @param {String} claimId The identifier for the claim
     * @param {ClaimCloseRequestAttributes} claimCloseRequestAttributes Attributes to pass into this operation (ClaimCloseRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Claim} The details for the Claim changed by this action
     *
     * @example
     * "POST /claims/{claimId}/close"
     */
    closeClaim(claimId, claimCloseRequestAttributes, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/close${search}`;
        const wrapper = claimCloseRequestAttributes
            ? {
                  data: {
                      attributes: claimCloseRequestAttributes,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * The contact role owners associated with a given claim. This includes the claim, policy, incidents, exposures, matters, negotiations, and evaluations. Worker&#x27;s comp injury incidents are not included.

     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<GenericRelation>} Array of The details for the newly-created GenericRelation
     *
     * @example
     * "GET /claims/{claimId}/contact-role-owners"
     */
    getClaimContactRoleOwners(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/contact-role-owners${search}`;
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

    /**
     * The contacts associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<ClaimContact>} Array of The details for the newly-created ClaimContact
     *
     * @example
     * "GET /claims/{claimId}/contacts"
     */
    getClaimContacts(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/contacts${search}`;
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

    /**
     * Create a new contact on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {ClaimContact} claimContact The details of the ClaimContact to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ClaimContact} The details for the newly-created ClaimContact
     *
     * @example
     * "POST /claims/{claimId}/contacts"
     */
    createClaimContact(claimId, claimContact, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/contacts${search}`;
        const { id, ...rest } = claimContact;
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
     * The details of a specific contact
     * @param {String} claimId The identifier for the claim
     * @param {String} contactId The identifier for the contact
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {ClaimContact} The ClaimContact matching the id
     *
     * @example
     * "GET /claims/{claimId}/contacts/{contactId}"
     */
    getClaimContact(claimId, contactId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/contacts/${contactId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update the details of the specific contact on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {ClaimContact} claimContact The change delta of the ClaimContact to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ClaimContact} The details for the updated ClaimContact
     *
     * @example
     * "PATCH /claims/{claimId}/contacts/{contactId}"
     */
    patchClaimContact(claimId, claimContact, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = claimContact;
        const contactId = id;
        const url = `${this.baseUrl}/claims/${claimId}/contacts/${contactId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete a contact on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} contactId The identifier for the contact
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/contacts/{contactId}"
     */
    deleteClaimContact(claimId, contactId) {
        const url = `${this.baseUrl}/claims/${claimId}/contacts/${contactId}`;
        return this.restService.delete(url);
    }

    /**
     * The documents associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<ClaimDocument>} Array of The details for the newly-created ClaimDocument
     *
     * @example
     * "GET /claims/{claimId}/documents"
     */
    getClaimDocuments(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/documents${search}`;
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

    /**
     * Create a new document on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {Document} document The details of the Document to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ClaimDocument} The details for the newly-created ClaimDocument
     *
     * @example
     * "POST /claims/{claimId}/documents"
     */
    createClaimDocument(claimId, document, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/documents${search}`;

        const formData = new FormData();
        const { id, file, ...rest } = document;
        const wrapper = {
            data: {
                attributes: { ...rest },
            },
        };
        formData.append(
            'metadata',
            new Blob([JSON.stringify(wrapper)], { type: 'application/json' })
        );
        formData.append('content', file);
        return this.restService
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(result => unwrap(result?.data));
    }

    /**
     * The details of a specific document
     * @param {String} claimId The identifier for the claim
     * @param {String} documentId The identifier for the document
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {ClaimDocument} The ClaimDocument matching the id
     *
     * @example
     * "GET /claims/{claimId}/documents/{documentId}"
     */
    getClaimDocument(claimId, documentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/documents/${documentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update a document on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {Document} document The change delta of the Document to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ClaimDocument} The details for the updated ClaimDocument
     *
     * @example
     * "PATCH /claims/{claimId}/documents/{documentId}"
     */
    patchClaimDocument(claimId, document, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const formData = new FormData();
        const {
            id,
            file,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = document;
        const documentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/documents/${documentId}${search}`;
        const wrapper = {
            data: {
                attributes: { ...rest },
            },
        };
        formData.append(
            'metadata',
            new Blob([JSON.stringify(wrapper)], { type: 'application/json' })
        );
        formData.append('content', file);
        return this.restService
            .patch(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete a document on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} documentId The identifier for the document
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/documents/{documentId}"
     */
    deleteClaimDocument(claimId, documentId) {
        const url = `${this.baseUrl}/claims/${claimId}/documents/${documentId}`;
        return this.restService.delete(url);
    }

    /**
     * The contents of a document
     * @param {String} claimId The identifier for the claim
     * @param {String} documentId The identifier for the document
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {ClaimDocumentContent} The ClaimDocumentContent matching the id
     *
     * @example
     * "GET /claims/{claimId}/documents/{documentId}/content"
     */
    getDocumentContent(claimId, documentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/documents/${documentId}/content${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Retrieve dwelling incidents on a claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<DwellingIncident>} Array of The details for the newly-created DwellingIncident
     *
     * @example
     * "GET /claims/{claimId}/dwelling-incidents"
     */
    getDwellingIncidents(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/dwelling-incidents${search}`;
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

    /**
     * Create a new dwelling incident
     * @param {String} claimId The identifier for the claim
     * @param {DwellingIncident} dwellingIncident The details of the DwellingIncident to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {DwellingIncident} The details for the newly-created DwellingIncident
     *
     * @example
     * "POST /claims/{claimId}/dwelling-incidents"
     */
    createClaimDwellingIncident(claimId, dwellingIncident, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/dwelling-incidents${search}`;
        const { id, ...rest } = dwellingIncident;
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
     * Retrieve a dwelling incident
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {DwellingIncident} The DwellingIncident matching the id
     *
     * @example
     * "GET /claims/{claimId}/dwelling-incidents/{incidentId}"
     */
    getDwellingIncident(claimId, incidentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/dwelling-incidents/${incidentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update a dwelling incident
     * @param {String} claimId The identifier for the claim
     * @param {DwellingIncident} dwellingIncident The change delta of the DwellingIncident to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {DwellingIncident} The details for the updated DwellingIncident
     *
     * @example
     * "PATCH /claims/{claimId}/dwelling-incidents/{incidentId}"
     */
    patchDwellingIncident(claimId, dwellingIncident, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = dwellingIncident;
        const incidentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/dwelling-incidents/${incidentId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * The exposures associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Exposure>} Array of The details for the newly-created Exposure
     *
     * @example
     * "GET /claims/{claimId}/exposures"
     */
    getClaimExposures(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/exposures${search}`;
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

    /**
     * Create a new exposure on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {Exposure} exposure The details of the Exposure to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Exposure} The details for the newly-created Exposure
     *
     * @example
     * "POST /claims/{claimId}/exposures"
     */
    createClaimExposure(claimId, exposure, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/exposures${search}`;
        const { id, ...rest } = exposure;
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
     * The details of a specific exposure
     * @param {String} claimId The identifier for the claim
     * @param {String} exposureId The identifier for the exposure
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Exposure} The Exposure matching the id
     *
     * @example
     * "GET /claims/{claimId}/exposures/{exposureId}"
     */
    getExposure(claimId, exposureId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/exposures/${exposureId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update the details of the specific exposure on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {Exposure} exposure The change delta of the Exposure to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Exposure} The details for the updated Exposure
     *
     * @example
     * "PATCH /claims/{claimId}/exposures/{exposureId}"
     */
    patchExposure(claimId, exposure, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = exposure;
        const exposureId = id;
        const url = `${this.baseUrl}/claims/${claimId}/exposures/${exposureId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete the draft exposure
     * @param {String} claimId The identifier for the claim
     * @param {String} exposureId The identifier for the exposure
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/exposures/{exposureId}"
     */
    deleteExposure(claimId, exposureId) {
        const url = `${this.baseUrl}/claims/${claimId}/exposures/${exposureId}`;
        return this.restService.delete(url);
    }

    /**
     * Close the exposure
     * @param {String} claimId The identifier for the claim
     * @param {String} exposureId The identifier for the exposure
     * @param {ExposureCloseRequestAttributes} exposureCloseRequestAttributes Attributes to pass into this operation (ExposureCloseRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Exposure} The details for the Exposure changed by this action
     *
     * @example
     * "POST /claims/{claimId}/exposures/{exposureId}/close"
     */
    closeExposure(claimId, exposureId, exposureCloseRequestAttributes, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/exposures/${exposureId}/close${search}`;
        const wrapper = exposureCloseRequestAttributes
            ? {
                  data: {
                      attributes: exposureCloseRequestAttributes,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Validate the exposure
     * @param {String} claimId The identifier for the claim
     * @param {String} exposureId The identifier for the exposure
     * @param {ExposureValidationRequestAttributes} exposureValidationRequestAttributes Attributes to pass into this operation (ExposureValidationRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ValidationResult} The details for the ValidationResult changed by this action
     *
     * @example
     * "POST /claims/{claimId}/exposures/{exposureId}/validate"
     */
    validateExposure(
        claimId,
        exposureId,
        exposureValidationRequestAttributes,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/exposures/${exposureId}/validate${search}`;
        const wrapper = exposureValidationRequestAttributes
            ? {
                  data: {
                      attributes: exposureValidationRequestAttributes,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * The fixed property incidents associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<FixedPropertyIncident>} Array of The details for the newly-created FixedPropertyIncident
     *
     * @example
     * "GET /claims/{claimId}/fixed-property-incidents"
     */
    getClaimFixedPropertyIncidents(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/fixed-property-incidents${search}`;
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

    /**
     * Create a new fixed property incident on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {FixedPropertyIncident} fixedPropertyIncident The details of the FixedPropertyIncident to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {FixedPropertyIncident} The details for the newly-created FixedPropertyIncident
     *
     * @example
     * "POST /claims/{claimId}/fixed-property-incidents"
     */
    createClaimFixedPropertyIncident(claimId, fixedPropertyIncident, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/fixed-property-incidents${search}`;
        const { id, ...rest } = fixedPropertyIncident;
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
     * The details of a specific fixed property incident
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {FixedPropertyIncident} The FixedPropertyIncident matching the id
     *
     * @example
     * "GET /claims/{claimId}/fixed-property-incidents/{incidentId}"
     */
    getFixedPropertyIncident(claimId, incidentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/fixed-property-incidents/${incidentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update the details of a specific fixed property incident
     * @param {String} claimId The identifier for the claim
     * @param {FixedPropertyIncident} fixedPropertyIncident The change delta of the FixedPropertyIncident to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {FixedPropertyIncident} The details for the updated FixedPropertyIncident
     *
     * @example
     * "PATCH /claims/{claimId}/fixed-property-incidents/{incidentId}"
     */
    patchFixedPropertyIncident(claimId, fixedPropertyIncident, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = fixedPropertyIncident;
        const incidentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/fixed-property-incidents/${incidentId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete a fixed property incident on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/fixed-property-incidents/{incidentId}"
     */
    deleteFixedPropertyIncident(claimId, incidentId) {
        const url = `${this.baseUrl}/claims/${claimId}/fixed-property-incidents/${incidentId}`;
        return this.restService.delete(url);
    }

    /**
     * The injury incidents associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<InjuryIncident>} Array of The details for the newly-created InjuryIncident
     *
     * @example
     * "GET /claims/{claimId}/injury-incidents"
     */
    getClaimInjuryIncidents(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/injury-incidents${search}`;
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

    /**
     * Create a new injury incident on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {InjuryIncident} injuryIncident The details of the InjuryIncident to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {InjuryIncident} The details for the newly-created InjuryIncident
     *
     * @example
     * "POST /claims/{claimId}/injury-incidents"
     */
    createClaimInjuryIncident(claimId, injuryIncident, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/injury-incidents${search}`;
        const { id, ...rest } = injuryIncident;
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
     * The details of a specific injury incident
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {InjuryIncident} The InjuryIncident matching the id
     *
     * @example
     * "GET /claims/{claimId}/injury-incidents/{incidentId}"
     */
    getInjuryIncident(claimId, incidentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/injury-incidents/${incidentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update the details of a specific injury incident
     * @param {String} claimId The identifier for the claim
     * @param {InjuryIncident} injuryIncident The change delta of the InjuryIncident to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {InjuryIncident} The details for the updated InjuryIncident
     *
     * @example
     * "PATCH /claims/{claimId}/injury-incidents/{incidentId}"
     */
    patchInjuryIncident(claimId, injuryIncident, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = injuryIncident;
        const incidentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/injury-incidents/${incidentId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete an injury incident on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/injury-incidents/{incidentId}"
     */
    deleteInjuryIncident(claimId, incidentId) {
        const url = `${this.baseUrl}/claims/${claimId}/injury-incidents/${incidentId}`;
        return this.restService.delete(url);
    }

    /**
     * Retrieve living expense incidents on a claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<LivingExpensesIncident>} Array of The details for the newly-created LivingExpensesIncident
     *
     * @example
     * "GET /claims/{claimId}/living-expenses-incidents"
     */
    getLivingExpensesIncidents(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/living-expenses-incidents${search}`;
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

    /**
     * Create a new living expense incident
     * @param {String} claimId The identifier for the claim
     * @param {LivingExpensesIncident} livingExpensesIncident The details of the LivingExpensesIncident to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {LivingExpensesIncident} The details for the newly-created LivingExpensesIncident
     *
     * @example
     * "POST /claims/{claimId}/living-expenses-incidents"
     */
    createClaimLivingExpensesIncident(claimId, livingExpensesIncident, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/living-expenses-incidents${search}`;
        const { id, ...rest } = livingExpensesIncident;
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
     * Retrieve a living expense incident
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {LivingExpensesIncident} The LivingExpensesIncident matching the id
     *
     * @example
     * "GET /claims/{claimId}/living-expenses-incidents/{incidentId}"
     */
    getLivingExpensesIncident(claimId, incidentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/living-expenses-incidents/${incidentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update a living expense incident
     * @param {String} claimId The identifier for the claim
     * @param {LivingExpensesIncident} livingExpensesIncident The change delta of the LivingExpensesIncident to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {LivingExpensesIncident} The details for the updated LivingExpensesIncident
     *
     * @example
     * "PATCH /claims/{claimId}/living-expenses-incidents/{incidentId}"
     */
    patchLivingExpensesIncident(claimId, livingExpensesIncident, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = livingExpensesIncident;
        const incidentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/living-expenses-incidents/${incidentId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * The notes associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Note>} Array of The details for the newly-created Note
     *
     * @example
     * "GET /claims/{claimId}/notes"
     */
    getClaimNotes(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/notes${search}`;
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

    /**
     * Create a new note on this claim
     * @param {String} claimId The identifier for the claim
     * @param {Note} note The details of the Note to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Note} The details for the newly-created Note
     *
     * @example
     * "POST /claims/{claimId}/notes"
     */
    createClaimNote(claimId, note, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/notes${search}`;
        const { id, ...rest } = note;
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
     * The policy associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Policy} The Policy matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy"
     */
    getPolicy(claimId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The policy level coverages associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<PolicyCoverage>} Array of The details for the newly-created PolicyCoverage
     *
     * @example
     * "GET /claims/{claimId}/policy/coverages"
     */
    getPolicyCoverages(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/coverages${search}`;
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

    /**
     * The policy level coverage associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} coverageId The identifier for the coverage
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {PolicyCoverage} The PolicyCoverage matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy/coverages/{coverageId}"
     */
    getPolicyCoverage(claimId, coverageId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/coverages/${coverageId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The policy endorsements of a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<Endorsement>} Array of The details for the newly-created Endorsement
     *
     * @example
     * "GET /claims/{claimId}/policy/endorsements"
     */
    getPolicyEndorsements(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/endorsements${search}`;
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

    /**
     * The policy endorsement of a given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} endorsementId The identifier for policy endorsement
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Endorsement} The Endorsement matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy/endorsements/{endorsementId}"
     */
    getPolicyEndorsement(claimId, endorsementId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/endorsements/${endorsementId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The location based risk units of a policy associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<LocationBasedRiskUnit>} Array of The details for the newly-created LocationBasedRiskUnit
     *
     * @example
     * "GET /claims/{claimId}/policy/location-based-risk-units"
     */
    getLocationBasedRiskUnits(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/location-based-risk-units${search}`;
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

    /**
     * Retrieve a location based risk unit
     * @param {String} claimId The identifier for the claim
     * @param {String} locationBasedRiskUnitId The identifier for the location based risk unit
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {LocationBasedRiskUnit} The LocationBasedRiskUnit matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy/location-based-risk-units/{locationBasedRiskUnitId}"
     */
    getLocationBasedRiskUnit(claimId, locationBasedRiskUnitId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/location-based-risk-units/${locationBasedRiskUnitId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The locations associated with a given claim&#x27;s policy
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<PolicyLocation>} Array of The details for the newly-created PolicyLocation
     *
     * @example
     * "GET /claims/{claimId}/policy/locations"
     */
    getPolicyLocations(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/locations${search}`;
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

    /**
     * Details of a location on the given claim&#x27;s policy
     * @param {String} claimId The identifier for the claim
     * @param {String} locationId The identifier for the location
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {PolicyLocation} The PolicyLocation matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy/locations/{locationId}"
     */
    getPolicyLocation(claimId, locationId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/locations/${locationId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The vehicle risk units of a policy associated with a given claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<VehicleRiskUnit>} Array of The details for the newly-created VehicleRiskUnit
     *
     * @example
     * "GET /claims/{claimId}/policy/vehicle-risk-units"
     */
    getVehicleRiskUnits(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/vehicle-risk-units${search}`;
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

    /**
     * Retrieve a vehicle risk unit
     * @param {String} claimId The identifier for the claim
     * @param {String} vehicleRiskUnitId The identifier for the vehicle risk unit
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {VehicleRiskUnit} The VehicleRiskUnit matching the id
     *
     * @example
     * "GET /claims/{claimId}/policy/vehicle-risk-units/{vehicleRiskUnitId}"
     */
    getVehicleRiskUnit(claimId, vehicleRiskUnitId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/policy/vehicle-risk-units/${vehicleRiskUnitId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * The list of objects related to this claim which can be used as the values for the &quot;relatedTo&quot; field on a note or activity. This includes the claim, contacts, unpromoted service requests, service request specialists, exposures, and matters.

     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<GenericRelation>} Array of The details for the newly-created GenericRelation
     *
     * @example
     * "GET /claims/{claimId}/related-objects"
     */
    getClaimRelatedObjects(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/related-objects${search}`;
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

    /**
     * Returns a list of service requests associated with the claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<ServiceRequest>} Array of The details for the newly-created ServiceRequest
     *
     * @example
     * "GET /claims/{claimId}/service-requests"
     */
    getServiceRequestsForClaim(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests${search}`;
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

    /**
     * Adds a service request to the claim
     * @param {String} claimId The identifier for the claim
     * @param {ServiceRequest} serviceRequest The details of the ServiceRequest to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the newly-created ServiceRequest
     *
     * @example
     * "POST /claims/{claimId}/service-requests"
     */
    addServiceRequestToClaim(claimId, serviceRequest, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests${search}`;
        const { id, ...rest } = serviceRequest;
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
     * Retrieves a service request by its id
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {ServiceRequest} The ServiceRequest matching the id
     *
     * @example
     * "GET /claims/{claimId}/service-requests/{serviceRequestId}"
     */
    getServiceRequest(claimId, serviceRequestId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Modifies an existing service request
     * @param {String} claimId The identifier for the claim
     * @param {ServiceRequest} serviceRequest The change delta of the ServiceRequest to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the updated ServiceRequest
     *
     * @example
     * "PATCH /claims/{claimId}/service-requests/{serviceRequestId}"
     */
    changeServiceRequest(claimId, serviceRequest, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = serviceRequest;
        const serviceRequestId = id;
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Records that the specialist has accepted this service request
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/accept"
     */
    acceptServiceRequest(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/accept${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Assigns a service request
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {Assignee} assignee Attributes to pass into this operation (Assignee)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/assign"
     */
    assignServiceRequest(claimId, serviceRequestId, assignee, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/assign${search}`;
        const wrapper = assignee
            ? {
                  data: {
                      attributes: assignee,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Records that the specialist does not intend to perform any further work on this service request
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/cancel"
     */
    cancelServiceRequest(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/cancel${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Indicates that the specialist has completed work
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/complete-work"
     */
    completeRequestedWork(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/complete-work${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Records that the specialist has declined to perform this service request
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/decline"
     */
    declineServiceRequest(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/decline${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Internally cancels this service request without further input from the specialist
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/internal-cancel"
     */
    internalCancelServiceRequest(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/internal-cancel${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Retrieves the invoices on a service request
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<ServiceRequestInvoice>} Array of The details for the newly-created ServiceRequestInvoice
     *
     * @example
     * "GET /claims/{claimId}/service-requests/{serviceRequestId}/invoices"
     */
    getServiceRequestInvoices(claimId, serviceRequestId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/invoices${search}`;
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

    /**
     * Creates a new service request invoice
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestStatement} serviceRequestStatement The details of the ServiceRequestStatement to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequestInvoice} The details for the newly-created ServiceRequestInvoice
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/invoices"
     */
    addInvoice(claimId, serviceRequestId, serviceRequestStatement, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/invoices${search}`;
        const { id, ...rest } = serviceRequestStatement;
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
     * Retrieves a service request invoice by its id
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {String} invoiceId The identifier for the invoice
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {ServiceRequestInvoice} The ServiceRequestInvoice matching the id
     *
     * @example
     * "GET /claims/{claimId}/service-requests/{serviceRequestId}/invoices/{invoiceId}"
     */
    getInvoice(claimId, serviceRequestId, invoiceId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/invoices/${invoiceId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Withdraws an invoice that has been submitted
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {String} invoiceId The identifier for the invoice
     * @param {ServiceRequestInvoiceOperationContext} serviceRequestInvoiceOperationContext Attributes to pass into this operation (ServiceRequestInvoiceOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequestStatement} The details for the ServiceRequestStatement changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/invoices/{invoiceId}/withdraw"
     */
    withdrawInvoice(
        claimId,
        serviceRequestId,
        invoiceId,
        serviceRequestInvoiceOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/invoices/${invoiceId}/withdraw${search}`;
        const wrapper = serviceRequestInvoiceOperationContext
            ? {
                  data: {
                      attributes: serviceRequestInvoiceOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Submits the service request to the specialist for acceptance (with optional instruction)
     * @param {String} claimId The identifier for the claim
     * @param {String} serviceRequestId The service request identifier
     * @param {ServiceRequestOperationContext} serviceRequestOperationContext Attributes to pass into this operation (ServiceRequestOperationContext)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ServiceRequest} The details for the ServiceRequest changed by this action
     *
     * @example
     * "POST /claims/{claimId}/service-requests/{serviceRequestId}/submit"
     */
    submitServiceRequest(
        claimId,
        serviceRequestId,
        serviceRequestOperationContext,
        opts
    ) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/service-requests/${serviceRequestId}/submit${search}`;
        const wrapper = serviceRequestOperationContext
            ? {
                  data: {
                      attributes: serviceRequestOperationContext,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Submit this claim and transition it to the &#x27;open&#x27; state
     * @param {String} claimId The identifier for the claim
     * @param {ClaimSubmitRequestAttributes} claimSubmitRequestAttributes Attributes to pass into this operation (ClaimSubmitRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Claim} The details for the Claim changed by this action
     *
     * @example
     * "POST /claims/{claimId}/submit"
     */
    submitClaim(claimId, claimSubmitRequestAttributes, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/submit${search}`;
        const wrapper = claimSubmitRequestAttributes
            ? {
                  data: {
                      attributes: claimSubmitRequestAttributes,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Validate a claim
     * @param {String} claimId The identifier for the claim
     * @param {ClaimValidationRequestAttributes} claimValidationRequestAttributes Attributes to pass into this operation (ClaimValidationRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {ValidationResult} The details for the ValidationResult changed by this action
     *
     * @example
     * "POST /claims/{claimId}/validate"
     */
    validate(claimId, claimValidationRequestAttributes, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        const url = `${this.baseUrl}/claims/${claimId}/validate${search}`;
        const wrapper = claimValidationRequestAttributes
            ? {
                  data: {
                      attributes: claimValidationRequestAttributes,
                  },
              }
            : undefined;
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Retrieve vehicle incidents on a claim
     * @param {String} claimId The identifier for the claim
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Array<VehicleIncident>} Array of The details for the newly-created VehicleIncident
     *
     * @example
     * "GET /claims/{claimId}/vehicle-incidents"
     */
    getClaimVehicleIncidents(claimId, opts) {
        const {
            fields,
            filter,
            include,
            includeTotal,
            pageSize,
            pageOffset,
            sort,
        } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (pageOffset) {
            search += buildSearchString({ pageOffset: pageOffset }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/vehicle-incidents${search}`;
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

    /**
     * Create a new vehicle incident
     * @param {String} claimId The identifier for the claim
     * @param {VehicleIncident} vehicleIncident The details of the VehicleIncident to create
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {VehicleIncident} The details for the newly-created VehicleIncident
     *
     * @example
     * "POST /claims/{claimId}/vehicle-incidents"
     */
    createClaimVehicleIncident(claimId, vehicleIncident, opts) {
        const { fields } = opts || {};

        let search = '';
        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/vehicle-incidents${search}`;
        const { id, ...rest } = vehicleIncident;
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
     * Retrieve a vehicle incident
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {VehicleIncident} The VehicleIncident matching the id
     *
     * @example
     * "GET /claims/{claimId}/vehicle-incidents/{incidentId}"
     */
    getVehicleIncident(claimId, incidentId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.baseUrl}/claims/${claimId}/vehicle-incidents/${incidentId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Update a vehicle incident
     * @param {String} claimId The identifier for the claim
     * @param {VehicleIncident} vehicleIncident The change delta of the VehicleIncident to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {VehicleIncident} The details for the updated VehicleIncident
     *
     * @example
     * "PATCH /claims/{claimId}/vehicle-incidents/{incidentId}"
     */
    patchVehicleIncident(claimId, vehicleIncident, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const {
            id,
            _checksum: checksum,
            _actions: actions,
            ...rest
        } = vehicleIncident;
        const incidentId = id;
        const url = `${this.baseUrl}/claims/${claimId}/vehicle-incidents/${incidentId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Delete a vehicle incident on the given claim
     * @param {String} claimId The identifier for the claim
     * @param {String} incidentId The identifier for the incident
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /claims/{claimId}/vehicle-incidents/{incidentId}"
     */
    deleteVehicleIncident(claimId, incidentId) {
        const url = `${this.baseUrl}/claims/${claimId}/vehicle-incidents/${incidentId}`;
        return this.restService.delete(url);
    }

    /**
     * Assigns a new draft claim to user
     * @param {Claim} claim the claim to assign to
     * @param {Object} opts Optional group and user ids
     * @returns {Claim} The details for the newly-created Claim
     *
     * @example
     * "POST /claims/{claimId}/assign"
     */
    assignClaim(claim = {}, opts = {}) {
        const { id: claimId } = claim;
        const { userId = 'demo_sample:1', groupId = 'demo_sample:31' } = opts;
        const url = `${this.baseUrl}/claims/${claimId}/assign`;
        const wrapper = {
            data: {
                attributes: {
                    groupId,
                    userId,
                },
            },
        };
        return this.restService
            .post(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Retrieves the details of a specific note
     * @param {String} noteId The REST identifier for the note, as returned via previous requests that return a list of notes
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.
     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.
     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.
     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.
     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.
     * @returns {Note} The Note matching the id
     *
     * @example
     * "GET /notes/{noteId}"
     */
    getNote(noteId, opts) {
        const { fields, filter, include, includeTotal, pageSize, sort } =
            opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }
        if (filter) {
            search += buildSearchString({ filter: filter }, !!search);
        }
        if (include) {
            search += buildSearchString({ include: include }, !!search);
        }
        if (includeTotal !== undefined) {
            search += buildSearchString(
                { includeTotal: includeTotal ? 'true' : 'false' },
                !!search
            );
        }
        if (pageSize) {
            search += buildSearchString({ pageSize: pageSize }, !!search);
            search += buildSearchString({ includeTotal: true }, !!search);
        }
        if (sort) {
            search += buildSearchString({ sort: sort }, !!search);
        }

        const url = `${this.commonUrl}/notes/${noteId}${search}`;
        return this.restService.get(url).then(result => unwrap(result?.data));
    }

    /**
     * Updates fields on a note
     * @param {Note} note The change delta of the Note to update
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned. The &quot;checksum&quot; and &quot;links&quot; properties are special and can be included by specifying &quot;$checksum&quot; and &quot;$links&quot; respectively. If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.
     * @returns {Note} The details for the updated Note
     *
     * @example
     * "PATCH /notes/{noteId}"
     */
    updateNote(note, opts) {
        const { fields } = opts || {};
        let search = '';

        if (fields) {
            search += buildSearchString({ fields: fields }, !!search);
        }

        const { id, _checksum: checksum, _actions: actions, ...rest } = note;
        const noteId = id;
        const url = `${this.commonUrl}/notes/${noteId}${search}`;
        const wrapper = {
            data: {
                attributes: rest,
                checksum,
            },
        };
        return this.restService
            .patch(url, wrapper)
            .then(result => unwrap(result?.data));
    }

    /**
     * Deletes this note
     * @param {String} noteId The REST identifier for the note, as returned via previous requests that return a list of notes
     * @returns {String} Delete status
     *
     * @example
     * "DELETE /notes/{noteId}"
     */
    deleteNote(noteId) {
        const url = `${this.commonUrl}/notes/${noteId}`;
        return this.restService.delete(url);
    }

    /**
     * composite API
     * @param {Object} payLoad The composite PayLoad for new FNOL
     * @returns {Object} Results of FNOL submission
     *
     * @example
     * "POST /composite"
     */
    compositeAPI(payLoad) {
        const url = `${this.compositeUrl}/composite`;
        return this.restService
            .post(url, payLoad)
            .then(result => result?.responses[0].body.data.attributes);
    }

    formatApiError(ex) {
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

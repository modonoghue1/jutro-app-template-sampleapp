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
            param.forEach(arrayValue => fakeUrl.searchParams.append(key, arrayValue));
        } else {
            fakeUrl.searchParams.append(key, param)
        }
    });
    return (append) ? `&${fakeUrl.search.substr(1)}` : fakeUrl.search;
}

const actionMap = {
    "/search/policies": {
        "post": "searchPolicies"
    }
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
            return '*'
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

                    list.push(lookupAction(genericHref, method) || camelCase(`create ${link}`));
                });
            }
            return list;
        }, []);
    }

    const unwrappedItem = { ...attributes, _checksum: checksum, _actions: actions };

    if (related && included) {
        const relatedKeys = Object.keys(related);
        relatedKeys.forEach(relatedKey => {
            const relatedItem = related[relatedKey];
            const { id: relatedId, type: relatedType } = relatedItem.data[0];
            const unwrappedReference = included[relatedType].find(test2 => test2.id === relatedId)
            if (unwrappedReference) {
                unwrappedItem[relatedKey] = { ...unwrappedItem[relatedKey], _ref: unwrappedReference };
            }
        });
    }
    return unwrappedItem;
}

export default class PolicyAPI {
    constructor(restService, baseUrl) {
        this.restService = restService;
        this.baseUrl = baseUrl;
    }

    /**
     * Search for policies that match the specified criteria
     * @param {PolicySearchRequestAttributes} policySearchRequestAttributes Attributes to pass into this operation (PolicySearchRequestAttributes)
     * @param {Object} opts Optional query parameters
     * @param {Array<String>} opts.fields The fields parameter allows the caller to specify the set of fields that should be included for a given resource, and allows the client to avoid fetching fields they don&#x27;t want as well as to request optional fields that aren&#x27;t included by default.  The parameter is of the form fields&#x3D;&lt;field list&gt; or fields&#x3D;&lt;include&gt;:&lt;field list&gt;.  The &lt;field list&gt; is a comma-separated list of fields desired on the response, and &lt;include&gt; indicates that the field selection applies to an included resource.  If not specified, the default fields for a resource will be returned.  If you wish to select fields on the root resource and the included resources, each of those must be in a separate fields parameter. For example, ?fields&#x3D;&lt;field list&gt;&amp;fields&#x3D;&lt;include1&gt;:&lt;field list&gt;&amp;fields&#x3D;&lt;include2&gt;:&lt;field list&gt;. Special values beginning with the &#x27;*&#x27; character are used to indicate a set of fields to return, which will then be combined with additional fields that are explicitly listed. The &#x27;*default&#x27; set will include whatever set of the fields the endpoint would normally return if the &quot;fields&quot; query parameter wasn&#x27;t specified. For example, specifying fields&#x3D;firstName,lastName will return only the firstName and lastName fields on the response, while specifying fields&#x3D;default,firstName,lastName will return all the default fields as well as the firstName and lastName. Other &#x27;&#x27; options are &#x27;*detail&#x27;, &#x27;*summary&#x27;, and &#x27;*all&#x27;. Properties on sub-objects can be selected via dot-separated paths, for example fields&#x3D;assignedUser,assignedUser.id will fetch only the id of the assignedUser object but not the displayName. &lt;include&gt; can also represent a nested included resource, such as fields&#x3D;activities.notes:subject,body.

     * @param {Array<String>} opts.filter Filters the list of results based on the specified field, operator, and value.  The query parameter&#x27;s value should be of the form &lt;field&gt;:&lt;operator&gt;:&lt;value&gt; or &lt;include&gt;:&lt;field&gt;:&lt;operator&gt;:&lt;value&gt;.  If the &lt;include&gt;: piece is specified, the filter will be applied to the included resource. The set of supported fields is dependent upon the resource being filtered.  Valid operators include &quot;eq&quot;, &quot;ne&quot;, &quot;lt&quot;, &quot;gt&quot;, &quot;le&quot;, &quot;ge&quot;, &quot;in&quot;, &quot;ni&quot;, &quot;sw&quot;, and &quot;cn&quot;. Values should be formatted according to the same JSON type and format as the filtered field, i.e. if the filtered field is a boolean field, the value should either be &quot;true&quot; or &quot;false&quot; and if the filtered field is a date-time field, the value should be an ISO-8601 date-time value.  One exception is that filtering on date-time fields can accept either date-times or dates. On occasions where the value needs to contain a &quot;:&quot; character, this character can be escaped with an additional &quot;:&quot;. For example, to compare against &quot;some:value&quot;, the query parameter would take the form &lt;field&gt;:&lt;operator&gt;:some::value. The filter query parameter can be specified multiple times for the same resource or field, and all the specified filters will effectively be ANDed together. &lt;include&gt; can also represent a nested included resource, such as filter&#x3D;activities.notes:subject:cn:NoteSubject.

     * @param {String} opts.include Indicates that the caller would like additional resources returned along with this call in the &quot;included&quot; section of the response.  The include parameter can appear multiple times, and is a comma-separated list of additional resources to include.  Nested inclusions can be specified by prefixing the inclusion list with the name of the included property and :.  For example, to include the vehicleincidents and mainContact for a Claim, as well as the driver of the vehicle, you could specify ?include&#x3D;vehicleincidents,mainContact&amp;include&#x3D;vehicleincidents:driver. The exact set of options for the include parameter depends upon the particular endpoint.

     * @param {String} opts.includeTotal The includeTotal parameter is used to indicate that the results should include a count of the total number of results available, in cases where the list of results is paginated and not all results are included.  This parameter is of the form includeTotal&#x3D;&lt;true|false&gt; or includeTotal&#x3D;&lt;include&gt;:&lt;true|false&gt;.  Specifying the &lt;include&gt;: prefix on the query parameter will apply the includeTotal option to the included list. &lt;include&gt; can also represent a nested included resource, such as includeTotal&#x3D;activities.notes:true. Calculating the total size of a list can require additional database load, and the option is turned off by default. The returned total is capped at 1000, and will not be accurate if the resource contains more than 1000 elements.

     * @param {String} opts.pageSize The maximum number of results to return in the result.  If not specified, the default settings for that endpoint will be used; each endpoint also defines a maximum pageSize.  The pageSize parameter can be specified as either pageSize&#x3D;&lt;size&gt; or pageSize&#x3D;&lt;include&gt;:&lt;size&gt;, where &lt;include&gt; represents the name of an included resource.  For example, ?pageSize&#x3D;100 will indicate that 100 resources should be returned, while ?include&#x3D;activities&amp;pageSize&#x3D;activities:5 will indicate that 5 activities should be returned along with the response. &lt;include&gt; can also represent a nested included resource, such as pageSize&#x3D;activities.notes:5.

     * @param {String} opts.pageOffset The pageOffset parameter is used to indicate the first result to fetch, in order to page through a list of results. The token may represent a zero-indexed offset, but it may also represent something else such as the id of the last or previous result, depending upon how the server implements pagination for a particular operation. As a general rule, pagination of an API should use the &quot;next&quot; and &quot;prev&quot; links on the query results to navigate back and forth, rather than attempting to manually construct the pageOffset value.

     * @param {Array<String>} opts.sort The sort parameter is used to control the sorting of the returned results.  The sort parameter can appear multiple times in the query string, and is either of the form sort&#x3D;&lt;include&gt;:&lt;properties&gt; or sort&#x3D;&lt;properties&gt;, where &lt;properties&gt; is a comma-separated list of properties to sort on and &lt;include&gt; represents the name of an included resource.  Property names can be prefixed with &#x27;-&#x27; to specify a descending sort on that property, otherwise the default is an ascending sort.  The set of valid sort property names depends on the specific endpoint being requested. For example, ?sort&#x3D;priority,-dueDate will specify a primary sort on priority (ascending) and a secondary sort on dueDate (descending).  ?include&#x3D;activities&amp;sort&#x3D;activities:priority,-dueDate specifies the same sort values, but applies them to the included &quot;activities&quot; list rather than to the primary resource. &lt;include&gt; can also represent a nested included resource, such as sort&#x3D;activities.notes:dueDate.

     * @returns {Array<PolicySearchResult>} Array of the list matching PolicySearchResult
     *
     * @example
     * "POST /search/policies"
     */
    searchPolicies(policySearchRequestAttributes, opts) {
        const { fields, filter, include, includeTotal, pageSize, pageOffset, sort } = opts || {};
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
            search += buildSearchString({ includeTotal: (includeTotal) ? 'true' : 'false' }, !!search);
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

        const url = `${this.baseUrl}/search/policies${search}`;
        const wrapper = (policySearchRequestAttributes) ?
            {
                data: {
                    attributes: policySearchRequestAttributes
                },
            }
            : undefined;
        return this.restService.post(url, wrapper)
            .then(resultData => {
                let results;
                // if 'includes', then response has 'related' on each element that
                // refers to 'included'. Resolve references and return
                if (resultData?.included) {
                    const includedKeys = Object.keys(resultData.included);
                    includedKeys.forEach(key => {
                        resultData.included[key] = resultData.included[key].map(item => unwrap(item));
                    });
                    results = resultData?.data?.map(item => unwrap(item, resultData.included));
                } else {
                    results = resultData?.data?.map(item => unwrap(item));
                }

                // wrap results if pagination/total is included
                if (pageOffset || pageSize || resultData?.total) {
                    return {
                        offset: pageOffset ?? 0,
                        count: resultData?.count,
                        total: resultData?.total,
                        data: results
                    };
                }
                return results;
            });
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

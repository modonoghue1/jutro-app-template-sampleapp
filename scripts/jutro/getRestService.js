import { HttpRequestBuilder, jsonOptions } from '@jutro/transport';
import { getConfigValue } from '@jutro/config';

function getRestService() {
    const restService = new HttpRequestBuilder(getConfigValue('BASE_URI'))
        .addOptions(jsonOptions)
        .addOptions({
            // FIX: provide auth externally
            headers: {
                Authorization: 'Basic YWFwcGxlZ2F0ZTpndw==',
            },
        })
        .build();

    return restService;
}

module.exports = { getRestService };

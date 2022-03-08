const metadataTypePattern = /@metadataType\s([a-z]+)/;

/**
 * based on additional tag in component description extracts metadata type of component
 *
 * @param {object} componentDocumentation Documentation object that gets the description of the component
 */

function metadataTypePropsHandler(componentDocumentation) {
    // eslint-disable-next-line no-underscore-dangle
    const value = componentDocumentation._data.get('description');
    const [, type] = (value && value.match(metadataTypePattern)) || [];

    if (type) {
        const extractedType = type.replace(metadataTypePattern, '$1');

        const descriptionValue = value.replace(metadataTypePattern, '');

        // eslint-disable-next-line no-underscore-dangle
        componentDocumentation._data.set('metadataType', extractedType);
        // eslint-disable-next-line no-underscore-dangle
        componentDocumentation._data.set(
            'description',
            descriptionValue.trim()
        );
    }
}

module.exports = {
    metadataTypePropsHandler,
    metadataTypePattern,
};

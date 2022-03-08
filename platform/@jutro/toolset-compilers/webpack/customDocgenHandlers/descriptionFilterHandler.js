const atPattern = /^@[a-z]+[\s\S]+$/gim;

const filterDescription = description => description.split(atPattern)[0].trim();

const descriptionFilterHandler = componentDocumentation => {
    const description = componentDocumentation.get('description');
    if (description) {
        const filteredDescription = filterDescription(description);

        componentDocumentation.set('description', filteredDescription);
    }
};

module.exports = { descriptionFilterHandler };

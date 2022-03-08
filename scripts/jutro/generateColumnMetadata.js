const fs = require('fs');
const { argv } = require('yargs')
    .usage(
        'Usage: $0 -i [sourceSchemaPath] -o [outputMetadataPath] -e [EntityName]'
    )
    .demandOption(['i', 'o', 'e']);

const { buildColumnMetadata } = require('./buildColumnMetadata');

const filePath = argv.o;
fs.writeFileSync(
    filePath,
    JSON.stringify(buildColumnMetadata(argv.i, argv.e), 0, 2)
);
console.log(`Generated metadata file: "${filePath}"`);

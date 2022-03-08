// example: node .\scripts\jutro\generateFieldMetadata.js -i .\src\pages\ClaimOperations\claim.openapi.json -o test.json5 -e Claim
// example: node .\scripts\jutro\generateFieldMetadata.js -i .\src\pages\ClaimOperations\apd.personalauto.openapi.json -o test.json5 -e PersonalVehicle

const fs = require('fs');
const { argv } = require('yargs')
    .usage(
        'Usage: $0 -i [sourceSchemaPath] -o [outputMetadataPath] -e [EntityName]'
    )
    .demandOption(['i', 'o', 'e']);

const { buildFieldMetadata } = require('./buildFieldMetadata');

const filePath = argv.o;
try {
    buildFieldMetadata(argv.i, argv.e).then(results => {
        fs.writeFileSync(filePath, JSON.stringify(results, 0, 2));
        console.log(`Generated metadata file: "${filePath}"`);
    });
} catch (err) {
    // In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code
    console.log('Generation failed');
    console.log(err);
    process.exit(1);
}

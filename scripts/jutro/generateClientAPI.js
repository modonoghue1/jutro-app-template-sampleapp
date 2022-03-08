// example:
// node .\scripts\jutro\generateClientAPI.js -i .\src\pages\Dashboard\ClaimOperations\claim.openapi.json -o test.js -c ClaimAPI -p /claims
// node .\scripts\jutro\generateClientAPI.js -i .\src\pages\Dashboard\ClaimOperations\common.openapi.json -o test2.js -c NoteAPI -p /notes
// node .\scripts\jutro\generateClientAPI.js -i .\src\pages\Dashboard\ClaimOperations\policy.openapi.json -o test3.js -c PolicyAPI -p /policies

const fs = require('fs');
const { argv } = require('yargs')
    .usage(
        'Usage: $0 -i [sourceSchemaPath] -o [outputClientAPIPath] -c [className] -p [APIPath]'
    )
    .demandOption(['i', 'o', 'p', 'c']);

const { buildClientAPI } = require('./buildClientAPI');

const filePath = argv.o;
fs.writeFileSync(filePath, buildClientAPI(argv.i, argv.c, argv.p));
console.log(`Generated clientAPI file: "${filePath}"`);

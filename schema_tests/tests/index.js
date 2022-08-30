const {readFileSync, promises: fsPromises} = require('fs')
const path = require('path');
const fs = require('fs');
const Joi = require("joi");

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    return JSON.parse(contents);
}

let json = syncReadFile('../schemas.json');
let cases = json['data'];

let hasContractsNotDefined = false;
let hasContractsWithError = false;

for (let i = 0; i < cases.length; i++) {
    let mockCase = cases[i];
    try {
        const testCase = require('./schemas/'+mockCase['key']);
        const { error } = testCase(Joi, mockCase['object']);

        if (error != null){
            console.log("[FAIL] Schema test fail '" + mockCase['key'] + "' ⤵ :");
            console.log(error);
            hasContractsWithError = true;
        } else {
            console.log("[SUCCESS] Schema test ok! '" + mockCase['key'] + "'");
        }

    } catch (e) {
        hasContractsNotDefined = true;
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log("[ERROR] Schema test not defined for '" + mockCase['key'] + "'")
        }
    }
}

if (hasContractsWithError){
    throw new Error("One or more schemas have a validation error");
}

if (hasContractsNotDefined){
    throw new Error("Some Schemas annotated with '@SchemaTestsScan' were not found in the 'schemas' directory");
}


let payloadToPushSchemaTests = {
    schemaTests: [],
}

const args = process.argv.slice(2);
let files;

if (args.length > 0) {
    files = args;
    for (let i = 0; i < files.length; i++) {
        files[i] = files[i] + '.js';
    }
} else {
    const directoryPath = path.join(__dirname, 'schemas');
    files = fs.readdirSync(directoryPath);
}

files.forEach(function (file) {

    if (file !== '.schema-data.json'){
        const buffer = readFileSync("schemas/"+file);

        const fileContent = buffer.toString();

        let b = Buffer.from(fileContent);
        let s = b.toString('base64');

        let schemaTest = {
            name: file.split('.js')[0],
            file: s
        };

        payloadToPushSchemaTests.schemaTests.push(schemaTest);
    }
});

console.log(payloadToPushSchemaTests);

if (payloadToPushSchemaTests.schemaTests.length > 0) {
    let payloadObjectJson = JSON.stringify(payloadToPushSchemaTests, null, 2)

    fs.writeFile('schemas/.schema-data.json', payloadObjectJson, function (err) {
        if (err) return console.log(err);
        console.log('Sucessfully saved .schema-data.json');
    });
}

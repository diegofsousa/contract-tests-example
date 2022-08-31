const {readFileSync, promises: fsPromises} = require('fs')
const path = require('path');
const fs = require('fs');
const Joi = require("joi");

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    return JSON.parse(contents);
}

let jsonFromFakeObjects = syncReadFile('../schemas.json');
let casesFromFakeObjects = jsonFromFakeObjects['data'];

let hasContractsNotDefined = false;
let hasContractsWithError = false;

for (let i = 0; i < casesFromFakeObjects.length; i++) {
    let fakeObject = casesFromFakeObjects[i];
    try {
        const joiTestCase = require('./schemas/'+fakeObject['key']);
        const { error } = joiTestCase(Joi, fakeObject['object']);

        if (error != null){
            console.log("[FAIL] Schema test fail '" + fakeObject['key'] + "' ⤵ :");
            console.log(error);
            hasContractsWithError = true;
        } else {
            console.log("[SUCCESS] Schema test ok! '" + fakeObject['key'] + "'");
        }

    } catch (e) {
        hasContractsNotDefined = true;
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log("[ERROR] Schema test not defined for '" + fakeObject['key'] + "'")
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

const commandLineArgs = process.argv.slice(2);
let fileArgs;

if (commandLineArgs.length > 0) {
    fileArgs = commandLineArgs;
    for (let i = 0; i < fileArgs.length; i++) {
        fileArgs[i] = fileArgs[i] + '.js';
    }
} else {
    const joiTestsDirectoryPath = path.join(__dirname, 'schemas');
    fileArgs = fs.readdirSync(joiTestsDirectoryPath);
}

fileArgs.forEach(function (file) {

    if (file !== '.schema-data.json'){
        const buffer = readFileSync("schemas/"+file);
        const fileContent = buffer.toString();

        let bufferFromFile = Buffer.from(fileContent);
        let contentFileBase64 = bufferFromFile.toString('base64');

        let schemaTest = {
            name: file.split('.js')[0],
            file: contentFileBase64
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

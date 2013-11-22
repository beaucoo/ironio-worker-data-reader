/*jshint node: true, expr:true */
/*global module, require, process */


var fs = require('fs');


function getIndexes() {
    "use strict";

    var indexes = {};
    process.argv.forEach(function (val, index) {
        indexes[val] = index + 1;
    });

    return indexes;
}


function readElseDefault(paramIndex, defaultFilePath) {
    "use strict";

    console.log("- Parameters: paramIndex %d, default file path: %s", paramIndex || -1, defaultFilePath || "");

    var filePath;
    if (paramIndex && 0 < paramIndex) {
        filePath = process.argv[paramIndex];
    } else if (defaultFilePath) {
        filePath = defaultFilePath;
    }

    if (!filePath) {
        console.error("- No file path determined");
        return;
    }

    if (!fs.existsSync(filePath)) {
        console.error("- File path does not exist: %s", filePath);
        return;
    }

    console.log("- Resolved to file %s", filePath);

    var data = fs.readFileSync(filePath, 'ascii');
    if (!data) {
        console.error("- File had no data");
        return;
    }

    return data;
}


var indexes = getIndexes();


function read(paramName, devRelativeFilePath) {
    "use strict";

    var devFilePath;
    if (devRelativeFilePath) {
        devFilePath = require('path').resolve(process.cwd(), devRelativeFilePath);
    }
    return readElseDefault(indexes[paramName], devFilePath);
}


function readJson(paramName, devRelativeFilePath) {
    "use strict";

    var data = read(paramName, devRelativeFilePath);
    if (!data) {
        return null;
    }
    return JSON.parse(data);
}


function readConfig(devRelativeFilePath) {
    "use strict";
    console.log("Reading config string");
    return read("-config", devRelativeFilePath);
}


function readConfigJson(devRelativeFilePath) {
    "use strict";
    console.log("Reading config json");
    return readJson("-config", devRelativeFilePath);
}


function readPayload(devRelativeFilePath) {
    "use strict";
    console.log("Reading payload string");
    return read("-payload", devRelativeFilePath);
}


function readPayloadJson(devRelativeFilePath) {
    "use strict";
    console.log("Reading payload json");
    return readJson("-payload", devRelativeFilePath);
}


module.exports = {
    read: read,
    readJson: readJson,
    readConfig: readConfig,
    readConfigJson: readConfigJson,
    readPayload: readPayload,
    readPayloadJson: readPayloadJson
};
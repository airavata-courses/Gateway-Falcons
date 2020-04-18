const fs = require('fs');
const path = require('path');
const parseFile = (fileName) => {
    // console.log(path,fileName)
    const filePath = path.join("config", fileName);
    console.log(filePath)
    const fileCredentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return fileCredentials;
}

module.exports = parseFile;

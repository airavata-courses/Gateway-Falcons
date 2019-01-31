const fs = require('fs');
const path = require('path');
const parseFile = (fileName) => {
    const filePath = path.join("config", fileName);
    const fileCredentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return fileCredentials;
}

module.exports = parseFile;

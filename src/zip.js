const { exec } = require('child_process');
const path = require('path');
//const fs = require('fs');

const filesDir = path.resolve(__dirname, '../files');
const zippedDir = path.resolve(__dirname, '../zipped');
const zipFile = path.join(zippedDir, 'text.zip');

const zipCommand = `zip -j ${zipFile} ${filesDir}/*`;

exec(zipCommand, (error, stdout, stderr) => {
    if (error) {
        console.log('error:', error.message);
    }
    if (stderr) {
        console.log('stderr:', stderr);
    }
    if (error | stderr) {
        return;
    }

    console.log(stdout);
});

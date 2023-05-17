const { exec } = require('child_process');
const path = require('path');

const arg = process.argv[2];

let command = path.join(__dirname, '../build/main.o');
if (arg) {
    command = command + ' ' + arg;
}
console.log('command: ', command);

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log('error status code', error.code);
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

let command;

// Check OS
switch (process.platform) {
    case 'darwin':
        command = 'open -a "Google Chrome" https://google.com';
        break;
    case 'win32':
        command = 'start chrome https://google.com';
        break;
    case 'linux':
        command = 'google-chrome https://google.com';
        break;
    default:
        console.log('Unsupported platform');
        return;
}

console.log('command: ', command);

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log('error:', error.message);
    }
    if (stderr) {
        console.log('stderr:', stderr);
    }
    if (error || stderr) {
        return;
    }

    console.log(stdout);
});

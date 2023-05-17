const { exec } = require('child_process');

function displayUsage() {
    console.log('open <shortcut>      : Open a saved shortcut.');
    console.log('add <shortcut> <url> : add a new shortcut to some URL.');
    console.log('rm <shortcut>        : remove a saved shortcut.');
}

function open(shortcut) {
    let url;
    if (shortcut === 'goog') {
        url = 'https://google.com';
    } else if (shortcut === 'social') {
        url = 'https://twitter.com';
    } else if (shortcut === 'code') {
        url = 'https://leetcode.com';
    } else {
        console.log('Shortcut', shortcut, 'does not exist.');
        return;
    }
    console.log('opening', url);
    let command;
    switch (process.platform) {
        case 'darwin':
            command = `open -a "Google Chrome" ${url}`;
            break;
        case 'win32':
            command = `start chrome ${url}`;
            break;
        case 'linux':
            command = `google-chrome ${url}`;
            break;
        default:
            console.log('Unsupported platform');
            return;
    }

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
}

function add(shortcut, url) {
    console.log('adding', shortcut, url);
}

function rm(shortcut) {
    console.log('removing', shortcut);
}

const args = process.argv.slice(2);
const command = args[0];
const shortcut = args[1];
const url = args[2];

if (!command || !shortcut || command === 'help') {
    displayUsage();
} else {
    switch (command) {
        case 'open':
            open(shortcut);
            break;
        case 'add':
            if (!url) {
                displayUsage();
            }
            add(shortcut, url);
            break;
        case 'rm':
            rm(shortcut);
            break;
        default:
            displayUsage();
            break;
    }
}

import open, { apps } from 'open';

function openShortcut(shortcut) {
    const browser = process.env.BROWSER.toLocaleLowerCase();

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

    let appName = browser; // allows you to use safari or others

    switch (browser) {
        case 'chrome':
            appName = apps.chrome;
            break;
        case 'edge':
            appName = apps.edge;
            break;
        case 'firefox':
            appName = apps.firefox;
            break;
    }

    open(url, { app: { name: appName } });
}

function displayUsage() {
    console.log('open <shortcut>      : Open a saved shortcut.');
    console.log('add <shortcut> <url> : add a new shortcut to some URL.');
    console.log('rm <shortcut>        : remove a saved shortcut.');
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
            openShortcut(shortcut);
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

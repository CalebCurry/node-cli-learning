import open, { apps } from 'open';
import sqlite from 'better-sqlite3';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
let db;
const dbFilePath = './shortcuts.db';

function init() {
    console.log('initializing database.');
    db = new sqlite('./shortcuts.db');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS shortcuts (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL
      )
    `;

    db.exec(createTableQuery);

    const data = [
        { name: 'goog', url: 'https://google.com' },
        { name: 'social', url: 'https://twitter.com' },
        { name: 'news', url: 'https://yahoo.com' },
    ];

    const insertData = db.prepare(
        'INSERT INTO shortcuts (name, url) VALUES (?, ?)'
    );
    data.forEach((shortcut) => {
        insertData.run(shortcut.name, shortcut.url);
    });
}

function checkBrowser() {
    const browser = process.env?.BROWSER?.toLocaleLowerCase();
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
    return appName;
}
function openShortcut(shortcut) {
    const row = db
        .prepare('SELECT * FROM shortcuts WHERE name = ?')
        .get(shortcut);
    if (!row) {
        console.log('Shortcut', shortcut, 'does not exist.');
        return;
    }

    const url = row.url;
    const browser = checkBrowser();

    if (browser) {
        open(url, { app: { name: browser } });
    } else {
        open(url);
    }
}
function displayUsage() {
    console.log('open <shortcut>      : Open a saved shortcut.');
    console.log('add <shortcut> <url> : add a new shortcut to some URL.');
    console.log('rm <shortcut>        : remove a saved shortcut.');
}

function ls() {
    const rows = db.prepare('SELECT * FROM shortcuts').all();
    console.log('All shortcuts:');
    rows.forEach((row) => console.log(`${row.name}: ${row.url}`));
}

function add(shortcut, url) {
    db.prepare(
        'INSERT OR REPLACE INTO shortcuts (name, url) VALUES (?, ?)'
    ).run(shortcut, url);
    console.log('Added', shortcut, url);
}

function rm(shortcut) {
    db.prepare('DELETE FROM shortcuts WHERE name = ?').run(shortcut);
    console.log('Removed', shortcut);
}

if (!fs.existsSync(dbFilePath)) {
    init();
} else {
    db = new sqlite(dbFilePath);
}

const args = process.argv.slice(2);
const command = args[0];
const shortcut = args[1];
const url = args[2];

const argCount = args.length;

if (args.length == 0 || !['ls', 'open', 'rm', 'add'].includes(command)) {
    displayUsage();
    process.exit(1);
}
switch (command) {
    case 'ls':
        ls();
        break;
    case 'open':
        if (argCount < 2) {
            displayUsage();
            break;
        }
        openShortcut(shortcut);
        break;
    case 'rm':
        if (argCount < 2) {
            displayUsage();
            break;
        }
        rm(shortcut);
        break;
    case 'add':
        if (argCount < 3) {
            displayUsage();
            break;
        }
        add(shortcut, url);
        break;
}

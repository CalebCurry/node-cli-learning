import Database from 'better-sqlite3';
const db = new Database('./shortcuts.db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS shortcuts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL
  )
`;

db.exec(createTableQuery);

//db.exec('DROP TABLE IF EXISTS shortcuts');

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
// const queryTables = `
//   SELECT name FROM sqlite_master WHERE type='table'
// `;

// const tables = db.prepare(queryTables).all();
// console.log(tables);

const shortcuts = db
    .prepare('SELECT * FROM shortcuts WHERE name = ?')
    .all('social');

console.log(shortcuts);
const result = db.prepare('DELETE FROM shortcuts WHERE id = ?').run('48');
console.log(result.changes);
db.close();

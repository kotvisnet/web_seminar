const { Client } = require('pg');

const client = new Client({
    user: 'polina',
    host: 'localhost',
    database: 'mydb',
    password: 'polinaalt1',
    port: 5432,
});

client.connect();

module.exports = client;


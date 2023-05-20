const jsonServer = require('json-server');
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

const server = jsonServer.create();
const adapter = new Memory();
const db = low(adapter);

// Load initial data into the in-memory database
const initialData = require('../db.json');
db.defaults(initialData).write();

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;

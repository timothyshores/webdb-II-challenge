const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./routes/zoosRouter');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);

// endpoints here

const port = 3300;
server.listen(port, () => {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

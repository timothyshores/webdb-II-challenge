const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true
};
const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => res.status(200).json(zoos))
        .catch(err => res.status(500).json(err));
});

module.exports = router;
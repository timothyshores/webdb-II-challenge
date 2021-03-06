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
    db('bears')
        .then(bears => res.status(200).json(bears))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const message404 = { message: `Bear id: ${id}  not found` }

    db('bears')
        .where({ id: id })
        .first()
        .then(bear => {
            bear === undefined
                ? res.status(404).json(message404)
                : res.status(200).json(bear)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const message201 = { message: 'req.body.name requires a valid string' }

    name && (typeof name === 'string')
        ? db('bears')
            .insert(req.body, 'id')
            .then(results => res.status(201).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Bear id: ${id} was successfully deleted` }
    const message404 = { message: `Bear id: ${id} does not exist` }

    db('bears')
        .where({ id: id })
        .del()
        .then(count => {
            count > 0
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Bear id: ${id} was successfully updated to ${req.body.name}` }
    const message404 = { message: `Bear id: ${id} does not exist` }

    db('bears')
        .where({ id: id })
        .update(req.body)
        .then(count => {
            count > 0
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
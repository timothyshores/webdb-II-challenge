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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const message404 = { message: `Zoo id: ${id}  not found` }

    db('zoos')
        .where({ id: id })
        .first()
        .then(zoo => {
            zoo === undefined
                ? res.status(404).json(message404)
                : res.status(200).json(zoo)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const message201 = { message: 'req.body.name is empty and requires a valid string' }

    req.body.name
        ? db('zoos')
            .insert(req.body, 'id')
            .then(results => res.status(200).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Zoo id: ${id} was successfully deleted` }
    const message404 = { message: `Zoo id: ${id} does not exist` }

    db('zoos')
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
    const message200 = { message: `Zoo id: ${id} was successfully updated` }
    const message404 = { message: `Zoo id: ${id} does not exist` }

    db('zoos')
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
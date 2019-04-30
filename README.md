# Building an API using a Relational Database Mini

**Topics:**

- Relational Databases
- SQLite
- Knex
- Create/Read/Update/Delete operations

## Description

You'll write a server that lets you create and read _Zoos_ stored in a Relational Database. Much of the knowledge from Node and Express will carry over to this mini project, where you'll interface with a database in your route handlers.

## Running the Project

✅ Fork and Clone this project.
✅ `cd` into your project folder.
✅ Run `npm install` or `yarn` to download the dependencies.
✅ Add `knex` and `sqlite3` npm modules.
✅ Configure `knex` to connect to `/data/lambda.sqlite3` using the `sqlite3` module.
✅ Write a set of endpionts inside `index.js` to satisfy the specifications listed below.
✅ To start the API server, run `yarn start` or `npm start`.
✅ Use _Postman_ to test your API.

## Specifications

### Table

The included database has a _zoos_ table with the following schema:

- id: integer, primary key, autoincrements.
- name: text, required, unique.

### `POST /api/zoos`

When the client makes a `POST` request to this endpoint, a new _zoo_ should be created in the _zoos_ table.

Ensure the client passes a `name` property in the request body. If there's an error, respond with an appropriate status code, and send a JSON response of the form `{ error: "Some useful error message" }`.

Return the `id` of the inserted zoo and a 201 status code.

```
router.post('/', (req, res) => {
    const message201 = { message: 'req.body.name is empty and requires a valid string' }

    req.body.name
        ? db('zoos')
            .insert(req.body, 'id')
            .then(results => res.status(200).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});
```

### GET /api/zoos

When the client makes a `GET` request to this endpoint, return a list of all the _zoos_ in the database. Remember to handle any errors and return the correct status code.

```
router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => res.status(200).json(zoos))
        .catch(err => res.status(500).json(err));
});
```

### GET /api/zoos/:id

When the client makes a `GET` request to `/api/zoos/:id`, find the _zoo_ associated with the given `id`. Remember to handle errors and send the correct status code.

```
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
```

### DELETE /api/zoos/:id

When the client makes a `DELETE` request to this endpoint, the _zoo_ that has the provided `id` should be removed from the database.

```
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
```

### PUT /api/zoos/:id

When the client makes a `PUT` request to this endpoint passing an object with the changes, the _zoo_ with the provided `id` should be updated with the new information.

```
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
```

## Stretch Problem

Add a new _bears_ table to the database and add endpoints to perform CRUD operations on it. Each bear should have an `id` and `name` property similar to the _zoos_ table.

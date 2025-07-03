const expressAdmin = require('express');
const routerAdmin = expressAdmin.Router();

routerAdmin.get('/products', async (req, res) => {
  const db = req.app.locals.db;
  const { rows } = await db.query('SELECT * FROM products');
  res.json(rows);
});

routerAdmin.post('/products', async (req, res) => {
  const db = req.app.locals.db;
  const { name, description, price, status } = req.body;
  const { rows } = await db.query(
    'INSERT INTO products (name, description, price, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, status]
  );
  res.json(rows[0]);
});

routerAdmin.put('/products/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { name, description, price, status } = req.body;
  const { rows } = await db.query(
    'UPDATE products SET name = $1, description = $2, price = $3, status = $4 WHERE id = $5 RETURNING *',
    [name, description, price, status, req.params.id]
  );
  res.json(rows[0]);
});

routerAdmin.delete('/products/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { rows } = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
  res.json(rows[0]);
});

routerAdmin.get('/suppliers', async (req, res) => {
  const db = req.app.locals.db;
  const { rows } = await db.query('SELECT * FROM suppliers');
  res.json(rows);
});

routerAdmin.post('/suppliers', async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, phone } = req.body;
  const { rows } = await db.query(
    'INSERT INTO suppliers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
    [name, email, phone]
  );
  res.json(rows[0]);
});

routerAdmin.put('/suppliers/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, phone } = req.body;
  const { rows } = await db.query(
    'UPDATE suppliers SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
    [name, email, phone, req.params.id]
  );
  res.json(rows[0]);
});

routerAdmin.delete('/suppliers/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { rows } = await db.query('DELETE FROM suppliers WHERE id = $1 RETURNING *', [req.params.id]);
  res.json(rows[0]);
});

module.exports = routerAdmin;
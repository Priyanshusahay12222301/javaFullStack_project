const express = require('express');
const { pickups } = require('../data');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', (req, res) => res.json(pickups));

  router.post('/', (req, res) => {
    const pickup = { id: Date.now(), ...req.body };
    pickups.push(pickup);
    io.emit('pickup_update', pickup); // Real-time update
    res.status(201).json(pickup);
  });

  router.put('/:id', (req, res) => {
    const idx = pickups.findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) {
      console.log('PUT: Pickup not found for id', req.params.id);
      return res.status(404).send('Not found');
    }
    pickups[idx] = { ...pickups[idx], ...req.body };
    io.emit('pickup_update', pickups[idx]);
    res.json(pickups[idx]);
  });

  // DELETE endpoint to remove a pickup by ID
  router.delete('/:id', (req, res) => {
    const idx = pickups.findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) {
      console.log('DELETE: Pickup not found for id', req.params.id);
      return res.status(404).send('Not found');
    }
    const removed = pickups.splice(idx, 1)[0];
    io.emit('pickup_update', { removed: removed.id });
    res.json({ success: true, removed });
  });

  return router;
}; 
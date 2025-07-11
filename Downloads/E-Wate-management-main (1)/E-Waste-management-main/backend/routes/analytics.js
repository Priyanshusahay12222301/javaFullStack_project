const express = require('express');
const { pickups, centers } = require('../data');
const router = express.Router();

router.get('/', (req, res) => {
  const totalWeight = pickups.reduce((sum, p) => sum + (p.weight || 0), 0);
  const monthlyPickups = pickups.length;
  const centerStats = centers.map(center => ({
    ...center,
    pickups: pickups.filter(p => p.centerId === center.id).length
  }));
  res.json({ totalWeight, monthlyPickups, centerStats });
});

module.exports = router; 
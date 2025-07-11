const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const pickupsRoutes = require('./routes/pickups');
const centersRoutes = require('./routes/centers');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api/pickups', pickupsRoutes(io));
app.use('/api/centers', centersRoutes);
app.use('/api/analytics', analyticsRoutes);

// Real-time connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

// Example automation: periodic analytics update (can be expanded)
setInterval(() => {
  // Placeholder for automated backend processing
  // e.g., io.emit('analytics_update', ...)
}, 60000); // every minute

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
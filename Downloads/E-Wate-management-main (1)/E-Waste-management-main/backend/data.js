const pickups = [
  { id: 1, date: '2024-07-10', weight: 150, location: 'Green Center', status: 'completed', centerId: 101 },
  { id: 2, date: '2024-07-11', weight: 90, location: 'Eco Point', status: 'pending', centerId: 102 },
  { id: 3, date: '2024-07-12', weight: 60, location: 'Urban Hub', status: 'in-progress', centerId: 101 },
  { id: 4, date: '2024-07-13', weight: 110, location: 'Metro Plaza', status: 'completed', centerId: 103 },
  { id: 5, date: '2024-07-14', weight: 75, location: 'River Side', status: 'pending', centerId: 104 },
  { id: 6, date: '2024-07-15', weight: 130, location: 'Tech Park', status: 'completed', centerId: 105 },
  { id: 7, date: '2024-07-16', weight: 95, location: 'Green Center', status: 'completed', centerId: 101 },
  { id: 8, date: '2024-07-17', weight: 85, location: 'Eco Point', status: 'pending', centerId: 102 },
  { id: 9, date: '2024-07-18', weight: 120, location: 'Metro Plaza', status: 'in-progress', centerId: 103 },
  { id: 10, date: '2024-07-19', weight: 100, location: 'River Side', status: 'completed', centerId: 104 },
  { id: 11, date: '2024-07-20', weight: 140, location: 'City Mall', status: 'completed', centerId: 106 },
  { id: 12, date: '2024-07-21', weight: 80, location: 'City Mall', status: 'pending', centerId: 106 }
];

const centers = [
  { id: 101, name: 'Green Center', address: '123 Green St', capacity: 1000 },
  { id: 102, name: 'Eco Point', address: '456 Eco Ave', capacity: 800 },
  { id: 103, name: 'Metro Plaza', address: '789 Metro Rd', capacity: 1200 },
  { id: 104, name: 'River Side', address: '321 River Dr', capacity: 900 },
  { id: 105, name: 'Tech Park', address: '654 Tech Blvd', capacity: 1100 },
  { id: 106, name: 'City Mall', address: '987 Mall St', capacity: 950 }
];

module.exports = { pickups, centers }; 
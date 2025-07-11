// JavaScript code

// Add active class to the clicked navigation link
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // Remove active class from all navigation links
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    // Add active class to the clicked navigation link
    link.classList.add("active");
  });
});

// Scroll to sections when clicking on the navigation links
const scrollToSection = (event) => {
  event.preventDefault();

  const target = event.target.getAttribute("href");
  const section = document.querySelector(target);

  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth"
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Handle form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Simulate form submission success with a popup
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent =
      "Form submitted successfully! We will get back to you soon.";

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000);

    // Reset the form fields
    contactForm.reset();
  });
}

function popup() {
  document.getElementById("popup").style.cssText = "visibility:visible";
  document.getElementById("contact-form").style.cssText = "visibility:hidden";
}
function cln() {
  document.getElementById("popup").style.cssText = "visibility:hidden";
  document.getElementById("contact-form").style.cssText = "visibility:visible";
}
function n1() {
  document.getElementById("nav1").style.cssText =
    "background-color: #02356cc1;color: white;padding: 10px 20px;border-radius: 10px;font-weight: bold;";
}
function n2() {
  document.getElementById("nav2").style.cssText =
    "background-color: #02356cc1;color: white;padding: 10px 20px;border-radius: 10px;font-weight: bold;";
}
function n3() {
  document.getElementById("nav3").style.cssText =
    "background-color: #02356cc1;color: white;padding: 10px 20px;border-radius: 10px;font-weight: bold;";
}
function n4() {
  document.getElementById("nav4").style.cssText =
    "background-color: #02356cc1;color: white;padding: 10px 20px;border-radius: 10px;font-weight: bold;";
}
// function displayWelcomeMessage() {
//   var welcomeText = document.getElementById("welcome-text");
//   welcomeText.textContent = "Welcome to our website!";
// }
// document.getElementById("bdy").addEventListener("load",text-ani);
// function text-ani(){
//   document.getElementById("welcome-text").style.cssText = " overflow: hidden;border-right: 1px solid #000;white-space: nowrap;margin: 0 auto;letter-spacing: 4px;animation: typing 3s steps(40, end);";
// }

// --- E-Waste Pickups Table Logic ---
const pickupTableBody = document.querySelector('#pickupTable tbody');

// Function to render pickups in the table
function renderPickups(pickups) {
  pickupTableBody.innerHTML = '';
  pickups.forEach(pickup => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pickup.id}</td>
      <td>${pickup.date || ''}</td>
      <td>${pickup.weight || ''}</td>
      <td>${pickup.location || ''}</td>
      <td>${pickup.status || ''}</td>
      <td>${pickup.centerId || ''}</td>
      <td><button class="btn btn-danger btn-sm remove-pickup-btn" data-id="${pickup.id}">Remove</button></td>
    `;
    pickupTableBody.appendChild(row);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-pickup-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      if (confirm('Are you sure you want to remove this pickup?')) {
        fetch(`http://localhost:3000/api/pickups/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => fetchPickupsAndRender())
        .catch(err => alert('Failed to remove pickup.'));
      }
    });
  });
}

// Fetch pickups from backend on page load
function fetchPickupsAndRender() {
  fetch('http://localhost:3000/api/pickups')
    .then(res => res.json())
    .then(data => renderPickups(data))
    .catch(err => {
      pickupTableBody.innerHTML = '<tr><td colspan="7">Failed to load pickups</td></tr>';
      console.error('Error fetching pickups:', err);
    });
}

// On page load, always fetch the latest pickups from the backend
fetchPickupsAndRender();

// Listen for real-time pickup updates
if (typeof io !== 'undefined') {
  const socket = io('http://localhost:3000');
  socket.on('pickup_update', function(data) {
    fetchPickupsAndRender();
    fetchAnalyticsAndRender();
  });
}

// --- Add Pickup Form Logic ---
const addPickupForm = document.getElementById('addPickupForm');
const addPickupMsg = document.getElementById('addPickupMsg');

if (addPickupForm) {
  addPickupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const pickup = {
      date: document.getElementById('pickupDate').value,
      weight: Number(document.getElementById('pickupWeight').value),
      location: document.getElementById('pickupLocation').value,
      status: document.getElementById('pickupStatus').value,
      centerId: Number(document.getElementById('pickupCenterId').value)
    };
    fetch('http://localhost:3000/api/pickups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pickup)
    })
      .then(res => res.json())
      .then(data => {
        addPickupMsg.textContent = 'Pickup added successfully!';
        addPickupMsg.className = 'alert alert-success';
        addPickupForm.reset();
        setTimeout(() => { 
          if (addPickupMsg) { addPickupMsg.textContent = ''; addPickupMsg.className = ''; }
        }, 2000);
        // Table will update via real-time event
      })
      .catch(err => {
        addPickupMsg.textContent = 'Failed to add pickup.';
        addPickupMsg.className = 'alert alert-danger';
      });
  });
}

// --- Analytics Dashboard Logic ---
const totalWeightElem = document.getElementById('totalWeight');
const monthlyPickupsElem = document.getElementById('monthlyPickups');
const centerStatsTableBody = document.querySelector('#centerStatsTable tbody');

function renderAnalytics(analytics) {
  if (totalWeightElem) totalWeightElem.textContent = analytics.totalWeight + ' kg';
  if (monthlyPickupsElem) monthlyPickupsElem.textContent = analytics.monthlyPickups;
  if (centerStatsTableBody) {
    centerStatsTableBody.innerHTML = '';
    analytics.centerStats.forEach(center => {
      const row = `<tr>
        <td>${center.id}</td>
        <td>${center.name || ''}</td>
        <td>${center.address || ''}</td>
        <td>${center.capacity || ''}</td>
        <td>${center.pickups}</td>
      </tr>`;
      centerStatsTableBody.innerHTML += row;
    });
  }
}

function fetchAnalyticsAndRender() {
  fetch('http://localhost:3000/api/analytics')
    .then(res => res.json())
    .then(data => {
      renderAnalytics(data);
      renderCenterStatsChart(data.centerStats); // Render chart after table
    })
    .catch(err => {
      if (totalWeightElem) totalWeightElem.textContent = 'Error';
      if (monthlyPickupsElem) monthlyPickupsElem.textContent = 'Error';
      if (centerStatsTableBody) centerStatsTableBody.innerHTML = '<tr><td colspan="5">Failed to load stats</td></tr>';
    });
}

fetchAnalyticsAndRender();

// Update analytics in real-time when pickups change
if (typeof io !== 'undefined') {
  const socket = io('http://localhost:3000');
  socket.on('pickup_update', function(data) {
    fetchPickupsAndRender();
    fetchAnalyticsAndRender();
  });
}

let centerStatsChart; // Global variable to hold the chart instance

function renderCenterStatsChart(centerStats) {
  const ctx = document.getElementById('centerStatsChart').getContext('2d');
  const labels = centerStats.map(center => center.name || `Center ${center.id}`);
  const data = centerStats.map(center => center.pickups);

  const animationOptions = {
    duration: 1500,
    easing: 'easeOutBounce',
  };

  const hoverOptions = {
    mode: 'nearest',
    intersect: true,
    onHover: (event, chartElement) => {
      if (chartElement.length) {
        event.native.target.style.cursor = 'pointer';
      } else {
        event.native.target.style.cursor = 'default';
      }
    }
  };

  // Destroy old chart if it exists to avoid ghost canvas issues
  if (centerStatsChart) {
    centerStatsChart.destroy();
    centerStatsChart = null;
  }

  centerStatsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Pickups per Center',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Pickups per Collection Center' }
      },
      scales: {
        y: { beginAtZero: true }
      },
      animation: animationOptions,
      hover: hoverOptions,
      onHover: (event, chartElement) => {
        if (chartElement.length) {
          event.native.target.style.cursor = 'pointer';
        } else {
          event.native.target.style.cursor = 'default';
        }
      }
    }
  });
}

// --- Live Tracking Section Logic ---
const liveTrackingTableBody = document.querySelector('#liveTrackingTable tbody');

function renderLiveTracking(pickups, centers) {
  liveTrackingTableBody.innerHTML = '';
  if (!pickups.length || !centers.length) {
    liveTrackingTableBody.innerHTML = '<tr><td colspan="8">No pickups or centers available for live tracking.</td></tr>';
    console.log('No pickups or centers to display:', pickups, centers);
    return;
  }
  pickups.forEach(pickup => {
    const center = centers.find(c => c.id == pickup.centerId) || {};
    let statusIcon = '';
    let statusColor = '';
    if ((pickup.status || '').toLowerCase().includes('complete')) {
      statusIcon = '🟢'; statusColor = 'text-success';
    } else if ((pickup.status || '').toLowerCase().includes('pending')) {
      statusIcon = '🟡'; statusColor = 'text-warning';
    } else {
      statusIcon = '🔴'; statusColor = 'text-danger';
    }
    const row = `<tr>
      <td>${pickup.id}</td>
      <td>${pickup.date || ''}</td>
      <td>${pickup.weight || ''}</td>
      <td>${pickup.location || ''}</td>
      <td class="${statusColor}">${statusIcon} ${pickup.status || ''}</td>
      <td>${center.name || ''}</td>
      <td>${center.address || ''}</td>
      <td>${center.capacity || ''}</td>
    </tr>`;
    liveTrackingTableBody.innerHTML += row;
  });
}

// Fetch live tracking data when the section is shown
window.showTrackingSection = function(event) {
  if (event) event.preventDefault();
  document.getElementById('tracking-section').style.display = 'block';
  document.getElementById('add-pickup-section').style.display = 'none';
  document.getElementById('pickups-section').style.display = 'none';
  document.getElementById('analytics-section').style.display = 'none';
  // Add blue theme
  document.body.classList.add('live-tracking-active');
  document.getElementById('tracking-section').classList.add('live-tracking-active');
  document.getElementById('nav5').classList.add('active');
  renderStaticMiniMap();
  fetchLiveTrackingAndRender();
}

// Show main sections when not in tracking
window.showMainSections = function() {
  document.getElementById('tracking-section').style.display = 'none';
  document.getElementById('add-pickup-section').style.display = 'block';
  document.getElementById('pickups-section').style.display = 'block';
  document.getElementById('analytics-section').style.display = 'block';
  // Remove blue theme
  document.body.classList.remove('live-tracking-active');
  document.getElementById('tracking-section').classList.remove('live-tracking-active');
  document.getElementById('nav5').classList.remove('active');
}
// Attach to Home nav
if (document.getElementById('nav1')) {
  document.getElementById('nav1').addEventListener('click', function() {
    showMainSections();
  });
}

// --- Leaflet Live Map for Vehicle Tracking ---
let liveMap;
let liveCenterMarkers = [];
let liveTruckMarkers = [];
let liveTruckPositions = {};

const leafletCenterIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
const leafletTruckIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Demo static coordinates for centers (India cities)
const leafletStaticLocations = {
  101: { lat: 28.6139, lng: 77.2090 }, // Green Center - Delhi
  102: { lat: 19.0760, lng: 72.8777 }, // Eco Point - Mumbai
  103: { lat: 12.9716, lng: 77.5946 }, // Metro Plaza - Bangalore
  104: { lat: 22.5726, lng: 88.3639 }, // River Side - Kolkata
  105: { lat: 13.0827, lng: 80.2707 }, // Tech Park - Chennai
  106: { lat: 23.0225, lng: 72.5714 }  // City Mall - Ahmedabad
};

function renderLiveMap(pickups, centers) {
  // Remove old map if present
  const mapContainer = document.getElementById('liveMap');
  if (liveMap) {
    liveMap.remove();
    liveMap = null;
  }
  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
    mapContainer.innerHTML = '';
  }
  liveMap = L.map('liveMap').setView([22.5, 78.9], 5.2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(liveMap);
  liveCenterMarkers = [];
  liveTruckMarkers = [];
  liveTruckPositions = {};

  // Add center markers
  centers.forEach(center => {
    const loc = leafletStaticLocations[center.id];
    if (loc) {
      const marker = L.marker([loc.lat, loc.lng], { icon: leafletCenterIcon })
        .addTo(liveMap)
        .bindPopup(`<b>${center.name}</b><br>${center.address}<br>Capacity: ${center.capacity}`);
      liveCenterMarkers.push(marker);
    }
  });

  // Add truck markers (simulate initial positions near their center)
  pickups.forEach(pickup => {
    const loc = leafletStaticLocations[pickup.centerId];
    if (loc) {
      // Random offset for demo
      const offsetLat = loc.lat + (Math.random() - 0.5) * 0.2;
      const offsetLng = loc.lng + (Math.random() - 0.5) * 0.2;
      liveTruckPositions[pickup.id] = { lat: offsetLat, lng: offsetLng };
      const marker = L.marker([offsetLat, offsetLng], { icon: leafletTruckIcon })
        .addTo(liveMap)
        .bindPopup(`<b>Pickup ID:</b> ${pickup.id}<br><b>Status:</b> ${pickup.status}<br><b>Location:</b> ${pickup.location}`);
      liveTruckMarkers.push({ id: pickup.id, marker });
    }
  });
}

// Simulate truck movement every 2 seconds
setInterval(() => {
  if (!liveMap || !liveTruckMarkers.length) return;
  liveTruckMarkers.forEach(({ id, marker }) => {
    const pos = liveTruckPositions[id];
    if (pos) {
      // Move slightly for demo
      pos.lat += (Math.random() - 0.5) * 0.01;
      pos.lng += (Math.random() - 0.5) * 0.01;
      marker.setLatLng([pos.lat, pos.lng]);
    }
  });
}, 2000);

// --- Live Tracking Map and Table (from dataset) ---
let liveTrackingMap;
let liveTrackingCenterMarkers = [];
let liveTrackingPickupMarkers = [];

// Demo coordinates for common city names (expand as needed)
const cityCoords = {
  'Delhi': { lat: 28.6139, lng: 77.2090 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'Green Center': { lat: 28.6139, lng: 77.2090 },
  'Eco Point': { lat: 19.0760, lng: 72.8777 },
  'Metro Plaza': { lat: 12.9716, lng: 77.5946 },
  'River Side': { lat: 22.5726, lng: 88.3639 },
  'Tech Park': { lat: 13.0827, lng: 80.2707 },
  'City Mall': { lat: 23.0225, lng: 72.5714 }
};

const liveTrackingCenterIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
const liveTrackingTruckIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function renderLiveTrackingMap(pickups, centers) {
  const mapContainer = document.getElementById('liveTrackingMap');
  if (liveTrackingMap) {
    liveTrackingMap.remove();
    liveTrackingMap = null;
  }
  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
    mapContainer.innerHTML = '';
  }
  liveTrackingMap = L.map('liveTrackingMap').setView([22.5, 78.9], 5.2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(liveTrackingMap);
  liveTrackingCenterMarkers = [];
  liveTrackingPickupMarkers = [];

  // Place all centers
  centers.forEach(center => {
    // Try to get coordinates by name or address
    let loc = cityCoords[center.name] || cityCoords[center.address] || null;
    if (!loc && center.address) {
      // Try to extract city from address (very basic)
      const city = Object.keys(cityCoords).find(city => center.address.includes(city));
      if (city) loc = cityCoords[city];
    }
    if (loc) {
      const marker = L.marker([loc.lat, loc.lng], { icon: liveTrackingCenterIcon })
        .addTo(liveTrackingMap)
        .bindPopup(`<b>${center.name}</b><br>${center.address}<br>Capacity: ${center.capacity}`);
      liveTrackingCenterMarkers.push(marker);
    }
  });

  // Place all pickups at their center's location
  pickups.forEach(pickup => {
    const center = centers.find(c => c.id == pickup.centerId);
    let loc = center && (cityCoords[center.name] || cityCoords[center.address]) || null;
    if (!loc && center && center.address) {
      const city = Object.keys(cityCoords).find(city => center.address.includes(city));
      if (city) loc = cityCoords[city];
    }
    if (loc) {
      const marker = L.marker([loc.lat, loc.lng], { icon: liveTrackingTruckIcon })
        .addTo(liveTrackingMap)
        .bindPopup(`<b>Pickup ID:</b> ${pickup.id}<br><b>Status:</b> ${pickup.status}<br><b>Location:</b> ${pickup.location}`);
      liveTrackingPickupMarkers.push(marker);
    }
  });
}

// Update fetchLiveTrackingAndRender to also render the map
function fetchLiveTrackingAndRender() {
  Promise.all([
    fetch('http://localhost:3000/api/pickups').then(res => res.json()),
    fetch('http://localhost:3000/api/centers').then(res => res.json())
  ]).then(([pickups, centers]) => {
    renderLiveTracking(pickups, centers);
    renderLiveTrackingMap(pickups, centers);
  }).catch(err => {
    liveTrackingTableBody.innerHTML = '<tr><td colspan="8">Failed to load live tracking data</td></tr>';
    document.getElementById('liveTrackingMap').innerHTML = '<div style="color:red">Failed to load map.</div>';
  });
}

// --- Static Mini Map for Live Tracking Demo ---
function renderStaticMiniMap() {
  const mapContainer = document.getElementById('liveTrackingMap');
  if (!mapContainer) return;
  if (window.staticMiniMap) {
    window.staticMiniMap.remove();
    window.staticMiniMap = null;
  }
  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
    mapContainer.innerHTML = '';
  }
  // Center the map on India
  const miniMap = L.map('liveTrackingMap').setView([22.5, 78.9], 5.2);
  window.staticMiniMap = miniMap;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(miniMap);

  // Static demo locations for collection centers (India)
  const demoCenters = [
    { name: 'Green Center', lat: 28.6139, lng: 77.2090 }, // Delhi
    { name: 'Eco Point', lat: 19.0760, lng: 72.8777 },   // Mumbai
    { name: 'Metro Plaza', lat: 12.9716, lng: 77.5946 }  // Bangalore
  ];
  // Static demo locations for vehicles (nearby cities)
  const demoTrucks = [
    { id: 'T1', lat: 28.7041, lng: 77.1025 }, // Near Delhi
    { id: 'T2', lat: 19.2183, lng: 72.9781 }, // Near Mumbai
    { id: 'T3', lat: 13.0827, lng: 80.2707 }  // Chennai
  ];

  const centerIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  const truckIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1995/1995476.png', // blue truck symbol
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  demoCenters.forEach(center => {
    L.marker([center.lat, center.lng], { icon: centerIcon })
      .addTo(miniMap)
      .bindPopup(`<b>Collection Center:</b> ${center.name}`);
  });
  demoTrucks.forEach(truck => {
    L.marker([truck.lat, truck.lng], { icon: truckIcon })
      .addTo(miniMap)
      .bindPopup(`<b>Vehicle ID:</b> ${truck.id}`);
  });
}

// Call this when showing the Live Tracking tab
window.showTrackingSection = function(event) {
  event.preventDefault();
  document.getElementById('tracking-section').style.display = 'block';
  document.getElementById('add-pickup-section').style.display = 'none';
  document.getElementById('pickups-section').style.display = 'none';
  document.getElementById('analytics-section').style.display = 'none';
  renderStaticMiniMap();
  fetchLiveTrackingAndRender();
}

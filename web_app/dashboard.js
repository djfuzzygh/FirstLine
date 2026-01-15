// FirstLine Analytics Dashboard
// Demonstrates public health surveillance capabilities

// Mock Data Generator (In production, this would come from backend API)
function generateMockData() {
    const symptoms = ['Fever', 'Diarrhea', 'Cough', 'Malaria', 'Headache', 'Vomiting', 'Rash'];
    const regions = ['Greater Accra', 'Ashanti', 'Northern', 'Eastern', 'Western'];
    const tiers = ['RED', 'YELLOW', 'GREEN'];

    // Generate cases for last 7 days
    const cases = [];
    const today = new Date();

    for (let i = 0; i < 150; i++) {
        const daysAgo = Math.floor(Math.random() * 7);
        const caseDate = new Date(today);
        caseDate.setDate(caseDate.getDate() - daysAgo);

        cases.push({
            id: `FL${String(1000 + i).padStart(4, '0')}`,
            date: caseDate,
            age: Math.floor(Math.random() * 80) + 1,
            symptom: symptoms[Math.floor(Math.random() * symptoms.length)],
            tier: tiers[Math.floor(Math.random() * tiers.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            responseTime: Math.floor(Math.random() * 15) + 2 // 2-17 minutes
        });
    }

    return cases;
}

// Load Data (Real + Mock)
// Load Data (Real + Mock)
async function loadDashboardData() {
    try {
        // 1. Fetch Real Cases from Backend DB
        const response = await fetch(`${API_BASE}/cases`);
        const dbCases = await response.json();

        // Convert date strings
        dbCases.forEach(c => c.date = new Date(c.date));

        // 2. Generate Mock Data (for demo fullness if DB is empty)
        const mockCases = generateMockData();

        // 3. Combine (Real cases on top)
        allCases = [...dbCases, ...mockCases].sort((a, b) => new Date(b.date) - new Date(a.date));

        refreshDashboard();
        console.log(`✅ Loaded ${dbCases.length} cases from backend.`);
    } catch (e) {
        console.error("Failed to load cases from backend, using LocalStorage fallback", e);
        // Fallback to LocalStorage
        const storedCases = JSON.parse(localStorage.getItem('firstline_cases') || '[]');
        storedCases.forEach(c => c.date = new Date(c.date));
        const mockCases = generateMockData();
        allCases = [...storedCases, ...mockCases].sort((a, b) => new Date(b.date) - new Date(a.date));
        refreshDashboard();
    }
}

let allCases = [];
// Initial Load
loadDashboardData();

// Listen for updates (if other tabs add cases)
window.addEventListener('storage', () => {
    loadDashboardData();
    refreshDashboard();
});

// Update Key Metrics
function updateMetrics() {
    const totalCases = allCases.length;
    const redCases = allCases.filter(c => c.tier === 'RED').length;
    const avgTime = Math.round(allCases.reduce((sum, c) => sum + c.responseTime, 0) / totalCases);
    const activeChws = 47; // Mock data

    document.getElementById('total-cases').textContent = totalCases;
    document.getElementById('red-cases').textContent = redCases;
    document.getElementById('avg-time').textContent = avgTime;
    document.getElementById('active-chws').textContent = activeChws;
}

// Cases Timeline Chart
function createTimelineChart() {
    const ctx = document.getElementById('cases-timeline-chart').getContext('2d');

    // Group cases by day
    const last7Days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    const casesPerDay = last7Days.map((day, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - index));
        return allCases.filter(c =>
            c.date.toDateString() === date.toDateString()
        ).length;
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Cases',
                data: casesPerDay,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// Triage Distribution Pie Chart
function createTriagePieChart() {
    const ctx = document.getElementById('triage-pie-chart').getContext('2d');

    const redCount = allCases.filter(c => c.tier === 'RED').length;
    const yellowCount = allCases.filter(c => c.tier === 'YELLOW').length;
    const greenCount = allCases.filter(c => c.tier === 'GREEN').length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['RED (Emergency)', 'YELLOW (Urgent)', 'GREEN (Routine)'],
            datasets: [{
                data: [redCount, yellowCount, greenCount],
                backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Top Symptoms Bar Chart
function createSymptomsChart() {
    const ctx = document.getElementById('symptoms-bar-chart').getContext('2d');

    // Count symptoms
    const symptomCounts = {};
    allCases.forEach(c => {
        symptomCounts[c.symptom] = (symptomCounts[c.symptom] || 0) + 1;
    });

    const sortedSymptoms = Object.entries(symptomCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedSymptoms.map(s => s[0]),
            datasets: [{
                label: 'Cases',
                data: sortedSymptoms.map(s => s[1]),
                backgroundColor: '#667eea'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// Age Distribution Chart
function createAgeDistributionChart() {
    const ctx = document.getElementById('age-distribution-chart').getContext('2d');

    const ageGroups = {
        '0-5': 0,
        '6-12': 0,
        '13-18': 0,
        '19-40': 0,
        '41-60': 0,
        '60+': 0
    };

    allCases.forEach(c => {
        if (c.age <= 5) ageGroups['0-5']++;
        else if (c.age <= 12) ageGroups['6-12']++;
        else if (c.age <= 18) ageGroups['13-18']++;
        else if (c.age <= 40) ageGroups['19-40']++;
        else if (c.age <= 60) ageGroups['41-60']++;
        else ageGroups['60+']++;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(ageGroups),
            datasets: [{
                label: 'Cases',
                data: Object.values(ageGroups),
                backgroundColor: '#764ba2'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add Hotspots to Map
function addHotspots() {
    const map = document.getElementById('ghana-map');

    // Mock hotspot locations (in production, use real GPS coordinates)
    const hotspots = [
        { name: 'Accra', x: 60, y: 70, count: 45 },
        { name: 'Kumasi', x: 45, y: 50, count: 32 },
        { name: 'Tamale', x: 50, y: 20, count: 18 },
        { name: 'Cape Coast', x: 40, y: 75, count: 12 },
        { name: 'Ho', x: 70, y: 60, count: 8 }
    ];

    hotspots.forEach(spot => {
        const hotspot = document.createElement('div');
        hotspot.className = 'hotspot';
        hotspot.style.left = `${spot.x}%`;
        hotspot.style.top = `${spot.y}%`;
        hotspot.setAttribute('data-count', `${spot.name}: ${spot.count} cases`);

        // Size based on count
        const size = 15 + (spot.count / 5);
        hotspot.style.width = `${size}px`;
        hotspot.style.height = `${size}px`;

        map.appendChild(hotspot);
    });
}

// Populate Recent Cases Table
function populateTable() {
    const tbody = document.getElementById('cases-tbody');
    tbody.innerHTML = '';

    // Show last 10 cases
    const recentCases = allCases
        .sort((a, b) => b.date - a.date)
        .slice(0, 10);

    recentCases.forEach(c => {
        const row = document.createElement('tr');

        const ageGroup = c.age <= 5 ? '0-5' : c.age <= 18 ? '6-18' : c.age <= 40 ? '19-40' : '40+';
        const tierBadge = `<span class="badge badge-${c.tier.toLowerCase()}">${c.tier}</span>`;

        row.innerHTML = `
            <td>${c.id}</td>
            <td>${c.date.toLocaleDateString()}</td>
            <td>${ageGroup} years</td>
            <td>${c.symptom}</td>
            <td>${tierBadge}</td>
            <td>${c.region}</td>
            <td>${c.responseTime} min</td>
        `;

        tbody.appendChild(row);
    });
}

// Filter Data
function applyFilters() {
    const timePeriod = document.getElementById('time-period').value;
    const region = document.getElementById('region-filter').value;
    const tier = document.getElementById('tier-filter').value;

    // Filter by time period
    let filtered = allCases;
    const today = new Date();

    if (timePeriod === 'today') {
        filtered = filtered.filter(c => c.date.toDateString() === today.toDateString());
    } else if (timePeriod === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(c => c.date >= weekAgo);
    } else if (timePeriod === 'month') {
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        filtered = filtered.filter(c => c.date >= monthAgo);
    }

    // Filter by region
    if (region !== 'all') {
        const regionName = region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        filtered = filtered.filter(c => c.region === regionName);
    }

    // Filter by tier
    if (tier !== 'all') {
        filtered = filtered.filter(c => c.tier === tier);
    }

    // Update display with filtered data
    allCases = filtered;
    refreshDashboard();
}

// Refresh Dashboard
function refreshDashboard() {
    updateMetrics();
    populateTable();

    // Clear and recreate charts
    document.getElementById('cases-timeline-chart').remove();
    document.getElementById('triage-pie-chart').remove();
    document.getElementById('symptoms-bar-chart').remove();
    document.getElementById('age-distribution-chart').remove();

    // Recreate canvas elements
    const containers = document.querySelectorAll('.chart-container');
    containers[0].innerHTML = '<canvas id="cases-timeline-chart"></canvas>';
    containers[1].innerHTML = '<canvas id="triage-pie-chart"></canvas>';
    containers[2].innerHTML = '<canvas id="symptoms-bar-chart"></canvas>';
    containers[3].innerHTML = '<canvas id="age-distribution-chart"></canvas>';

    createTimelineChart();
    createTriagePieChart();
    createSymptomsChart();
    createAgeDistributionChart();
}

// Event Listeners
document.getElementById('time-period').addEventListener('change', () => {
    allCases = generateMockData();
    applyFilters();
});

document.getElementById('region-filter').addEventListener('change', applyFilters);
document.getElementById('tier-filter').addEventListener('change', applyFilters);

document.getElementById('refresh-btn').addEventListener('click', () => {
    allCases = generateMockData();
    refreshDashboard();

    // Show feedback
    const btn = document.getElementById('refresh-btn');
    btn.textContent = '✅ Refreshed!';
    setTimeout(() => {
        btn.textContent = '🔄 Refresh Data';
    }, 2000);
});

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateMetrics();
    createTimelineChart();
    createTriagePieChart();
    createSymptomsChart();
    createAgeDistributionChart();
    addHotspots();
    populateTable();

    console.log('📊 Dashboard initialized with', allCases.length, 'cases');
});

// Auto-refresh every 30 seconds (in production)
// setInterval(() => {
//     allCases = generateMockData();
//     refreshDashboard();
// }, 30000);

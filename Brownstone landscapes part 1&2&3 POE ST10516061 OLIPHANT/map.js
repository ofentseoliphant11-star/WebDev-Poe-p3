// - Interactive map (Leaflet) -
let businessLatLng = [-29.0950, 26.2150];

let map = L.map('map').setView(businessLatLng, 15);

// OpenStreetMap tiles (the attribution is required by their license)
L.tileLayer('https://api.maptiler.com/maps/topo-v4/{z}/{x}/{y}.png?key=RigTYVT2XcRwsspF8Lhl', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker with a popup that opens on click
L.marker(businessLatLng)
    .addTo(map)
    .bindPopup(
        '<strong>Brownstone Landscapes</strong><br>' +
        'Waverley Rd, Waverley<br>Bloemfontein 9301<br>' +
        '<a href="https://www.google.com/maps/dir/?api=1&destination=' +
        businessLatLng[0] + ',' + businessLatLng[1] +
        '" target="_blank" rel="noopener">Get directions</a>'
    )
    .openPopup();

// ---------- Scroll reveal ----------
let revealItems = document.querySelectorAll('.reveal');
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => observer.observe(el));



document.getElementById('contactForm').addEventListener('submit', function(event) {
    //validation for basic checks
    if (!this.checkValidity()) {
        return; 
    }

    event.preventDefault(); // Stop submission for AJAX

    // Prevent empty spaces only
    let messageText = document.getElementById('con-message').value.trim();
    if (messageText === "") {
        alert("Message cannot be empty spaces.");
        return;
    }

    // Submit to Formspree
    let formData = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            window.location.href = "index.html"; 
        } else {
            alert("Oops! There was a problem sending your message.");
        }
    });
});
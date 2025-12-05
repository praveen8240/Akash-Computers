// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Initialize Map using Leaflet (OpenStreetMap) - No API key required
function initMap() {
    // Location coordinates
    const lat = 16.620138;
    const lng = 80.543751;
    
    // Create map
    const map = L.map('map').setView([lat, lng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Create custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #2563eb; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div><div style="position: absolute; top: 8px; left: 8px; transform: rotate(45deg); color: white; font-weight: bold; font-size: 18px;">📍</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
    
    // Create marker with popup
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    
    // Popup content
    const popupContent = `
        <div style="padding: 5px; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #2563eb; font-size: 16px;">Akash Computers</h3>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Owner:</strong> Manubolu Ramana Rao</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Address:</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">JGCV+3G2, Postoffice Road</p>
            <p style="margin: 5px 0; font-size: 13px;">Kondapalli, Andhra Pradesh</p>
            <p style="margin: 10px 0 5px 0; font-size: 13px;"><strong>Coordinates:</strong></p>
            <p style="margin: 5px 0; font-size: 12px;">16°37'12.5"N, 80°32'37.5"E</p>
            <p style="margin: 5px 0; font-size: 12px;">(16.620138, 80.543751)</p>
            <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" 
               style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; font-size: 12px;">
                Open in Google Maps
            </a>
        </div>
    `;
    
    marker.bindPopup(popupContent).openPopup();
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize map - small delay to ensure map container is ready
    setTimeout(() => {
        if (typeof L !== 'undefined') {
            initMap();
        } else {
            // Fallback if Leaflet fails to load
            document.getElementById('map').innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; flex-direction: column; padding: 20px; text-align: center;">
                    <h3 style="margin-bottom: 10px; color: #2563eb;">Akash Computers</h3>
                    <p style="margin: 5px 0;"><strong>Address:</strong></p>
                    <p style="margin: 5px 0;">JGCV+3G2, Postoffice Road</p>
                    <p style="margin: 5px 0;">Kondapalli, Andhra Pradesh</p>
                    <p style="margin: 10px 0 5px 0;"><strong>Coordinates:</strong></p>
                    <p style="margin: 5px 0;">16°37'12.5"N, 80°32'37.5"E</p>
                    <p style="margin: 5px 0;">(16.620138, 80.543751)</p>
                    <a href="https://www.google.com/maps?q=16.620138,80.543751" target="_blank" 
                       style="margin-top: 15px; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
                        Open in Google Maps
                    </a>
                </div>
            `;
        }
    }, 200);
});

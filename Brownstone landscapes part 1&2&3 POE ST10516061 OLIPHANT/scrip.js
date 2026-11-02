
// Fade in each section as it scrolls into view
let revealItems = document.querySelectorAll('main h2, main p');

revealItems.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`; // staggered, one after another
});

let observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => observer.observe(el));



document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DATA MODEL: Store the services list dynamically in JavaScript
    let pageData = {
        "services-list": `
            <ul>
                <li>Artificial turf installation</li>
                <li>Garden landscaping</li>
                <li>Custom landscape design</li>
                <li>Garden design</li>
                <li>Landscape installations</li>
            </ul>
        `
    };

    // 2. DYNAMIC DOM INJECTION
    // Find the content containers and inject the HTML based on their data-source attribute
    let contentContainers = document.querySelectorAll('.accordion-content');
    contentContainers.forEach(container => {
        let sourceKey = container.getAttribute('data-source');
        if (pageData[sourceKey]) {
            container.innerHTML = pageData[sourceKey]; // Dynamically injecting HTML
        }
    });

    // 3. EVENT DELEGATION
    // Attach a single listener to the parent container instead of individual buttons
    let accordionContainer = document.getElementById('accordion-container');
    
    if (accordionContainer) {
        accordionContainer.addEventListener('click', (e) => {
            // Find the closest button header that was clicked
            let header = e.target.closest('.accordion-header');
            if (!header) return; // If clicked outside a header, do nothing

            // Find related elements dynamically by traversing the DOM
            let panel = header.nextElementSibling;
            let icon = header.querySelector('.accordion-icon');
            
            // Determine current state
            let isExpanded = header.getAttribute('aria-expanded') === 'true';

            // 4. DYNAMIC ATTRIBUTE & CLASS MANIPULATION
            // Toggle the state
            header.setAttribute('aria-expanded', String(!isExpanded));
            panel.classList.toggle('is-open');
            
            // Dynamically change the icon text via JS (+ for closed, − for open)
            icon.textContent = isExpanded ? '+' : '−'; 
        });
    }
});





// ==========================================
// LIGHTBOX GALLERY FUNCTIONALITY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");
    let closeBtn = document.getElementById("lightbox-close");
    let galleryImages = document.querySelectorAll(".gallery-item");

    // 1. Open Lightbox using Event Delegation
    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            // Set the lightbox image source to the clicked image's source
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            
            // Show the lightbox
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            
            // Prevent background scrolling
            document.body.style.overflow = "hidden";
        });
    });

    // 2. Close Lightbox Function
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        
        // Re-enable background scrolling
        document.body.style.overflow = "auto";
        
        // Clear the source after fade out to prevent visual glitch
        setTimeout(() => {
            lightboxImg.src = "";
        }, 300); 
    }

    // 3. Close on 'X' button click
    closeBtn.addEventListener("click", closeLightbox);

    // 4. Close when clicking anywhere on the dark background (outside the image)
    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 5. Close on 'Escape' key press (Accessibility)
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});



// ==========================================
// DYNAMIC CONTENT & SEARCH/SORT FUNCTIONALITY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    let projectContainer = document.getElementById("project-listings");
    let searchInput = document.getElementById("search-input");
    let sortSelect = document.getElementById("sort-select");

    // Only run if the container exists on the page (e.g., Index.html)
    if (projectContainer) {
        
        // 1. Simulated Data
        let projectsData = [
            {
                title: "Modern Courtyard Makeover",
                description: "Complete redesign featuring artificial turf and custom paving.",
                image: "IMAGES/pic3.jpg"
            },
            {
                title: "Bloemfontein Commercial Garden",
                description: "Low-maintenance landscaping installed for a local office park.",
                image: "IMAGES/pic 4.jpg"
            },
            {
                title: "Residential Backyard Retreat",
                description: "Custom garden design focused on flow and greenery.",
                image: "IMAGES/pic 1.jpg"
            }
        ];

        // 2. Function to Render the Cards
        let renderProjects = (dataArray) => {
            projectContainer.innerHTML = ""; // Clear current HTML

            // If no results found after filtering
            if (dataArray.length === 0) {
                projectContainer.innerHTML = "<p class='loading-text'>No projects found matching your search.</p>";
                return;
            }

            // Loop through the data and build cards
            dataArray.forEach((project, index) => {
                let card = document.createElement("div");
                card.className = "project-card";
                card.style.animationDelay = `${index * 0.1}s`; // Stagger animation

                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                `;
                projectContainer.appendChild(card);
            });
        };

        // 3. Simulate Initial Load
        setTimeout(() => {
            renderProjects(projectsData);
        }, 1000); 

        // 4. SEARCH & SORT LOGIC
        let updateDisplay = () => {
            let searchTerm = searchInput.value.toLowerCase();
            let sortValue = sortSelect.value;

            // Step A: Filter the data based on search term
            let filteredData = projectsData.filter(project => {
                return project.title.toLowerCase().includes(searchTerm) || 
                       project.description.toLowerCase().includes(searchTerm);
            });

            // Step B: Sort the filtered data
            if (sortValue === "az") {
                filteredData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortValue === "za") {
                filteredData.sort((a, b) => b.title.localeCompare(a.title));
            }

            // Step C: Render the new array
            renderProjects(filteredData);
        };

        // 5. EVENT LISTENERS FOR CONTROLS
        // 'input' fires every time a user types a letter
        searchInput.addEventListener("input", updateDisplay);
        
        // 'change' fires when the user selects a new dropdown option
        sortSelect.addEventListener("change", updateDisplay);
    }
});
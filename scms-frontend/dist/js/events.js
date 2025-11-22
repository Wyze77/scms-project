/* ================================================
   SCMS - Events Page Script
   Browse, filter, and register for campus events
   ================================================ */

/* ================== Events Data ================== */

const EVENTS_DATA = [
    {
      id: 1,
      title: "Tech Club Hackathon",
      description: "A full-day hackathon focusing on web and mobile apps.",
      category: "Competition",
      location: "Building A - Lab 3",
      start: "2025-05-10T09:00",
      end: "2025-05-10T17:00",
      capacity: 50,
    },
    {
      id: 2,
      title: "Career Development Workshop",
      description:
        "Learn how to build a portfolio, write a CV, and prepare for interviews.",
      category: "Workshop",
      location: "Auditorium 2",
      start: "2025-05-14T14:00",
      end: "2025-05-14T16:00",
      capacity: 100,
    },
    {
      id: 3,
      title: "AI in Education Seminar",
      description: "A seminar about the impact of AI in learning environments.",
      category: "Seminar",
      location: "Main Seminar Hall",
      start: "2025-05-20T10:00",
      end: "2025-05-20T12:00",
      capacity: 80,
    },
    {
      id: 4,
      title: "Cultural Night",
      description:
        "An evening of performances and food from different cultures.",
      category: "Social",
      location: "Central Courtyard",
      start: "2025-05-25T18:00",
      end: "2025-05-25T21:00",
      capacity: 200,
    },
  ];
  
  /* ================== Page Initialization ================== */
  
  document.addEventListener("DOMContentLoaded", () => {
    renderEvents(EVENTS_DATA);
    initializeFilters();
  });
  
  /* ================== Filter System ================== */
  
  /**
   * Initialize search and category filter handlers
   */
  function initializeFilters() {
    const searchInput = document.getElementById("eventSearchInput");
    const categoryFilter = document.getElementById("eventCategoryFilter");
  
    if (!searchInput || !categoryFilter) return;
  
    const applyFilters = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value;
  
      const filteredData = EVENTS_DATA.filter((event) => {
        const matchesCategory =
          selectedCategory === "all" || event.category === selectedCategory;
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm);
  
        return matchesCategory && matchesSearch;
      });
  
      renderEvents(filteredData);
    };
  
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
  }
  
  /* ================== Rendering Functions ================== */
  
  /**
   * Render events list to the page
   * @param {Array} eventsList - Array of event objects to render
   */
  function renderEvents(eventsList) {
    const container = document.getElementById("eventsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (!eventsList.length) {
      container.innerHTML = `<p class="meta-text-muted">No events found.</p>`;
      return;
    }
  
    const registeredIds = loadFromStorage(SCMS_KEYS.REGISTERED_EVENTS, []);
  
    eventsList.forEach((event) => {
      const card = createEventCard(event, registeredIds);
      container.appendChild(card);
    });
  }
  
  /**
   * Create a single event card element
   * @param {Object} event - Event data object
   * @param {Array} registeredIds - Array of registered event IDs
   * @returns {HTMLElement} Card element
   */
  function createEventCard(event, registeredIds) {
    const card = document.createElement("article");
    card.className = "card";
  
    // Header with title and category tag
    const header = document.createElement("div");
    header.className = "card-header";
  
    const title = document.createElement("h3");
    title.textContent = event.title;
  
    const categoryTag = document.createElement("span");
    categoryTag.className = "tag";
    categoryTag.textContent = event.category;
  
    header.appendChild(title);
    header.appendChild(categoryTag);
  
    // Description
    const description = document.createElement("p");
    description.textContent = event.description;
  
    // Metadata (date/time and location)
    const metadata = document.createElement("p");
    metadata.className = "meta-text-muted";
    metadata.textContent = `${formatDateTime(event.start)} · ${event.location}`;
  
    // Footer with capacity and actions
    const footer = document.createElement("div");
    footer.className = "card-footer";
  
    const isRegistered = registeredIds.includes(event.id);
    const currentRegisteredCount = isRegistered ? 1 : 0; // Simplified demo
  
    const capacityInfo = document.createElement("span");
    capacityInfo.textContent = `Capacity: ${currentRegisteredCount}/${event.capacity}`;
  
    const actionsContainer = document.createElement("div");
  
    const viewButton = document.createElement("button");
    viewButton.className = "btn-secondary";
    viewButton.textContent = "View details";
    viewButton.addEventListener("click", () =>
      openEventModal(event, currentRegisteredCount)
    );
  
    const registerButton = document.createElement("button");
    registerButton.className = "btn-primary";
    registerButton.textContent = isRegistered ? "Registered" : "Register";
    registerButton.disabled = isRegistered;
  
    registerButton.addEventListener("click", () => {
      registerForEvent(event.id);
      registerButton.textContent = "Registered";
      registerButton.disabled = true;
      showToast("Event registered successfully.");
    });
  
    actionsContainer.appendChild(viewButton);
    actionsContainer.appendChild(registerButton);
  
    footer.appendChild(capacityInfo);
    footer.appendChild(actionsContainer);
  
    // Assemble card
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(metadata);
    card.appendChild(footer);
  
    return card;
  }
  
  /* ================== Utility Functions ================== */
  
  /**
   * Format ISO datetime string to localized string
   * @param {string} isoString - ISO datetime string
   * @returns {string} Formatted datetime string
   */
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
  }
  
  /* ================== Modal & Actions ================== */
  
  /**
   * Open modal with full event details
   * @param {Object} event - Event data object
   * @param {number} registeredCount - Number of registered attendees
   */
  function openEventModal(event, registeredCount) {
    const modalContent = `
      <h2>${event.title}</h2>
      <p class="meta-text">${formatDateTime(event.start)} · ${event.location}</p>
      <div class="divider"></div>
      <p>${event.description}</p>
      <p class="meta-text">Capacity: ${registeredCount}/${event.capacity}</p>
    `;
    openModal(modalContent);
  }
  
  /**
   * Register user for an event
   * @param {number} eventId - ID of event to register for
   */
  function registerForEvent(eventId) {
    const registeredIds = loadFromStorage(SCMS_KEYS.REGISTERED_EVENTS, []);
  
    if (!registeredIds.includes(eventId)) {
      registeredIds.push(eventId);
      saveToStorage(SCMS_KEYS.REGISTERED_EVENTS, registeredIds);
    }
  }
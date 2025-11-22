
const ANNOUNCEMENTS_DATA = [
    {
      id: 1,
      title: "Midterm Exam Schedule Released",
      description:
        "The midterm examination schedule for all departments has been released. Please check the academic portal for your detailed timetable.",
      category: "Academic",
      date: "2025-03-12",
      isNew: true,
    },
    {
      id: 2,
      title: "Library Opening Hours Extended",
      description:
        "The main library will now be open until 9:00 PM on weekdays during exam season.",
      category: "Academic",
      date: "2025-03-10",
      isNew: false,
    },
    {
      id: 3,
      title: "Tech Club Weekly Meetup",
      description:
        "Join us this Friday for a hands-on workshop on building web apps.",
      category: "Club",
      date: "2025-03-15",
      isNew: true,
    },
    {
      id: 4,
      title: "Emergency Drill Notification",
      description:
        "A campus-wide emergency drill will be conducted next Monday at 10:00 AM.",
      category: "Emergency",
      date: "2025-03-18",
      isNew: true,
    },
    {
      id: 5,
      title: "Cultural Night Event",
      description:
        "Experience a night of performances, food, and culture organized by the Student Union.",
      category: "Event",
      date: "2025-03-20",
      isNew: false,
    },
  ];
  
  /* ================== Page Initialization ================== */
  
  document.addEventListener("DOMContentLoaded", () => {
    renderAnnouncements(ANNOUNCEMENTS_DATA);
    initializeFilters();
  });
  
  /* ================== Filter System ================== */
  
  /**
   * Initialize search and category filter handlers
   */
  function initializeFilters() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
  
    if (!searchInput || !categoryFilter) return;
  
    const applyFilters = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value;
  
      const filteredData = ANNOUNCEMENTS_DATA.filter((announcement) => {
        const matchesCategory =
          selectedCategory === "all" || announcement.category === selectedCategory;
        const matchesSearch =
          announcement.title.toLowerCase().includes(searchTerm) ||
          announcement.description.toLowerCase().includes(searchTerm);
  
        return matchesCategory && matchesSearch;
      });
  
      renderAnnouncements(filteredData);
    };
  
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
  }
  
  /* ================== Rendering Functions ================== */
  
  /**
   * Render announcements list to the page
   * @param {Array} announcementsList - Array of announcement objects to render
   */
  function renderAnnouncements(announcementsList) {
    const container = document.getElementById("announcementsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (!announcementsList.length) {
      container.innerHTML = `<p class="meta-text-muted">No announcements found.</p>`;
      return;
    }
  
    const savedIds = loadFromStorage(SCMS_KEYS.SAVED_ANNOUNCEMENTS, []);
  
    announcementsList.forEach((announcement) => {
      const card = createAnnouncementCard(announcement, savedIds);
      container.appendChild(card);
    });
  }
  
  /**
   * Create a single announcement card element
   * @param {Object} announcement - Announcement data object
   * @param {Array} savedIds - Array of saved announcement IDs
   * @returns {HTMLElement} Card element
   */
  function createAnnouncementCard(announcement, savedIds) {
    const card = document.createElement("article");
    card.className = "card";
  
    // Header with title and badges
    const header = document.createElement("div");
    header.className = "card-header";
  
    const title = document.createElement("h3");
    title.textContent = announcement.title;
  
    const badgesContainer = document.createElement("div");
  
    const categoryTag = document.createElement("span");
    categoryTag.className = "tag";
    categoryTag.textContent = announcement.category;
    badgesContainer.appendChild(categoryTag);
  
    if (announcement.isNew) {
      const newBadge = document.createElement("span");
      newBadge.className = "badge badge-new";
      newBadge.textContent = "New";
      badgesContainer.appendChild(newBadge);
    }
  
    header.appendChild(title);
    header.appendChild(badgesContainer);
  
    // Description
    const description = document.createElement("p");
    description.textContent = announcement.description;
  
    // Metadata
    const metadata = document.createElement("p");
    metadata.className = "meta-text-muted";
    metadata.textContent = `Date: ${announcement.date}`;
  
    // Action buttons
    const actionsContainer = document.createElement("div");
    actionsContainer.style.display = "flex";
    actionsContainer.style.justifyContent = "space-between";
    actionsContainer.style.alignItems = "center";
    actionsContainer.style.marginTop = "0.5rem";
  
    const viewButton = document.createElement("button");
    viewButton.className = "btn-secondary";
    viewButton.textContent = "View details";
    viewButton.addEventListener("click", () =>
      openAnnouncementModal(announcement)
    );
  
    const saveButton = document.createElement("button");
    saveButton.className = "btn-primary";
    const isAlreadySaved = savedIds.includes(announcement.id);
    saveButton.textContent = isAlreadySaved ? "Saved" : "Save";
    saveButton.disabled = isAlreadySaved;
  
    saveButton.addEventListener("click", () => {
      saveAnnouncement(announcement.id);
      saveButton.textContent = "Saved";
      saveButton.disabled = true;
    });
  
    actionsContainer.appendChild(viewButton);
    actionsContainer.appendChild(saveButton);
  
    // Assemble card
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(metadata);
    card.appendChild(actionsContainer);
  
    return card;
  }
  
  /* ================== Modal & Actions ================== */
  
  /**
   * Open modal with full announcement details
   * @param {Object} announcement - Announcement data object
   */
  function openAnnouncementModal(announcement) {
    const modalContent = `
      <h2>${announcement.title}</h2>
      <p class="meta-text">Category: ${announcement.category} · Date: ${announcement.date}</p>
      <div class="divider"></div>
      <p>${announcement.description}</p>
    `;
    openModal(modalContent);
  }
  
  /**
   * Save announcement to user's saved list
   * @param {number} announcementId - ID of announcement to save
   */
  function saveAnnouncement(announcementId) {
    const savedIds = loadFromStorage(SCMS_KEYS.SAVED_ANNOUNCEMENTS, []);
  
    if (!savedIds.includes(announcementId)) {
      savedIds.push(announcementId);
      saveToStorage(SCMS_KEYS.SAVED_ANNOUNCEMENTS, savedIds);
      showToast("Announcement saved successfully.");
    } else {
      showToast("Already saved.", "error");
    }
  }
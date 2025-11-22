/* ================== Mock Data ================== */

const MOCK_ANNOUNCEMENTS = [
    {
      id: 1,
      title: "Midterm Exam Schedule Released",
      description: "",
      category: "Academic",
      date: "2025-03-12",
      isNew: true,
    },
    {
      id: 2,
      title: "Library Opening Hours Extended",
      description: "",
      category: "Academic",
      date: "2025-03-10",
      isNew: false,
    },
  ];
  
  const MOCK_EVENTS = [
    {
      id: 1,
      title: "Tech Club Hackathon",
      location: "Building A - Lab 3",
    },
    {
      id: 2,
      title: "Art Exhibition",
      location: "Main Hall",
    },
  ];
  
  const MOCK_CLUBS = [
    { id: 1, name: "Tech Innovators", category: "Tech" },
    { id: 2, name: "Campus Football Club", category: "Sports" },
  ];
  
  /* ================== Dashboard Initialization ================== */
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeGreeting();
    initializeUsernameInput();
    initializeLocalThemeToggle();
    displayLastVisitedPage();
  
    // Render saved items
    renderSavedAnnouncements();
    renderRegisteredEvents();
    renderJoinedClubs();
  });
  
  /* ================== User Profile Management ================== */
  
  /**
   * Initialize greeting with saved username
   */
  function initializeGreeting() {
    const greetingElement = document.getElementById("dashboardGreeting");
    const savedUsername = loadFromStorage(SCMS_KEYS.USERNAME, "");
  
    if (greetingElement && savedUsername) {
      greetingElement.textContent = `Welcome, ${savedUsername}`;
    }
  }
  
  /**
   * Initialize username input field and save button
   */
  function initializeUsernameInput() {
    const usernameInput = document.getElementById("usernameInput");
    const saveUsernameBtn = document.getElementById("saveUsernameBtn");
    const greetingElement = document.getElementById("dashboardGreeting");
  
    if (!usernameInput || !saveUsernameBtn || !greetingElement) return;
  
    // Pre-fill with saved username
    const savedUsername = loadFromStorage(SCMS_KEYS.USERNAME, "");
    if (savedUsername) {
      usernameInput.value = savedUsername;
    }
  
    // Save username on button click
    saveUsernameBtn.addEventListener("click", () => {
      const newUsername = usernameInput.value.trim();
  
      if (!newUsername) {
        showToast("Please enter a name.", "error");
        return;
      }
  
      saveToStorage(SCMS_KEYS.USERNAME, newUsername);
      greetingElement.textContent = `Welcome, ${newUsername}`;
      showToast("Name saved successfully.");
    });
  }
  
  /**
   * Initialize local theme toggle button (dashboard-specific)
   */
  function initializeLocalThemeToggle() {
    const localThemeToggle = document.getElementById("localThemeToggle");
  
    if (localThemeToggle) {
      localThemeToggle.addEventListener("click", toggleTheme);
    }
  }
  
  /**
   * Display the last visited page
   */
  function displayLastVisitedPage() {
    const lastVisitedDisplay = document.getElementById("lastVisitedDisplay");
  
    if (lastVisitedDisplay) {
      const lastPage = loadFromStorage(SCMS_KEYS.LAST_VISITED, "index.html");
      lastVisitedDisplay.textContent = lastPage;
    }
  }
  
  /* ================== Saved Items Rendering ================== */
  
  /**
   * Render list of saved announcements
   */
  function renderSavedAnnouncements() {
    const container = document.getElementById("savedAnnouncementsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    const savedIds = loadFromStorage(SCMS_KEYS.SAVED_ANNOUNCEMENTS, []);
  
    if (!savedIds.length) {
      container.innerHTML = `<p class="meta-text-muted">No saved announcements yet.</p>`;
      return;
    }
  
    const savedItems = MOCK_ANNOUNCEMENTS.filter((announcement) =>
      savedIds.includes(announcement.id)
    );
  
    savedItems.slice(0, 5).forEach((announcement) => {
      const itemElement = document.createElement("div");
      itemElement.className = "list-item";
      itemElement.textContent = `${announcement.title} (${announcement.category})`;
      container.appendChild(itemElement);
    });
  }
  
  /**
   * Render list of registered events
   */
  function renderRegisteredEvents() {
    const container = document.getElementById("registeredEventsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    const registeredIds = loadFromStorage(SCMS_KEYS.REGISTERED_EVENTS, []);
  
    if (!registeredIds.length) {
      container.innerHTML = `<p class="meta-text-muted">No registered events yet.</p>`;
      return;
    }
  
    const registeredItems = MOCK_EVENTS.filter((event) =>
      registeredIds.includes(event.id)
    );
  
    registeredItems.slice(0, 5).forEach((event) => {
      const itemElement = document.createElement("div");
      itemElement.className = "list-item";
      itemElement.textContent = `${event.title} @ ${event.location}`;
      container.appendChild(itemElement);
    });
  }
  
  /**
   * Render list of joined clubs
   */
  function renderJoinedClubs() {
    const container = document.getElementById("joinedClubsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    const joinedIds = loadFromStorage(SCMS_KEYS.JOINED_CLUBS, []);
  
    if (!joinedIds.length) {
      container.innerHTML = `<p class="meta-text-muted">No joined clubs yet.</p>`;
      return;
    }
  
    const joinedItems = MOCK_CLUBS.filter((club) =>
      joinedIds.includes(club.id)
    );
  
    joinedItems.slice(0, 5).forEach((club) => {
      const itemElement = document.createElement("div");
      itemElement.className = "list-item";
      itemElement.textContent = `${club.name} (${club.category})`;
      container.appendChild(itemElement);
    });
  }
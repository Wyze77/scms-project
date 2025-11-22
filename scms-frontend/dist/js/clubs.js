

const CLUBS_DATA = [
    {
      id: 1,
      name: "Tech Innovators",
      description:
        "A club for students passionate about software, AI, and emerging technologies.",
      category: "Tech",
      membersCount: 54,
    },
    {
      id: 2,
      name: "Campus Football Club",
      description:
        "Join weekly training sessions and represent the campus in friendly matches.",
      category: "Sports",
      membersCount: 32,
    },
    {
      id: 3,
      name: "Art & Design Collective",
      description:
        "A creative community exploring illustration, digital art, and visual storytelling.",
      category: "Arts",
      membersCount: 27,
    },
    {
      id: 4,
      name: "Community Service Group",
      description:
        "Volunteer-based group organizing outreach and community support programs.",
      category: "Community",
      membersCount: 41,
    },
  ];
  
  /* ================== Page Initialization ================== */
  
  document.addEventListener("DOMContentLoaded", () => {
    renderClubs(CLUBS_DATA);
    initializeFilters();
  });
  
  /* ================== Filter System ================== */
  
  /**
   * Initialize search and category filter handlers
   */
  function initializeFilters() {
    const searchInput = document.getElementById("clubSearchInput");
    const categoryFilter = document.getElementById("clubCategoryFilter");
  
    if (!searchInput || !categoryFilter) return;
  
    const applyFilters = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value;
  
      const filteredData = CLUBS_DATA.filter((club) => {
        const matchesCategory =
          selectedCategory === "all" || club.category === selectedCategory;
        const matchesSearch =
          club.name.toLowerCase().includes(searchTerm) ||
          club.description.toLowerCase().includes(searchTerm);
  
        return matchesCategory && matchesSearch;
      });
  
      renderClubs(filteredData);
    };
  
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
  }
  
  /* ================== Rendering Functions ================== */
  
  /**
   * Render clubs list to the page
   * @param {Array} clubsList - Array of club objects to render
   */
  function renderClubs(clubsList) {
    const container = document.getElementById("clubsList");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (!clubsList.length) {
      container.innerHTML = `<p class="meta-text-muted">No clubs found.</p>`;
      return;
    }
  
    const joinedIds = loadFromStorage(SCMS_KEYS.JOINED_CLUBS, []);
  
    clubsList.forEach((club) => {
      const card = createClubCard(club, joinedIds);
      container.appendChild(card);
    });
  }
  
  /**
   * Create a single club card element
   * @param {Object} club - Club data object
   * @param {Array} joinedIds - Array of joined club IDs
   * @returns {HTMLElement} Card element
   */
  function createClubCard(club, joinedIds) {
    const card = document.createElement("article");
    card.className = "card";
  
    // Header with name and category badge
    const header = document.createElement("div");
    header.className = "card-header";
  
    const title = document.createElement("h3");
    title.textContent = club.name;
  
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "tag";
    categoryBadge.textContent = club.category;
  
    header.appendChild(title);
    header.appendChild(categoryBadge);
  
    // Description
    const description = document.createElement("p");
    description.textContent = club.description;
  
    // Metadata (member count)
    const metadata = document.createElement("p");
    metadata.className = "club-meta";
    metadata.textContent = `Members: ${club.membersCount}+`;
  
    // Action buttons
    const actionsContainer = document.createElement("div");
    actionsContainer.style.display = "flex";
    actionsContainer.style.justifyContent = "space-between";
    actionsContainer.style.alignItems = "center";
    actionsContainer.style.marginTop = "0.5rem";
  
    const detailsButton = document.createElement("button");
    detailsButton.className = "btn-secondary";
    detailsButton.textContent = "View details";
    detailsButton.addEventListener("click", () => openClubModal(club));
  
    const joinButton = document.createElement("button");
    joinButton.className = "btn-primary";
    const isAlreadyJoined = joinedIds.includes(club.id);
    joinButton.textContent = isAlreadyJoined ? "Joined" : "Join club";
    joinButton.disabled = isAlreadyJoined;
  
    joinButton.addEventListener("click", () => {
      joinClub(club.id);
      joinButton.textContent = "Joined";
      joinButton.disabled = true;
      showToast("Joined club successfully.");
    });
  
    actionsContainer.appendChild(detailsButton);
    actionsContainer.appendChild(joinButton);
  
    // Assemble card
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(metadata);
    card.appendChild(actionsContainer);
  
    return card;
  }
  
  /* ================== Modal & Actions ================== */
  
  /**
   * Open modal with full club details
   * @param {Object} club - Club data object
   */
  function openClubModal(club) {
    const modalContent = `
      <h2>${club.name}</h2>
      <p class="meta-text">Category: ${club.category}</p>
      <div class="divider"></div>
      <p>${club.description}</p>
      <p class="club-meta">Members: ${club.membersCount}+</p>
      <p class="meta-text-muted">Activities: Weekly meetings, project groups, and campus events.</p>
    `;
    openModal(modalContent);
  }
  
  /**
   * Join a club
   * @param {number} clubId - ID of club to join
   */
  function joinClub(clubId) {
    const joinedIds = loadFromStorage(SCMS_KEYS.JOINED_CLUBS, []);
  
    if (!joinedIds.includes(clubId)) {
      joinedIds.push(clubId);
      saveToStorage(SCMS_KEYS.JOINED_CLUBS, joinedIds);
    }
  }
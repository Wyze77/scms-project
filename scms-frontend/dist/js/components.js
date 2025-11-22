

/* ================== Theme Management ================== */

/**
 * Initialize theme from storage on page load
 * Runs immediately when script is loaded
 */
(function initTheme() {
    const savedTheme = loadFromStorage(SCMS_KEYS.THEME, "light");
    document.documentElement.setAttribute("data-theme", savedTheme);
  })();
  
  /**
   * Toggle between light and dark theme
   */
  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
  
    document.documentElement.setAttribute("data-theme", nextTheme);
    saveToStorage(SCMS_KEYS.THEME, nextTheme);
  }
  
  /* ================== Toast Notifications ================== */
  
  /**
   * Display a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Toast type: 'success' or 'error'
   */
  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) {
      console.warn("Toast container not found");
      return;
    }
  
    const toast = document.createElement("div");
    toast.className = `toast ${
      type === "error" ? "toast-error" : "toast-success"
    }`;
    toast.innerHTML = `<span>${message}</span>`;
  
    container.appendChild(toast);
  
    // Auto-remove toast after 2.5 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
  
  /* ================== Modal Management ================== */
  
  /**
   * Open modal with custom HTML content
   * @param {string} htmlContent - HTML to display in modal
   */
  function openModal(htmlContent) {
    const overlay = document.getElementById("modalOverlay");
    const content = document.getElementById("modalContent");
  
    if (!overlay || !content) {
      console.warn("Modal elements not found");
      return;
    }
  
    content.innerHTML = htmlContent;
    overlay.classList.remove("hidden");
  }
  
  /**
   * Close the modal overlay
   */
  function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
  
    overlay.classList.add("hidden");
  }
  
  /* ================== Global Initialization ================== */
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeThemeToggle();
    initializeMobileNavigation();
    initializeFooterYear();
    initializeModalClose();
    storeLastVisitedPage();
  });
  
  /**
   * Initialize theme toggle button
   */
  function initializeThemeToggle() {
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }
  }
  
  /**
   * Initialize mobile navigation toggle
   */
  function initializeMobileNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
  
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    }
  }
  
  /**
   * Initialize footer year display
   */
  function initializeFooterYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
  
  /**
   * Initialize modal close button
   */
  function initializeModalClose() {
    const modalCloseBtn = document.getElementById("modalClose");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }
  }
  
  /**
   * Store the current page as last visited
   */
  function storeLastVisitedPage() {
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    saveToStorage(SCMS_KEYS.LAST_VISITED, currentPath);
  }
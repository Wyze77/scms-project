
const SCMS_KEYS = {
    USERNAME: "scms_username",
    THEME: "scms_theme",
    SAVED_ANNOUNCEMENTS: "scms_saved_announcements",
    REGISTERED_EVENTS: "scms_registered_events",
    JOINED_CLUBS: "scms_joined_clubs",
    LAST_VISITED: "scms_last_visited",
  };
  
  /**
   * Load data from localStorage with fallback
   * @param {string} key - Storage key
   * @param {*} fallback - Default value if key doesn't exist or parsing fails
   * @returns {*} Parsed value or fallback
   */
  function loadFromStorage(key, fallback = null) {
    try {
      const rawData = localStorage.getItem(key);
      if (!rawData) {
        return fallback;
      }
      return JSON.parse(rawData);
    } catch (error) {
      console.warn(`Error loading from storage (${key}):`, error);
      return fallback;
    }
  }
  
  /**
   * Save data to localStorage as JSON
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to storage (${key}):`, error);
    }
  }
  
  /**
   * Remove data from localStorage
   * @param {string} key - Storage key to remove
   */
  function removeFromStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage (${key}):`, error);
    }
  }
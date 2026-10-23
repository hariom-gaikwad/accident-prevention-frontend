/**
 * Safe Nashik Portal — Civic Administration Command Center Controller
 * Powers admin.html: JWT/Token Authentication, Realtime CRUD for Safety Locations,
 * Live Advisory Broadcasts, Citizen Hazard Complaints resolution, and Road Rules editor.
 */

(function () {
  'use strict';

  // Config & State
  const API_BASE = window.location.origin;
  const TOKEN_KEY = 'safeNashik_admin_token';
  const USER_KEY = 'safeNashik_admin_user';

  let currentLocations = [];
  let currentHazards = [];
  let currentAnnouncements = [];
  let currentRules = [];

  let selectedLocCategory = 'all';
  let selectedHazardStatus = 'all';

  // DOM Elements - Auth
  const loginOverlay = document.getElementById('adminLoginOverlay');
  const dashboardLayout = document.getElementById('adminDashboardLayout');
  const loginForm = document.getElementById('adminLoginForm');
  const loginErrorMsg = document.getElementById('loginErrorMessage');
  const adminUsernameInput = document.getElementById('adminUsername');
  const adminPasswordInput = document.getElementById('adminPassword');
  const currentAdminName = document.getElementById('currentAdminName');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  // DOM Elements - Stats
  const statTotalLocations = document.getElementById('statTotalLocations');
  const statConstruction = document.getElementById('statConstruction');
  const statPendingHazards = document.getElementById('statPendingHazards');
  const statAnnouncements = document.getElementById('statAnnouncements');
  const hazardBadgeCount = document.getElementById('hazardBadgeCount');

  // DOM Elements - Modals
  const locationModal = document.getElementById('locationModal');
  const locModalTitle = document.getElementById('locModalTitle');
  const locationForm = document.getElementById('locationForm');
  const locFormId = document.getElementById('locFormId');
  const openAddLocationModalBtn = document.getElementById('openAddLocationModalBtn');
  const closeLocModalBtn = document.getElementById('closeLocModalBtn');
  const cancelLocModalBtn = document.getElementById('cancelLocModalBtn');
  const locCategorySelect = document.getElementById('locCategory');
  const constructionFieldsRow = document.getElementById('constructionFieldsRow');
  const policeFieldsRow = document.getElementById('policeFieldsRow');

  const ruleModal = document.getElementById('ruleModal');
  const ruleForm = document.getElementById('ruleForm');
  const openAddRuleModalBtn = document.getElementById('openAddRuleModalBtn');
  const closeRuleModalBtn = document.getElementById('closeRuleModalBtn');
  const cancelRuleModalBtn = document.getElementById('cancelRuleModalBtn');

  // ==========================================================================
  // 1. INITIALIZATION & AUTHENTICATION
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTabNavigation();
    initLocationFilters();
    initHazardFilters();
    initModals();
    initFormHandlers();
  });

  function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function getAuthHeaders() {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async function initAuth() {
    const token = getAuthToken();
    if (!token) {
      showLoginScreen();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify`, {
        headers: getAuthHeaders()
      });

      if (res.ok) {
        const data = await res.json();
        showDashboard(data.user?.username || 'Administrator');
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        showLoginScreen();
      }
    } catch (err) {
      console.warn("Could not verify token with server (likely offline or local file):", err);
      // If server is not responding, still show login screen with guidance
      showLoginScreen();
    }
  }

  function showLoginScreen() {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (dashboardLayout) dashboardLayout.style.display = 'none';
  }

  function showDashboard(username) {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (dashboardLayout) dashboardLayout.style.display = 'block';
    if (currentAdminName) currentAdminName.textContent = username || 'Administrator';
    refreshAllDashboardData();
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginErrorMsg.style.display = 'none';
      const submitBtn = document.getElementById('loginSubmitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      submitBtn.disabled = true;

      try {
        const username = adminUsernameInput.value.trim();
        const password = adminPasswordInput.value.trim();

        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(USER_KEY, data.user?.username || username);
          showDashboard(data.user?.username || username);
          showToast('Welcome to Safe Nashik Command Center', 'success');
        } else {
          loginErrorMsg.textContent = data.message || 'Invalid username or password.';
          loginErrorMsg.style.display = 'block';
        }
      } catch (err) {
        console.error('Login error:', err);
        loginErrorMsg.textContent = 'Cannot connect to backend API server. If testing on cloud, please ensure the web service is running.';
        loginErrorMsg.style.display = 'block';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: getAuthHeaders()
        });
      } catch (e) {
        // Ignore logout network failure
      }
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      showLoginScreen();
      showToast('Logged out successfully', 'info');
    });
  }

  // ==========================================================================
  // 2. TAB NAVIGATION
  // ==========================================================================

  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.admin-tab-btn');
    const tabPanels = document.querySelectorAll('.admin-tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetTabId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // ==========================================================================
  // 3. STATS & ANALYTICS
  // ==========================================================================

  async function loadStats() {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
      if (!res.ok) return;
      const json = await res.json();
      const stats = json.data;

      if (statTotalLocations) statTotalLocations.textContent = stats.totalLocations ?? '--';
      if (statConstruction) statConstruction.textContent = stats.constructionCount ?? '--';
      if (statPendingHazards) statPendingHazards.textContent = stats.pendingHazards ?? '--';
      if (statAnnouncements) statAnnouncements.textContent = stats.announcementsCount ?? '--';
      if (hazardBadgeCount) hazardBadgeCount.textContent = stats.pendingHazards ?? 0;
    } catch (err) {
      console.warn('Error loading stats:', err);
    }
  }

  function refreshAllDashboardData() {
    loadStats();
    loadLocations();
    loadAnnouncements();
    loadHazards();
    loadRules();
  }

  // ==========================================================================
  // 4. TAB 1: LOCATIONS MANAGER
  // ==========================================================================

  function initLocationFilters() {
    // Category chips
    const chips = document.querySelectorAll('.loc-filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedLocCategory = chip.getAttribute('data-cat') || 'all';
        loadLocations();
      });
    });

    // Search bar
    const searchInput = document.getElementById('locTableSearch');
    if (searchInput) {
      let timeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          loadLocations();
        }, 250);
      });
    }
  }

  async function loadLocations() {
    const tbody = document.getElementById('locationsTableBody');
    if (!tbody) return;

    const searchInput = document.getElementById('locTableSearch');
    const query = searchInput ? searchInput.value.trim() : '';

    let url = `${API_BASE}/api/locations?`;
    if (selectedLocCategory && selectedLocCategory !== 'all') {
      url += `category=${encodeURIComponent(selectedLocCategory)}&`;
    }
    if (query) {
      url += `search=${encodeURIComponent(query)}&`;
    }

    try {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i> Loading safety locations...</td></tr>`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        currentLocations = json.data;
        renderLocationsTable(currentLocations);
      } else {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to fetch locations data.</td></tr>`;
      }
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;"><i class="fas fa-triangle-exclamation"></i> Error connecting to backend API.</td></tr>`;
    }
  }

  function renderLocationsTable(locations) {
    const tbody = document.getElementById('locationsTableBody');
    if (!tbody) return;

    if (!locations.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:3rem 1rem; color:#94a3b8;">
            <i class="fas fa-folder-open" style="font-size:2rem; margin-bottom:0.5rem; display:block; opacity:0.5;"></i>
            No locations matching the current filter. Click <strong>"Add New Location"</strong> to add one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = locations.map(loc => {
      const catBadge = getCategoryBadgeHtml(loc.category);
      const details = loc.workType
        ? `<strong>Work:</strong> ${escapeHtml(loc.workType)}<br><small class="text-muted"><strong>Detour:</strong> ${escapeHtml(loc.detour || 'None')}</small>`
        : loc.advisory
        ? `<span class="text-advisory">${escapeHtml(loc.advisory)}</span>`
        : loc.notes
        ? `<small class="text-muted">${escapeHtml(loc.notes)}</small>`
        : `<span class="text-muted">Standard safety zone</span>`;

      const contact = loc.phone || loc.emergency || '--';

      return `
        <tr data-id="${escapeHtml(loc.id)}">
          <td>${catBadge}</td>
          <td>
            <div class="loc-name-cell">
              <strong>${escapeHtml(loc.name)}</strong>
              ${loc.nameMr ? `<span class="loc-marathi-sub">${escapeHtml(loc.nameMr)}</span>` : ''}
              <small class="loc-address-sub"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(loc.address || '')}</small>
            </div>
          </td>
          <td>
            <a href="https://www.google.com/maps?q=${loc.lat},${loc.lng}" target="_blank" class="coord-link" title="Open in Google Maps">
              <i class="fas fa-arrow-up-right-from-square"></i> ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}
            </a>
          </td>
          <td class="details-cell">${details}</td>
          <td><span class="phone-pill"><i class="fas fa-phone"></i> ${escapeHtml(contact)}</span></td>
          <td>
            <div class="action-buttons-group">
              <button type="button" class="btn-action edit-loc-btn" data-id="${escapeHtml(loc.id)}" title="Edit Location">
                <i class="fas fa-pen-to-square"></i>
              </button>
              <button type="button" class="btn-action btn-delete delete-loc-btn" data-id="${escapeHtml(loc.id)}" title="Delete Location">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row button events
    tbody.querySelectorAll('.edit-loc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditLocationModal(id);
      });
    });

    tbody.querySelectorAll('.delete-loc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDeleteLocation(id);
      });
    });
  }

  function getCategoryBadgeHtml(cat) {
    switch (cat) {
      case 'police':
        return `<span class="cat-pill badge-police"><i class="fas fa-shield"></i> Police Beat</span>`;
      case 'construction':
        return `<span class="cat-pill badge-construction"><i class="fas fa-person-digging"></i> Construction</span>`;
      case 'blackspot':
        return `<span class="cat-pill badge-blackspot"><i class="fas fa-triangle-exclamation"></i> Blackspot</span>`;
      case 'hospital':
        return `<span class="cat-pill badge-hospital"><i class="fas fa-hospital"></i> Hospital</span>`;
      case 'ghat':
        return `<span class="cat-pill badge-ghat"><i class="fas fa-water"></i> Ghat Safety</span>`;
      case 'kumbh':
        return `<span class="cat-pill badge-kumbh"><i class="fas fa-campground"></i> Kumbh Zone</span>`;
      default:
        return `<span class="cat-pill badge-default"><i class="fas fa-location-dot"></i> Safety Point</span>`;
    }
  }

  // ==========================================================================
  // 5. LOCATION MODAL (ADD & EDIT)
  // ==========================================================================

  function initModals() {
    // Location Modal Triggers
    if (openAddLocationModalBtn) {
      openAddLocationModalBtn.addEventListener('click', () => openAddLocationModal());
    }
    if (closeLocModalBtn) {
      closeLocModalBtn.addEventListener('click', () => closeLocationModal());
    }
    if (cancelLocModalBtn) {
      cancelLocModalBtn.addEventListener('click', () => closeLocationModal());
    }

    // Road Rule Modal Triggers
    if (openAddRuleModalBtn) {
      openAddRuleModalBtn.addEventListener('click', () => openAddRuleModal());
    }
    if (closeRuleModalBtn) {
      closeRuleModalBtn.addEventListener('click', () => closeRuleModal());
    }
    if (cancelRuleModalBtn) {
      cancelRuleModalBtn.addEventListener('click', () => closeRuleModal());
    }

    // Category change shows/hides conditional inputs
    if (locCategorySelect) {
      locCategorySelect.addEventListener('change', () => {
        toggleConditionalLocationFields(locCategorySelect.value);
      });
    }

    // Close on backdrop click
    window.addEventListener('click', (e) => {
      if (e.target === locationModal) closeLocationModal();
      if (e.target === ruleModal) closeRuleModal();
    });
  }

  function toggleConditionalLocationFields(cat) {
    if (constructionFieldsRow) {
      constructionFieldsRow.style.display = (cat === 'construction') ? 'grid' : 'none';
    }
    if (policeFieldsRow) {
      policeFieldsRow.style.display = (cat === 'police') ? 'grid' : 'none';
    }
  }

  function openAddLocationModal() {
    if (!locationModal) return;
    locModalTitle.innerHTML = `<i class="fas fa-plus-circle text-primary"></i> Add New Safety Location`;
    locationForm.reset();
    locFormId.value = '';
    toggleConditionalLocationFields(locCategorySelect.value);
    locationModal.style.display = 'flex';
  }

  function openEditLocationModal(id) {
    const loc = currentLocations.find(l => l.id === id);
    if (!loc || !locationModal) return;

    locModalTitle.innerHTML = `<i class="fas fa-pen-to-square text-primary"></i> Edit Location: ${escapeHtml(loc.name)}`;
    locFormId.value = loc.id;
    document.getElementById('locName').value = loc.name || '';
    document.getElementById('locCategory').value = loc.category || 'police';
    document.getElementById('locNameMr').value = loc.nameMr || '';
    document.getElementById('locNameHi').value = loc.nameHi || '';
    document.getElementById('locLat').value = loc.lat || '';
    document.getElementById('locLng').value = loc.lng || '';
    document.getElementById('locAddress').value = loc.address || '';
    document.getElementById('locWorkType').value = loc.workType || '';
    document.getElementById('locDetour').value = loc.detour || '';
    document.getElementById('locJurisdiction').value = loc.jurisdiction || loc.policeChowki || '';
    document.getElementById('locPhone').value = loc.phone || '';
    document.getElementById('locSeverity').value = loc.severity || '';
    document.getElementById('locEmergency').value = loc.emergency || '112';
    document.getElementById('locAdvisory').value = loc.advisory || loc.notes || '';

    toggleConditionalLocationFields(loc.category);
    locationModal.style.display = 'flex';
  }

  function closeLocationModal() {
    if (locationModal) locationModal.style.display = 'none';
  }

  function initFormHandlers() {
    // 1. Location Form Submit
    if (locationForm) {
      locationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = locFormId.value;
        const isEditing = Boolean(id);

        const payload = {
          name: document.getElementById('locName').value.trim(),
          category: document.getElementById('locCategory').value,
          nameMr: document.getElementById('locNameMr').value.trim(),
          nameHi: document.getElementById('locNameHi').value.trim(),
          lat: parseFloat(document.getElementById('locLat').value),
          lng: parseFloat(document.getElementById('locLng').value),
          address: document.getElementById('locAddress').value.trim(),
          workType: document.getElementById('locWorkType').value.trim(),
          detour: document.getElementById('locDetour').value.trim(),
          jurisdiction: document.getElementById('locJurisdiction').value.trim(),
          phone: document.getElementById('locPhone').value.trim(),
          severity: document.getElementById('locSeverity').value,
          emergency: document.getElementById('locEmergency').value.trim(),
          advisory: document.getElementById('locAdvisory').value.trim()
        };

        const saveBtn = document.getElementById('saveLocBtn');
        const origText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;

        try {
          const endpoint = isEditing ? `${API_BASE}/api/locations/${id}` : `${API_BASE}/api/locations`;
          const method = isEditing ? 'PUT' : 'POST';

          const res = await fetch(endpoint, {
            method,
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });

          const json = await res.json();
          if (res.ok && json.success) {
            closeLocationModal();
            showToast(isEditing ? 'Location updated successfully!' : 'New location added to live safety map!', 'success');
            loadLocations();
            loadStats();
          } else {
            showToast(json.message || 'Error saving location', 'error');
          }
        } catch (err) {
          console.error(err);
          showToast('Network error while saving location.', 'error');
        } finally {
          saveBtn.innerHTML = origText;
          saveBtn.disabled = false;
        }
      });
    }

    // 2. Announcement Form Submit
    const announcementForm = document.getElementById('announcementForm');
    if (announcementForm) {
      announcementForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          badge: document.getElementById('annBadge').value.trim(),
          badgeType: document.getElementById('annType').value,
          textEn: document.getElementById('annTextEn').value.trim(),
          textMr: document.getElementById('annTextMr').value.trim(),
          textHi: document.getElementById('annTextHi').value.trim()
        };

        try {
          const res = await fetch(`${API_BASE}/api/announcements`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });

          const json = await res.json();
          if (res.ok && json.success) {
            announcementForm.reset();
            showToast('Urgent alert broadcasted to live news ticker!', 'success');
            loadAnnouncements();
            loadStats();
          } else {
            showToast(json.message || 'Error posting broadcast', 'error');
          }
        } catch (err) {
          showToast('Failed to broadcast advisory.', 'error');
        }
      });
    }

    // 3. Road Rule Form Submit
    if (ruleForm) {
      ruleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          name: document.getElementById('ruleName').value.trim(),
          category: document.getElementById('ruleCategory').value,
          section: document.getElementById('ruleSection').value.trim(),
          penaltyBadge: document.getElementById('rulePenaltyBadge').value.trim(),
          desc: document.getElementById('ruleDesc').value.trim(),
          localNote: document.getElementById('ruleLocalNote').value.trim()
        };

        try {
          const res = await fetch(`${API_BASE}/api/rules`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });

          const json = await res.json();
          if (res.ok && json.success) {
            closeRuleModal();
            showToast('New road rule & fine added to database!', 'success');
            loadRules();
          } else {
            showToast(json.message || 'Error adding road rule', 'error');
          }
        } catch (err) {
          showToast('Network error while saving rule.', 'error');
        }
      });
    }
  }

  async function confirmDeleteLocation(id) {
    const loc = currentLocations.find(l => l.id === id);
    const confirmName = loc ? loc.name : 'this location';
    if (!confirm(`Are you sure you want to remove "${confirmName}" from the public map?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/locations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Location deleted from GIS map.', 'info');
        loadLocations();
        loadStats();
      } else {
        showToast(json.message || 'Could not delete location', 'error');
      }
    } catch (err) {
      showToast('Network error while deleting location.', 'error');
    }
  }

  // ==========================================================================
  // 6. TAB 2: ANNOUNCEMENTS MANAGER
  // ==========================================================================

  async function loadAnnouncements() {
    const listContainer = document.getElementById('activeAnnouncementsList');
    if (!listContainer) return;

    try {
      const res = await fetch(`${API_BASE}/api/announcements`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        currentAnnouncements = json.data;
        renderAnnouncementsList(currentAnnouncements);
      }
    } catch (err) {
      console.warn('Error fetching announcements:', err);
    }
  }

  function renderAnnouncementsList(announcements) {
    const listContainer = document.getElementById('activeAnnouncementsList');
    if (!listContainer) return;

    if (!announcements.length) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:2.5rem; color:#94a3b8;">
          <i class="fas fa-tower-broadcast" style="font-size:2rem; margin-bottom:0.5rem; opacity:0.5; display:block;"></i>
          No active advisory broadcasts. Create one using the form on the left.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = announcements.map(ann => `
      <div class="announcement-item-card">
        <div class="ann-item-header">
          <span class="ann-badge-pill ann-${ann.badgeType || 'warning'}">${escapeHtml(ann.badge || 'ALERT')}</span>
          <span class="ann-time"><i class="far fa-clock"></i> ${escapeHtml(ann.timestamp || 'Live')}</span>
          <button type="button" class="btn-delete-ann" data-id="${escapeHtml(ann.id)}" title="Remove broadcast">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
        <p class="ann-text-en"><strong>EN:</strong> ${escapeHtml(ann.textEn)}</p>
        ${ann.textMr ? `<p class="ann-text-mr"><strong>मराठी:</strong> ${escapeHtml(ann.textMr)}</p>` : ''}
        ${ann.textHi ? `<p class="ann-text-hi"><strong>हिंदी:</strong> ${escapeHtml(ann.textHi)}</p>` : ''}
      </div>
    `).join('');

    listContainer.querySelectorAll('.btn-delete-ann').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteAnnouncement(id);
      });
    });
  }

  async function deleteAnnouncement(id) {
    if (!confirm('Stop broadcasting this announcement on the public ticker?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/announcements/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Broadcast removed.', 'info');
        loadAnnouncements();
        loadStats();
      } else {
        showToast(json.message || 'Error deleting announcement', 'error');
      }
    } catch (err) {
      showToast('Network error while deleting broadcast.', 'error');
    }
  }

  // ==========================================================================
  // 7. TAB 3: CITIZEN HAZARDS RESOLVER
  // ==========================================================================

  function initHazardFilters() {
    const chips = document.querySelectorAll('.hazard-filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedHazardStatus = chip.getAttribute('data-status') || 'all';
        renderHazardsTable();
      });
    });
  }

  async function loadHazards() {
    const tbody = document.getElementById('hazardsTableBody');
    if (!tbody) return;

    try {
      const res = await fetch(`${API_BASE}/api/hazards`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        currentHazards = json.data;
        renderHazardsTable();
      }
    } catch (err) {
      console.warn('Error loading hazards:', err);
    }
  }

  function renderHazardsTable() {
    const tbody = document.getElementById('hazardsTableBody');
    if (!tbody) return;

    let filtered = currentHazards;
    if (selectedHazardStatus !== 'all') {
      filtered = filtered.filter(h => h.status === selectedHazardStatus);
    }

    if (!filtered.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:3rem; color:#94a3b8;">
            <i class="fas fa-clipboard-check" style="font-size:2rem; margin-bottom:0.5rem; opacity:0.5; display:block;"></i>
            No citizen hazard reports in this category.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(hz => {
      const statusPill = getHazardStatusPill(hz.status);
      const categoryIcon = getHazardIcon(hz.type);

      return `
        <tr>
          <td><code class="tracking-code">${escapeHtml(hz.id)}</code></td>
          <td>
            <div class="hazard-type-cell">
              ${categoryIcon}
              <span>${escapeHtml(formatHazardCategory(hz.type))}</span>
            </div>
          </td>
          <td><strong>${escapeHtml(hz.location)}</strong></td>
          <td>
            <div>${escapeHtml(hz.reporterName || 'Citizen')}</div>
            <small class="text-muted">${escapeHtml(hz.reporterPhone || 'Not provided')}</small>
          </td>
          <td>
            <div class="hazard-desc-preview" title="${escapeHtml(hz.desc)}">
              ${escapeHtml(hz.desc)}
            </div>
            ${hz.adminNotes ? `<small class="text-info-note"><i class="fas fa-comment-dots"></i> ${escapeHtml(hz.adminNotes)}</small>` : ''}
          </td>
          <td>${statusPill}</td>
          <td>
            <div class="action-buttons-group">
              ${hz.status === 'pending' ? `
                <button type="button" class="btn-action btn-dispatch update-hz-btn" data-id="${escapeHtml(hz.id)}" data-status="in_progress" title="Dispatch Field Crew">
                  <i class="fas fa-truck-pickup"></i> Dispatch
                </button>
              ` : ''}
              ${hz.status !== 'resolved' ? `
                <button type="button" class="btn-action btn-resolve update-hz-btn" data-id="${escapeHtml(hz.id)}" data-status="resolved" title="Mark Resolved">
                  <i class="fas fa-check-double"></i> Resolve
                </button>
              ` : `
                <span class="text-resolved-badge"><i class="fas fa-check-circle"></i> Closed</span>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.update-hz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const nextStatus = btn.getAttribute('data-status');
        updateHazardStatus(id, nextStatus);
      });
    });
  }

  function getHazardStatusPill(status) {
    switch (status) {
      case 'pending':
        return `<span class="hz-status hz-pending"><i class="fas fa-clock"></i> Pending</span>`;
      case 'in_progress':
        return `<span class="hz-status hz-inprogress"><i class="fas fa-wrench"></i> In Progress</span>`;
      case 'resolved':
        return `<span class="hz-status hz-resolved"><i class="fas fa-circle-check"></i> Resolved</span>`;
      default:
        return `<span class="hz-status">${escapeHtml(status)}</span>`;
    }
  }

  function getHazardIcon(type) {
    switch (type) {
      case 'pothole': return `<i class="fas fa-road-barrier text-warning"></i>`;
      case 'waterlogging': return `<i class="fas fa-cloud-showers-heavy text-info"></i>`;
      case 'accident_blackspot': return `<i class="fas fa-triangle-exclamation text-danger"></i>`;
      case 'traffic_jam': return `<i class="fas fa-traffic-light text-warning"></i>`;
      case 'streetlight_failure': return `<i class="fas fa-lightbulb text-muted"></i>`;
      default: return `<i class="fas fa-circle-exclamation text-primary"></i>`;
    }
  }

  function formatHazardCategory(type) {
    if (!type) return 'Civic Hazard';
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  async function updateHazardStatus(id, newStatus) {
    let note = '';
    if (newStatus === 'in_progress') {
      note = prompt('Enter dispatch note (e.g. Nashik Municipal road repair team dispatched with cold asphalt):', 'Repair crew dispatched to site.');
      if (note === null) return;
    } else if (newStatus === 'resolved') {
      note = prompt('Enter resolution summary:', 'Repaired & verified safe by civic engineer.');
      if (note === null) return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/hazards/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: newStatus,
          adminNotes: note
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast(`Grievance ${id} updated to ${newStatus.replace('_', ' ')}!`, 'success');
        loadHazards();
        loadStats();
      } else {
        showToast(json.message || 'Error updating status', 'error');
      }
    } catch (err) {
      showToast('Failed to update hazard status.', 'error');
    }
  }

  // ==========================================================================
  // 8. TAB 4: ROAD RULES & FINES
  // ==========================================================================

  function openAddRuleModal() {
    if (!ruleModal) return;
    ruleForm.reset();
    ruleModal.style.display = 'flex';
  }

  function closeRuleModal() {
    if (ruleModal) ruleModal.style.display = 'none';
  }

  async function loadRules() {
    const tbody = document.getElementById('rulesTableBody');
    if (!tbody) return;

    try {
      const res = await fetch(`${API_BASE}/api/rules`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        currentRules = json.data;
        renderRulesTable(currentRules);
      }
    } catch (err) {
      console.warn('Error loading rules:', err);
    }
  }

  function renderRulesTable(rules) {
    const tbody = document.getElementById('rulesTableBody');
    if (!tbody) return;

    if (!rules.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2.5rem; color:#94a3b8;">No road rules found.</td></tr>`;
      return;
    }

    tbody.innerHTML = rules.map(rule => `
      <tr>
        <td>
          <strong>${escapeHtml(rule.name)}</strong>
          ${rule.localNote ? `<small class="rule-local-note"><i class="fas fa-shield"></i> ${escapeHtml(rule.localNote)}</small>` : ''}
        </td>
        <td><code class="rule-section-code">${escapeHtml(rule.section)}</code></td>
        <td><span class="rule-cat-pill">${escapeHtml(rule.category)}</span></td>
        <td><span class="fine-badge">${escapeHtml(rule.penaltyBadge)}</span></td>
        <td class="rule-desc-cell"><small>${escapeHtml(rule.desc)}</small></td>
        <td>
          <button type="button" class="btn-action btn-delete delete-rule-btn" data-id="${escapeHtml(rule.id)}" title="Delete Rule">
            <i class="fas fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.delete-rule-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteRule(id);
      });
    });
  }

  async function deleteRule(id) {
    if (!confirm('Remove this road rule & penalty guideline from public display?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/rules/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Road rule deleted.', 'info');
        loadRules();
      } else {
        showToast(json.message || 'Error deleting rule', 'error');
      }
    } catch (err) {
      showToast('Network error while deleting rule.', 'error');
    }
  }

  // ==========================================================================
  // 9. TOAST NOTIFICATION HELPER
  // ==========================================================================

  function showToast(message, type = 'info') {
    let container = document.getElementById('adminToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'adminToastContainer';
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast toast-${type} animate-slide-left`;

    const icon = type === 'success' ? 'fa-circle-check'
               : type === 'error' ? 'fa-circle-exclamation'
               : 'fa-circle-info';

    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Security Helper: Escape HTML
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();

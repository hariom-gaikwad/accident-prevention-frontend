/**
 * Safe Nashik Portal - Interactive Safety Map Engine
 * Supports Leaflet.js OpenStreetMap with graceful offline Interactive SVG fallback
 */

let mapInstance = null;
let markersLayerGroup = null;
let activeCategory = "all";

// Marker category styling configurations
const CATEGORY_CONFIG = {
  hospital: {
    color: "#2563eb",
    label: "Hospital",
    icon: "🏥",
    badgeClass: "badge-hospital"
  },
  blackspot: {
    color: "#dc2626",
    label: "Blackspot",
    icon: "⚠️",
    badgeClass: "badge-danger"
  },
  police: {
    color: "#1e3a8a",
    label: "Police",
    icon: "🚓",
    badgeClass: "badge-police"
  },
  fire: {
    color: "#ea580c",
    label: "Fire Station",
    icon: "🚒",
    badgeClass: "badge-fire"
  },
  ghat: {
    color: "#0891b2",
    label: "River Ghat",
    icon: "🌊",
    badgeClass: "badge-ghat"
  },
  kumbh: {
    color: "#d97706",
    label: "Kumbh 2027",
    icon: "🎪",
    badgeClass: "badge-kumbh"
  },
  construction: {
    color: "#f59e0b",
    label: "Under Construction",
    icon: "🚧",
    badgeClass: "badge-construction"
  }
};

async function initSafetyMap() {
  const mapContainer = document.getElementById("nashikMap");
  if (!mapContainer) return;

  // Try fetching live GIS locations from backend server
  try {
    const res = await fetch("/api/locations");
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        NASHIK_DATA.locations = json.data;
      }
    }
  } catch (e) {
    // Graceful offline fallback to pre-bundled NASHIK_DATA
  }

  // Check if Leaflet is available
  if (typeof L !== "undefined") {
    try {
      mapInstance = L.map("nashikMap", {
        center: NASHIK_DATA.mapCenter,
        zoom: NASHIK_DATA.mapZoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Voyager or OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Safe Nashik GIS',
        maxZoom: 18,
        minZoom: 11
      }).addTo(mapInstance);

      markersLayerGroup = L.layerGroup().addTo(mapInstance);
      renderMapMarkers(NASHIK_DATA.locations);
      setupMapControls();
      return;
    } catch (err) {
      console.warn("Leaflet map initialization encountered issue, falling back to SVG vector map:", err);
    }
  }

  // Graceful fallback to rich interactive SVG Map
  renderSvgFallbackMap(mapContainer);
  setupMapControls();
}

function createCustomIcon(catKey) {
  const cfg = CATEGORY_CONFIG[catKey] || { color: "#dc2626", icon: "📍" };
  return L.divIcon({
    className: "custom-map-pin",
    html: `<div class="pin-marker" style="background-color: ${cfg.color};">
            <span class="pin-icon">${cfg.icon}</span>
          </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

function renderMapMarkers(locationsList) {
  if (!markersLayerGroup) return;
  markersLayerGroup.clearLayers();

  const currentLang = window.currentLanguage || "en";

  locationsList.forEach(loc => {
    if (activeCategory !== "all" && loc.category !== activeCategory) {
      return;
    }

    const cfg = CATEGORY_CONFIG[loc.category] || CATEGORY_CONFIG.blackspot;
    const locName = currentLang === "mr" ? (loc.nameMr || loc.name) : (currentLang === "hi" ? (loc.nameHi || loc.name) : loc.name);

    let detailsHtml = `
      <div class="map-popup-card">
        <div class="popup-header">
          <span class="popup-badge ${cfg.badgeClass}">${cfg.label}</span>
          <h4>${locName}</h4>
        </div>
        <p class="popup-address"><i class="fas fa-map-marker-alt"></i> ${loc.address}</p>
    `;

    if (loc.severity) {
      detailsHtml += `<p class="popup-alert"><i class="fas fa-exclamation-triangle"></i> <strong>Severity:</strong> ${loc.severity}</p>`;
    }
    if (loc.advisory) {
      detailsHtml += `<p class="popup-advisory"><i class="fas fa-info-circle"></i> <strong>Advisory:</strong> ${loc.advisory}</p>`;
    }
    if (loc.safetyStatus) {
      detailsHtml += `<p class="popup-status"><i class="fas fa-life-ring"></i> ${loc.safetyStatus}</p>`;
    }
    if (loc.rules) {
      detailsHtml += `<p class="popup-rules"><i class="fas fa-shield-alt"></i> <strong>Safety Rules:</strong> ${loc.rules}</p>`;
    }
    if (loc.beds) {
      detailsHtml += `<p class="popup-facility"><i class="fas fa-bed"></i> ${loc.beds}</p>`;
    }
    if (loc.fleet) {
      detailsHtml += `<p class="popup-facility"><i class="fas fa-truck-moving"></i> ${loc.fleet}</p>`;
    }
    if (loc.capacity) {
      detailsHtml += `<p class="popup-facility"><i class="fas fa-users"></i> ${loc.capacity}</p>`;
    }
    if (loc.workType) {
      detailsHtml += `<p class="popup-work" style="color:#d97706; font-size:0.8rem; margin:3px 0;"><i class="fas fa-person-digging"></i> <strong>Work:</strong> ${loc.workType}</p>`;
    }
    if (loc.detour) {
      detailsHtml += `<p class="popup-detour" style="color:#0284c7; font-size:0.8rem; margin:3px 0;"><i class="fas fa-route"></i> <strong>Detour:</strong> ${loc.detour}</p>`;
    }
    if (loc.jurisdiction) {
      detailsHtml += `<p class="popup-jurisdiction" style="font-size:0.8rem; margin:3px 0;"><i class="fas fa-shield"></i> <strong>Jurisdiction:</strong> ${loc.jurisdiction}</p>`;
    }
    if (loc.policeChowki) {
      detailsHtml += `<p class="popup-jurisdiction" style="font-size:0.8rem; margin:3px 0;"><i class="fas fa-building-shield"></i> <strong>Police Beat:</strong> ${loc.policeChowki}</p>`;
    }

    detailsHtml += `
      <div class="popup-actions">
        ${loc.emergency ? `<a href="tel:${loc.emergency}" class="btn-popup-call"><i class="fas fa-phone-alt"></i> Call ${loc.emergency}</a>` : (loc.phone ? `<a href="tel:${loc.phone}" class="btn-popup-call"><i class="fas fa-phone"></i> ${loc.phone}</a>` : "")}
        <a href="https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}" target="_blank" rel="noopener" class="btn-popup-directions"><i class="fas fa-directions"></i> Directions</a>
      </div>
    </div>`;

    const marker = L.marker([loc.lat, loc.lng], {
      icon: createCustomIcon(loc.category)
    }).bindPopup(detailsHtml, { maxWidth: 320, className: "custom-leaflet-popup" });

    markersLayerGroup.addLayer(marker);
  });
}

// Fallback SVG Interactive Vector Map of Nashik
function renderSvgFallbackMap(container) {
  const currentLang = window.currentLanguage || "en";
  container.innerHTML = `
    <div class="svg-map-wrapper">
      <div class="svg-map-watermark">
        <span>Nashik Metropolitan GIS Vector Simulation</span>
      </div>
      <svg viewBox="0 0 800 500" class="nashik-svg-map" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Base Background -->
        <rect width="800" height="500" fill="#f8fafc" rx="12"/>

        <!-- Grid Lines -->
        <path d="M0,100 H800 M0,200 H800 M0,300 H800 M0,400 H800" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
        <path d="M160,0 V500 M320,0 V500 M480,0 V500 M640,0 V500" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>

        <!-- Highway NH 3 (Mumbai - Agra Bypass) -->
        <path d="M 50,450 Q 250,380 400,260 T 750,80" fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
        <path d="M 50,450 Q 250,380 400,260 T 750,80" fill="none" stroke="#f1f5f9" stroke-width="2" stroke-dasharray="8,6"/>
        <text x="70" y="440" fill="#64748b" font-size="11" font-weight="600">NH-3 to Mumbai</text>
        <text x="660" y="100" fill="#64748b" font-size="11" font-weight="600">NH-3 to Dhule / Agra</text>

        <!-- Godavari River Path -->
        <path d="M 80,120 C 180,140 280,80 420,180 S 600,210 750,290" fill="none" stroke="url(#riverGrad)" stroke-width="18" stroke-linecap="round" opacity="0.85"/>
        <path d="M 80,120 C 180,140 280,80 420,180 S 600,210 750,290" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="10,12" opacity="0.6"/>
        <text x="210" y="110" fill="#0284c7" font-weight="bold" font-size="13">Godavari River (पवित्र गोदावरी)</text>

        <!-- Trimbak Road -->
        <path d="M 100,250 Q 280,260 420,240" fill="none" stroke="#cbd5e1" stroke-width="6"/>
        <text x="110" y="270" fill="#64748b" font-size="11">Trimbak Road</text>

        <!-- City Nodes / Landmarks -->
        <!-- Ramkund Ghat -->
        <g class="svg-pin" onclick="showLocationModal('loc_7')" cursor="pointer">
          <circle cx="430" cy="180" r="14" fill="#0891b2" filter="url(#shadow)"/>
          <text x="430" y="184" text-anchor="middle" fill="#fff" font-size="12">🌊</text>
          <text x="430" y="208" text-anchor="middle" fill="#0e7490" font-weight="bold" font-size="11">Ramkund Ghat</text>
        </g>

        <!-- Someshwar Ghat -->
        <g class="svg-pin" onclick="showLocationModal('loc_8')" cursor="pointer">
          <circle cx="160" cy="130" r="13" fill="#0891b2" filter="url(#shadow)"/>
          <text x="160" y="134" text-anchor="middle" fill="#fff" font-size="10">🌊</text>
          <text x="160" y="155" text-anchor="middle" fill="#0e7490" font-weight="600" font-size="10">Someshwar</text>
        </g>

        <!-- Dwarka Circle Blackspot -->
        <g class="svg-pin" onclick="showLocationModal('loc_4')" cursor="pointer">
          <circle cx="510" cy="270" r="16" fill="#dc2626" filter="url(#shadow)"/>
          <circle cx="510" cy="270" r="22" fill="#dc2626" opacity="0.25">
            <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="510" y="274" text-anchor="middle" fill="#fff" font-size="11">⚠️</text>
          <text x="510" y="302" text-anchor="middle" fill="#b91c1c" font-weight="bold" font-size="11">Dwarka Circle (Blackspot)</text>
        </g>

        <!-- Pathardi Phata Blackspot -->
        <g class="svg-pin" onclick="showLocationModal('loc_5')" cursor="pointer">
          <circle cx="280" cy="370" r="15" fill="#dc2626" filter="url(#shadow)"/>
          <text x="280" y="374" text-anchor="middle" fill="#fff" font-size="11">⚠️</text>
          <text x="280" y="400" text-anchor="middle" fill="#b91c1c" font-weight="bold" font-size="11">Pathardi Phata</text>
        </g>

        <!-- Civil Hospital -->
        <g class="svg-pin" onclick="showLocationModal('loc_1')" cursor="pointer">
          <circle cx="390" cy="250" r="15" fill="#2563eb" filter="url(#shadow)"/>
          <text x="390" y="254" text-anchor="middle" fill="#fff" font-size="11">🏥</text>
          <text x="390" y="232" text-anchor="middle" fill="#1d4ed8" font-weight="bold" font-size="11">Civil Hospital (Trauma 108)</text>
        </g>

        <!-- Apollo Hospital -->
        <g class="svg-pin" onclick="showLocationModal('loc_2')" cursor="pointer">
          <circle cx="580" cy="320" r="14" fill="#2563eb" filter="url(#shadow)"/>
          <text x="580" y="324" text-anchor="middle" fill="#fff" font-size="10">🏥</text>
          <text x="580" y="345" text-anchor="middle" fill="#1d4ed8" font-weight="bold" font-size="10">Apollo Hospital</text>
        </g>

        <!-- Central Fire Station -->
        <g class="svg-pin" onclick="showLocationModal('loc_11')" cursor="pointer">
          <circle cx="440" cy="290" r="14" fill="#ea580c" filter="url(#shadow)"/>
          <text x="440" y="294" text-anchor="middle" fill="#fff" font-size="10">🚒</text>
          <text x="440" y="315" text-anchor="middle" fill="#c2410c" font-weight="bold" font-size="10">Central Fire Station</text>
        </g>

        <!-- Panchavati Police Station -->
        <g class="svg-pin" onclick="showLocationModal('loc_9')" cursor="pointer">
          <circle cx="470" cy="160" r="14" fill="#1e3a8a" filter="url(#shadow)"/>
          <text x="470" y="164" text-anchor="middle" fill="#fff" font-size="10">🚓</text>
          <text x="470" y="145" text-anchor="middle" fill="#1e3a8a" font-weight="bold" font-size="10">Panchavati Police</text>
        </g>

        <!-- Police Commissionerate HQ -->
        <g class="svg-pin" onclick="showLocationModal('loc_15')" cursor="pointer">
          <circle cx="330" cy="190" r="14" fill="#1e3a8a" filter="url(#shadow)"/>
          <text x="330" y="194" text-anchor="middle" fill="#fff" font-size="10">🚓</text>
          <text x="330" y="175" text-anchor="middle" fill="#1e3a8a" font-weight="bold" font-size="10">Police HQ</text>
        </g>

        <!-- Mumbai Naka Police & Blackspot -->
        <g class="svg-pin" onclick="showLocationModal('loc_16')" cursor="pointer">
          <circle cx="450" cy="320" r="14" fill="#1e3a8a" filter="url(#shadow)"/>
          <text x="450" y="324" text-anchor="middle" fill="#fff" font-size="10">🚓</text>
          <text x="450" y="342" text-anchor="middle" fill="#1e3a8a" font-weight="bold" font-size="10">Mumbai Naka Police</text>
        </g>

        <!-- Under Construction: Dwarka Flyover -->
        <g class="svg-pin" onclick="showLocationModal('loc_23')" cursor="pointer">
          <circle cx="530" cy="240" r="15" fill="#f59e0b" filter="url(#shadow)"/>
          <circle cx="530" cy="240" r="20" fill="#f59e0b" opacity="0.3">
            <animate attributeName="r" values="15;24;15" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <text x="530" y="244" text-anchor="middle" fill="#fff" font-size="10">🚧</text>
          <text x="530" y="222" text-anchor="middle" fill="#d97706" font-weight="bold" font-size="10">Dwarka Work (Construction)</text>
        </g>

        <!-- Under Construction: Trimbak Widening -->
        <g class="svg-pin" onclick="showLocationModal('loc_25')" cursor="pointer">
          <circle cx="210" cy="265" r="14" fill="#f59e0b" filter="url(#shadow)"/>
          <text x="210" y="269" text-anchor="middle" fill="#fff" font-size="10">🚧</text>
          <text x="210" y="292" text-anchor="middle" fill="#d97706" font-weight="bold" font-size="10">Trimbak 4-Laning</text>
        </g>

        <!-- Untwadi Mall Blackspot -->
        <g class="svg-pin" onclick="showLocationModal('loc_30')" cursor="pointer">
          <circle cx="340" cy="330" r="14" fill="#dc2626" filter="url(#shadow)"/>
          <text x="340" y="334" text-anchor="middle" fill="#fff" font-size="10">⚠️</text>
          <text x="340" y="352" text-anchor="middle" fill="#b91c1c" font-weight="bold" font-size="10">Untwadi Mall Cross</text>
        </g>

        <!-- Kumbh Holding Terminal -->
        <g class="svg-pin" onclick="showLocationModal('loc_13')" cursor="pointer">
          <circle cx="560" cy="110" r="15" fill="#d97706" filter="url(#shadow)"/>
          <text x="560" y="114" text-anchor="middle" fill="#fff" font-size="10">🎪</text>
          <text x="560" y="90" text-anchor="middle" fill="#b45309" font-weight="bold" font-size="10">Kumbh 2027 Holding Hub</text>
        </g>
      </svg>
      <div class="svg-map-legend">
        <span><span class="legend-dot red"></span> High Risk Blackspots</span>
        <span><span class="legend-dot blue"></span> 24/7 Trauma Hospitals</span>
        <span><span class="legend-dot amber"></span> Under Construction / Road Work</span>
        <span><span class="legend-dot teal"></span> Godavari Ghats</span>
        <span><span class="legend-dot orange"></span> Fire & Rescue</span>
        <span><span class="legend-dot navy"></span> Police Stations</span>
        <span><span class="legend-dot gold"></span> Kumbh 2027 Zones</span>
      </div>
    </div>
  `;
}

function showLocationModal(locId) {
  const loc = NASHIK_DATA.locations.find(l => l.id === locId);
  if (!loc) return;
  const currentLang = window.currentLanguage || "en";
  const cfg = CATEGORY_CONFIG[loc.category] || CATEGORY_CONFIG.blackspot;
  const locName = currentLang === "mr" ? (loc.nameMr || loc.name) : (currentLang === "hi" ? (loc.nameHi || loc.name) : loc.name);

  const modalHtml = `
    <div class="safety-modal-backdrop" id="locModal" onclick="closeLocationModal(event)">
      <div class="safety-modal-card animate-scale-up" onclick="event.stopPropagation()">
        <div class="modal-header">
          <span class="popup-badge ${cfg.badgeClass}">${cfg.label}</span>
          <button class="modal-close-btn" onclick="closeLocationModal()">&times;</button>
        </div>
        <h3 class="modal-title">${locName}</h3>
        <p class="modal-address"><i class="fas fa-map-marker-alt"></i> ${loc.address}</p>
        
        <div class="modal-body-content">
          ${loc.severity ? `<div class="modal-alert-box"><i class="fas fa-exclamation-triangle"></i> <strong>Severity:</strong> ${loc.severity}</div>` : ""}
          ${loc.advisory ? `<div class="modal-info-box"><i class="fas fa-shield-alt"></i> <strong>Advisory:</strong> ${loc.advisory}</div>` : ""}
          ${loc.workType ? `<div class="modal-info-box" style="border-left-color:#f59e0b;"><i class="fas fa-person-digging text-warning"></i> <strong>Ongoing Work:</strong> ${loc.workType}</div>` : ""}
          ${loc.detour ? `<div class="modal-info-box" style="border-left-color:#0ea5e9;"><i class="fas fa-route text-info"></i> <strong>Traffic Detour:</strong> ${loc.detour}</div>` : ""}
          ${loc.rules ? `<div class="modal-info-box"><i class="fas fa-life-ring"></i> <strong>Safety Rules:</strong> ${loc.rules}</div>` : ""}
          ${loc.jurisdiction ? `<div class="modal-pill"><i class="fas fa-shield"></i> <strong>Beat / Area:</strong> ${loc.jurisdiction}</div>` : ""}
          ${loc.policeChowki ? `<div class="modal-pill"><i class="fas fa-building-shield"></i> <strong>Police Beat:</strong> ${loc.policeChowki}</div>` : ""}
          ${loc.beds ? `<div class="modal-pill"><i class="fas fa-bed"></i> ${loc.beds}</div>` : ""}
          ${loc.capacity ? `<div class="modal-pill"><i class="fas fa-users"></i> ${loc.capacity}</div>` : ""}
          ${loc.notes ? `<p class="modal-notes">${loc.notes}</p>` : ""}
        </div>

        <div class="modal-footer-actions">
          ${loc.emergency ? `<a href="tel:${loc.emergency}" class="btn-primary-emergency"><i class="fas fa-phone-alt"></i> Call Emergency (${loc.emergency})</a>` : ""}
          ${loc.phone ? `<a href="tel:${loc.phone}" class="btn-secondary-call"><i class="fas fa-phone"></i> Call ${loc.phone}</a>` : ""}
          <a href="https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}" target="_blank" rel="noopener" class="btn-outline-directions"><i class="fas fa-external-link-alt"></i> Open Google Maps</a>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const oldModal = document.getElementById("locModal");
  if (oldModal) oldModal.remove();

  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function closeLocationModal(e) {
  const modal = document.getElementById("locModal");
  if (modal) {
    modal.classList.add("fade-out");
    setTimeout(() => modal.remove(), 200);
  }
}

function setupMapControls() {
  const filterBtns = document.querySelectorAll(".map-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");

      if (markersLayerGroup) {
        renderMapMarkers(NASHIK_DATA.locations);
      }
      renderLocationCardsGrid();
    });
  });

  const searchInput = document.getElementById("mapSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = NASHIK_DATA.locations.filter(l => {
        const matchesCategory = (activeCategory === "all" || l.category === activeCategory);
        const matchesText = l.name.toLowerCase().includes(q) ||
          (l.nameMr && l.nameMr.includes(q)) ||
          (l.nameHi && l.nameHi.includes(q)) ||
          l.address.toLowerCase().includes(q);
        return matchesCategory && matchesText;
      });

      if (markersLayerGroup) {
        renderMapMarkers(filtered);
      }
      renderLocationCardsGrid(filtered);
    });
  }

  renderLocationCardsGrid();
}

function renderLocationCardsGrid(locations = null) {
  const grid = document.getElementById("mapLocationsList");
  if (!grid) return;

  const currentLang = window.currentLanguage || "en";
  const listToRender = locations || NASHIK_DATA.locations.filter(l => activeCategory === "all" || l.category === activeCategory);

  if (listToRender.length === 0) {
    grid.innerHTML = `<div class="empty-results"><i class="fas fa-search-location"></i><p>No safety facilities or blackspots matched your query.</p></div>`;
    return;
  }

  grid.innerHTML = listToRender.map(loc => {
    const cfg = CATEGORY_CONFIG[loc.category] || CATEGORY_CONFIG.blackspot;
    const locName = currentLang === "mr" ? (loc.nameMr || loc.name) : (currentLang === "hi" ? (loc.nameHi || loc.name) : loc.name);

    return `
      <div class="location-summary-card" onclick="flyToLocation(${loc.lat}, ${loc.lng}, '${loc.id}')">
        <div class="card-top-row">
          <span class="badge ${cfg.badgeClass}">${cfg.label}</span>
          <span class="card-pin-indicator"><i class="fas fa-location-arrow"></i></span>
        </div>
        <h4>${locName}</h4>
        <p class="address-text"><i class="fas fa-map-pin"></i> ${loc.address}</p>
        ${loc.severity ? `<p class="severity-tag"><i class="fas fa-exclamation-triangle"></i> ${loc.severity}</p>` : ""}
        ${loc.workType ? `<p class="work-tag" style="font-size:0.75rem; color:#d97706; margin:3px 0;"><i class="fas fa-person-digging"></i> ${loc.workType}</p>` : ""}
        ${loc.detour ? `<p class="detour-tag" style="font-size:0.75rem; color:#0284c7; margin:3px 0;"><i class="fas fa-route"></i> ${loc.detour}</p>` : ""}
        ${loc.jurisdiction ? `<p class="jurisdiction-tag" style="font-size:0.75rem; color:var(--text-muted); margin:3px 0;"><i class="fas fa-shield"></i> ${loc.jurisdiction}</p>` : ""}
        ${loc.policeChowki ? `<p class="chowki-tag" style="font-size:0.75rem; color:var(--text-muted); margin:3px 0;"><i class="fas fa-building-shield"></i> ${loc.policeChowki}</p>` : ""}
        ${loc.safetyStatus ? `<p class="status-tag"><i class="fas fa-shield-alt"></i> ${loc.safetyStatus}</p>` : ""}
        <div class="card-quick-actions">
          ${loc.emergency ? `<a href="tel:${loc.emergency}" class="btn-micro call" onclick="event.stopPropagation()"><i class="fas fa-phone-alt"></i> ${loc.emergency}</a>` : ""}
          <button class="btn-micro view" onclick="showLocationModal('${loc.id}'); event.stopPropagation()"><i class="fas fa-info-circle"></i> Info</button>
        </div>
      </div>
    `;
  }).join("");
}

function flyToLocation(lat, lng, locId) {
  if (mapInstance) {
    mapInstance.flyTo([lat, lng], 15, { animate: true, duration: 1.2 });
    // Find and open popup if exists
    if (markersLayerGroup) {
      markersLayerGroup.eachLayer(layer => {
        const markerLatLng = layer.getLatLng();
        if (Math.abs(markerLatLng.lat - lat) < 0.0001 && Math.abs(markerLatLng.lng - lng) < 0.0001) {
          layer.openPopup();
        }
      });
    }
  } else {
    showLocationModal(locId);
  }
}

// Global expose
window.initSafetyMap = initSafetyMap;
window.showLocationModal = showLocationModal;
window.closeLocationModal = closeLocationModal;
window.flyToLocation = flyToLocation;

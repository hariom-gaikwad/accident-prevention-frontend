/**
 * Safe Nashik Portal - Application Engine
 * Core interactivity: i18n, SOS Siren, Hazard Reporting, Certificate Canvas,
 * Speed Calculator, Safety Quiz, ID Card Generator & LocalStorage Persistence.
 */

// Application State
window.currentLanguage = localStorage.getItem("safeNashik_lang") || "en";
let sirenAudioCtx = null;
let sirenOscillator = null;
let isSirenPlaying = false;
let quizCurrentIndex = 0;
let quizScore = 0;
let quizUserAnswers = [];

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initThemeToggle();
  initSOSFeatures();
  initHazardReporting();
  initSpeedCalculator();
  initQuiz();
  initPledge();
  initIdCardGenerator();
  initLiveTicker();
  initAccessibilityFeatures();
  initLeftDropdownMenu();
  initRoadRulesHub();
  
  if (typeof initSafetyMap === "function") {
    initSafetyMap();
  }
});

/* ==========================================================================
   1. MULTILINGUAL SUPPORT (English, Marathi, Hindi)
   ========================================================================== */
function initLanguageSwitcher() {
  const langSelect = document.getElementById("langSwitcher");
  if (langSelect) {
    langSelect.value = window.currentLanguage;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }
  applyTranslations(window.currentLanguage);
}

function setLanguage(langCode) {
  if (!NASHIK_DATA.translations[langCode]) return;
  window.currentLanguage = langCode;
  localStorage.setItem("safeNashik_lang", langCode);
  applyTranslations(langCode);

  // Update map markers text if map exists
  if (typeof renderMapMarkers === "function" && typeof markersLayerGroup !== "undefined" && markersLayerGroup) {
    renderMapMarkers(NASHIK_DATA.locations);
  }
  if (typeof renderLocationCardsGrid === "function") {
    renderLocationCardsGrid();
  }

  // Update live quiz question if open
  renderQuizQuestion();
  renderLiveTicker();
}

function applyTranslations(lang) {
  const dict = NASHIK_DATA.translations[lang] || NASHIK_DATA.translations.en;
  
  // Elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Elements with data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Toggle active button in lang pill if present
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* ==========================================================================
   2. THEME & CONTRAST TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  const contrastBtn = document.getElementById("contrastToggleBtn");
  const savedTheme = localStorage.getItem("safeNashik_theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else if (savedTheme === "high-contrast") {
    document.body.classList.add("high-contrast-theme");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("safeNashik_theme", "light");
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.classList.remove("high-contrast-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("safeNashik_theme", "dark");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      document.body.classList.remove("dark-theme");
      document.body.classList.toggle("high-contrast-theme");
      const isHc = document.body.classList.contains("high-contrast-theme");
      localStorage.setItem("safeNashik_theme", isHc ? "high-contrast" : "light");
    });
  }
}

/* ==========================================================================
   3. SOS EMERGENCY SIREN & DIALER (Web Audio API - Offline Capable)
   ========================================================================== */
function initSOSFeatures() {
  const sirenBtn = document.getElementById("sirenTriggerBtn");
  const sosModalBtn = document.getElementById("openSosModalBtn");
  const sosModal = document.getElementById("sosModal");
  const closeSosBtn = document.getElementById("closeSosModalBtn");

  if (sosModalBtn && sosModal) {
    sosModalBtn.addEventListener("click", () => {
      sosModal.classList.add("active");
    });
  }

  const mobileSosModalBtn = document.getElementById("btnMobileSosModal");
  if (mobileSosModalBtn && sosModal) {
    mobileSosModalBtn.addEventListener("click", () => {
      sosModal.classList.add("active");
    });
  }

  if (closeSosBtn && sosModal) {
    closeSosBtn.addEventListener("click", () => {
      sosModal.classList.remove("active");
      stopEmergencySiren();
    });
  }

  if (sirenBtn) {
    sirenBtn.addEventListener("click", toggleEmergencySiren);
  }
}

function toggleEmergencySiren() {
  const btn = document.getElementById("sirenTriggerBtn");
  if (!isSirenPlaying) {
    startEmergencySiren();
    if (btn) {
      btn.classList.add("siren-active");
      btn.innerHTML = '<i class="fas fa-volume-mute"></i> <span>Stop Siren Alert</span>';
    }
  } else {
    stopEmergencySiren();
    if (btn) {
      btn.classList.remove("siren-active");
      btn.innerHTML = '<i class="fas fa-bullhorn"></i> <span>Sound Civic Alarm</span>';
    }
  }
}

function startEmergencySiren() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    sirenAudioCtx = new AudioContext();
    sirenOscillator = sirenAudioCtx.createOscillator();
    const gainNode = sirenAudioCtx.createGain();

    sirenOscillator.type = "sine";
    sirenOscillator.frequency.setValueAtTime(650, sirenAudioCtx.currentTime);

    // Siren pitch modulation (wailing between 550Hz and 950Hz)
    const now = sirenAudioCtx.currentTime;
    for (let i = 0; i < 60; i += 1.2) {
      sirenOscillator.frequency.linearRampToValueAtTime(950, now + i + 0.6);
      sirenOscillator.frequency.linearRampToValueAtTime(550, now + i + 1.2);
    }

    gainNode.gain.setValueAtTime(0.18, sirenAudioCtx.currentTime);
    sirenOscillator.connect(gainNode);
    gainNode.connect(sirenAudioCtx.destination);
    sirenOscillator.start();
    isSirenPlaying = true;
  } catch (e) {
    console.warn("Audio Context not supported or restricted:", e);
  }
}

function stopEmergencySiren() {
  if (sirenOscillator) {
    try {
      sirenOscillator.stop();
      sirenOscillator.disconnect();
    } catch (e) {}
    sirenOscillator = null;
  }
  if (sirenAudioCtx) {
    try {
      sirenAudioCtx.close();
    } catch (e) {}
    sirenAudioCtx = null;
  }
  isSirenPlaying = false;
  const btn = document.getElementById("sirenTriggerBtn");
  if (btn) {
    btn.classList.remove("siren-active");
    btn.innerHTML = '<i class="fas fa-bullhorn"></i> <span>Sound Civic Alarm</span>';
  }
}

/* ==========================================================================
   4. LIVE ADVISORY & WEATHER TICKER
   ========================================================================== */
async function initLiveTicker() {
  try {
    const res = await fetch("/api/announcements");
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        NASHIK_DATA.announcements = json.data;
      }
    }
  } catch (e) {
    // Graceful offline fallback to pre-bundled data
  }
  renderLiveTicker();
}

function renderLiveTicker() {
  const tickerContainer = document.getElementById("liveAnnouncementTicker");
  if (!tickerContainer) return;

  const currentLang = window.currentLanguage || "en";
  const itemsHtml = NASHIK_DATA.announcements.map(item => {
    let text = item.textEn;
    if (currentLang === "mr") text = item.textMr;
    if (currentLang === "hi") text = item.textHi;

    return `
      <div class="ticker-item">
        <span class="ticker-badge badge-${item.badgeType}">${item.badge}</span>
        <span class="ticker-text">${text}</span>
        <span class="ticker-time">${item.timestamp}</span>
      </div>
    `;
  }).join("");

  tickerContainer.innerHTML = itemsHtml;
}

/* ==========================================================================
   5. INTERACTIVE SPEED & BRAKING DISTANCE CALCULATOR
   ========================================================================== */
function initSpeedCalculator() {
  const speedSlider = document.getElementById("speedSlider");
  const speedDisplay = document.getElementById("speedDisplay");
  const reactionDistSpan = document.getElementById("reactionDist");
  const brakingDistSpan = document.getElementById("brakingDist");
  const totalStoppingDistSpan = document.getElementById("totalStoppingDist");
  const roadConditionSelect = document.getElementById("roadCondition");
  const speedVerdict = document.getElementById("speedVerdict");

  if (!speedSlider) return;

  function recalculate() {
    const speed = parseInt(speedSlider.value, 10);
    speedDisplay.textContent = speed;

    const isWet = roadConditionSelect ? roadConditionSelect.value === "wet" : false;
    // Human average reaction time = ~1.0 second. Speed in m/s = speed * 0.27778
    const speedMps = speed * 0.27778;
    const reactionDist = Math.round(speedMps * 1.0);

    // Friction coeff: Dry asphalt ~0.7, Wet monsoon asphalt ~0.4
    const mu = isWet ? 0.38 : 0.72;
    const g = 9.81;
    const brakingDist = Math.round((speedMps * speedMps) / (2 * mu * g));
    const totalDist = reactionDist + brakingDist;

    reactionDistSpan.textContent = reactionDist + " m";
    brakingDistSpan.textContent = brakingDist + " m";
    totalStoppingDistSpan.textContent = totalDist + " m";

    // Visual bar representations
    const reactionBar = document.getElementById("barReaction");
    const brakingBar = document.getElementById("barBraking");
    if (reactionBar && brakingBar) {
      const maxDist = 140; // scale limit
      reactionBar.style.width = Math.min(100, (reactionDist / maxDist) * 100) + "%";
      brakingBar.style.width = Math.min(100, (brakingDist / maxDist) * 100) + "%";
    }

    // Verdict message
    if (speedVerdict) {
      if (speed <= 40) {
        speedVerdict.innerHTML = '<span class="text-success"><i class="fas fa-check-circle"></i> <strong>Safe Urban Speed:</strong> Highly manageable stopping buffer for Nashik residential & school zones.</span>';
      } else if (speed <= 60) {
        speedVerdict.innerHTML = '<span class="text-warning"><i class="fas fa-exclamation-circle"></i> <strong>Moderate Caution:</strong> Requires 1.5 bus lengths to halt. High pedestrian danger at Dwarka/CBS circles.</span>';
      } else {
        speedVerdict.innerHTML = '<span class="text-danger"><i class="fas fa-skull-crossbones"></i> <strong>High Lethality Zone:</strong> At ' + speed + ' km/h on ' + (isWet ? 'wet monsoon roads' : 'roads') + ', stopping distance exceeds ' + totalDist + ' meters! Fatal impact hazard.</span>';
      }
    }
  }

  speedSlider.addEventListener("input", recalculate);
  if (roadConditionSelect) {
    roadConditionSelect.addEventListener("change", recalculate);
  }
  recalculate();
}

/* ==========================================================================
   6. REPORT A HAZARD MODULE (Local Storage + Geolocation)
   ========================================================================== */
function initHazardReporting() {
  const form = document.getElementById("hazardReportForm");
  const gpsBtn = document.getElementById("btnAutoGps");
  const photoInput = document.getElementById("hazardPhotoInput");
  const photoPreview = document.getElementById("photoPreviewContainer");
  const reportList = document.getElementById("communityReportsFeed");

  // Load existing reports from localStorage or demo defaults
  renderRecentReports();

  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      gpsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toFixed(4);
            const lng = pos.coords.longitude.toFixed(4);
            const locInput = document.getElementById("hazardLocationInput");
            if (locInput) {
              locInput.value = `Near Nashik [GPS: ${lat}, ${lng}]`;
            }
            gpsBtn.innerHTML = '<i class="fas fa-check"></i> GPS Captured';
            setTimeout(() => {
              gpsBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Auto-Detect GPS';
            }, 3000);
          },
          (err) => {
            // Simulated fallback for Nashik
            const locInput = document.getElementById("hazardLocationInput");
            if (locInput) locInput.value = "Dwarka Circle Flyover Approach, Nashik";
            gpsBtn.innerHTML = '<i class="fas fa-check"></i> Localized (Nashik)';
            setTimeout(() => {
              gpsBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Auto-Detect GPS';
            }, 3000);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        gpsBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Auto-Detect GPS';
      }
    });
  }

  // Live photo preview
  if (photoInput && photoPreview) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoPreview.innerHTML = `
            <div class="preview-box">
              <img src="${event.target.result}" alt="Hazard preview" />
              <button type="button" class="btn-remove-preview" onclick="removePhotoPreview()">&times;</button>
            </div>
          `;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const type = document.getElementById("hazardTypeSelect").value;
      const location = document.getElementById("hazardLocationInput").value.trim();
      const desc = document.getElementById("hazardDescInput").value.trim();
      const name = document.getElementById("reporterNameInput").value.trim();
      const phone = document.getElementById("reporterPhoneInput").value.trim();

      if (!location || !desc) {
        alert("Please provide the location and description of the hazard.");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting to Control Room...';
        submitBtn.disabled = true;
      }

      // Default client-side ticket
      let ticketId = "NSK-HZ-" + Math.floor(1000 + Math.random() * 9000);

      // Attempt to post to live backend
      try {
        const res = await fetch("/api/hazards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            location,
            desc,
            reporterName: name,
            reporterPhone: phone
          })
        });

        if (res.ok) {
          const json = await res.json();
          if (json.trackingId) {
            ticketId = json.trackingId;
          }
        }
      } catch (err) {
        // Fallback gracefully to offline localStorage
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }

      const newReport = {
        id: ticketId,
        type: type,
        location: location,
        desc: desc,
        reporter: name || "Concerned Citizen",
        phone: phone || "Protected",
        status: "Dispatched to NMC / Traffic Police",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("safeNashik_reports") || "[]");
      existing.unshift(newReport);
      localStorage.setItem("safeNashik_reports", JSON.stringify(existing));

      // Show confirmation alert
      showReportSuccessModal(newReport);
      form.reset();
      if (photoPreview) photoPreview.innerHTML = "";
      renderRecentReports();
    });
  }
}

function removePhotoPreview() {
  const photoInput = document.getElementById("hazardPhotoInput");
  const photoPreview = document.getElementById("photoPreviewContainer");
  if (photoInput) photoInput.value = "";
  if (photoPreview) photoPreview.innerHTML = "";
}

function showReportSuccessModal(report) {
  const modalHtml = `
    <div class="safety-modal-backdrop" id="reportSuccessModal" onclick="this.remove()">
      <div class="safety-modal-card text-center animate-scale-up" onclick="event.stopPropagation()">
        <div class="success-icon-badge"><i class="fas fa-check-circle"></i></div>
        <h3>Hazard Logged Successfully!</h3>
        <p class="ticket-number">Ticket ID: <strong>${report.id}</strong></p>
        <p class="ticket-info">Your report has been entered into the community dashboard and forwarded to the Nashik Municipal Emergency cell.</p>
        <div class="ticket-summary-box">
          <p><strong>Category:</strong> ${report.type}</p>
          <p><strong>Location:</strong> ${report.location}</p>
          <p><strong>Status:</strong> <span class="badge badge-warning">${report.status}</span></p>
        </div>
        <button class="btn btn-primary mt-3" onclick="document.getElementById('reportSuccessModal').remove()">Done</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function renderRecentReports() {
  const container = document.getElementById("communityReportsFeed");
  if (!container) return;

  const demoReports = [
    {
      id: "NSK-HZ-8421",
      type: "Road Pothole / Crater",
      location: "Dwarka to Mumbai Naka Flyover descent",
      desc: "Deep 8-inch pothole in fast lane causing sudden two-wheeler skids.",
      reporter: "Vikram Jadhav",
      status: "In Progress (Road Repair Team Dispatched)",
      date: "Today, 06:15 AM"
    },
    {
      id: "NSK-HZ-7719",
      type: "Broken Barricade / Open Manhole",
      location: "Ramkund Ghat pedestrian walkway",
      desc: "Rusted safety railing segment missing near second bathing steps.",
      reporter: "Pooja Shinde",
      status: "Verified & Guard Posted",
      date: "Yesterday"
    },
    {
      id: "NSK-HZ-6590",
      type: "Traffic Signal Failure",
      location: "Mahatma Nagar Water Tank Junction",
      desc: "All lights blinking amber during peak school rush hours.",
      reporter: "Rahul Patil",
      status: "Resolved by NMC Traffic Dept",
      date: "2 days ago"
    }
  ];

  const stored = JSON.parse(localStorage.getItem("safeNashik_reports") || "[]");
  const combined = [...stored, ...demoReports].slice(0, 6);

  container.innerHTML = combined.map(rep => {
    let badgeClass = "badge-warning";
    if (rep.status.includes("Resolved")) badgeClass = "badge-hospital";
    if (rep.status.includes("In Progress") || rep.status.includes("Dispatched")) badgeClass = "badge-fire";

    return `
      <div class="report-card-item">
        <div class="report-card-head">
          <span class="report-ticket"><i class="fas fa-ticket-alt"></i> ${rep.id}</span>
          <span class="badge ${badgeClass}">${rep.status}</span>
        </div>
        <h5>${rep.type}</h5>
        <p class="report-loc"><i class="fas fa-map-marker-alt"></i> ${rep.location}</p>
        <p class="report-desc">${rep.desc}</p>
        <div class="report-meta">
          <span><i class="fas fa-user-circle"></i> ${rep.reporter}</span>
          <span><i class="fas fa-clock"></i> ${rep.date}</span>
        </div>
      </div>
    `;
  }).join("");
}

/* ==========================================================================
   7. INTERACTIVE SAFETY QUIZ & CANVAS CERTIFICATE GENERATOR
   ========================================================================== */
function initQuiz() {
  const startBtn = document.getElementById("startQuizBtn");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const restartBtn = document.getElementById("restartQuizBtn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      document.getElementById("quizIntroCard").style.display = "none";
      document.getElementById("quizActiveCard").style.display = "block";
      quizCurrentIndex = 0;
      quizScore = 0;
      quizUserAnswers = [];
      renderQuizQuestion();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", handleNextQuestion);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      document.getElementById("quizResultCard").style.display = "none";
      document.getElementById("quizIntroCard").style.display = "block";
      quizCurrentIndex = 0;
      quizScore = 0;
    });
  }

  const downloadCertBtn = document.getElementById("downloadCertBtn");
  if (downloadCertBtn) {
    downloadCertBtn.addEventListener("click", generateAndDownloadCertificate);
  }
}

function renderQuizQuestion() {
  const container = document.getElementById("quizQuestionContainer");
  const progressSpan = document.getElementById("quizProgressNumber");
  const progressBar = document.getElementById("quizProgressBar");
  const nextBtn = document.getElementById("nextQuestionBtn");

  if (!container || !NASHIK_DATA.quizQuestions[quizCurrentIndex]) return;

  const q = NASHIK_DATA.quizQuestions[quizCurrentIndex];
  const total = NASHIK_DATA.quizQuestions.length;
  const currentLang = window.currentLanguage || "en";

  let questionText = q.questionEn;
  let options = q.optionsEn;
  if (currentLang === "mr") {
    questionText = q.questionMr || q.questionEn;
    options = q.optionsMr || q.optionsEn;
  } else if (currentLang === "hi") {
    questionText = q.questionHi || q.questionEn;
    options = q.optionsHi || q.optionsEn;
  }

  if (progressSpan) progressSpan.textContent = `${quizCurrentIndex + 1} / ${total}`;
  if (progressBar) progressBar.style.width = `${((quizCurrentIndex + 1) / total) * 100}%`;
  if (nextBtn) nextBtn.style.display = "none";

  container.innerHTML = `
    <div class="quiz-question-box">
      <span class="badge badge-primary mb-2">${q.category}</span>
      <h4 class="question-text">${questionText}</h4>
      <div class="quiz-options-list">
        ${options.map((opt, idx) => `
          <button type="button" class="quiz-opt-btn" onclick="selectQuizAnswer(${idx})">
            <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="opt-label">${opt}</span>
          </button>
        `).join("")}
      </div>
      <div id="quizExplanationBox" class="quiz-explanation-box" style="display:none;"></div>
    </div>
  `;
}

function selectQuizAnswer(selectedIndex) {
  const q = NASHIK_DATA.quizQuestions[quizCurrentIndex];
  const buttons = document.querySelectorAll(".quiz-opt-btn");
  const explanationBox = document.getElementById("quizExplanationBox");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const currentLang = window.currentLanguage || "en";

  // Disable all buttons
  buttons.forEach(btn => btn.disabled = true);

  const isCorrect = selectedIndex === q.correctIndex;
  if (isCorrect) {
    quizScore++;
    buttons[selectedIndex].classList.add("correct-answer");
  } else {
    buttons[selectedIndex].classList.add("wrong-answer");
    buttons[q.correctIndex].classList.add("correct-answer");
  }

  let explanationText = q.explanationEn;
  if (currentLang === "mr") explanationText = q.explanationMr || q.explanationEn;
  if (currentLang === "hi") explanationText = q.explanationHi || q.explanationEn;

  explanationBox.style.display = "block";
  explanationBox.innerHTML = `
    <div class="alert ${isCorrect ? 'alert-success' : 'alert-danger'}">
      <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
      <strong>${isCorrect ? 'Correct!' : 'Incorrect!'}</strong> ${explanationText}
    </div>
  `;

  if (nextBtn) {
    nextBtn.style.display = "inline-flex";
    if (quizCurrentIndex === NASHIK_DATA.quizQuestions.length - 1) {
      nextBtn.innerHTML = '<span>Finish & View Certificate</span> <i class="fas fa-award"></i>';
    } else {
      nextBtn.innerHTML = '<span>Next Question</span> <i class="fas fa-arrow-right"></i>';
    }
  }
}

function handleNextQuestion() {
  quizCurrentIndex++;
  if (quizCurrentIndex < NASHIK_DATA.quizQuestions.length) {
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById("quizActiveCard").style.display = "none";
  const resultCard = document.getElementById("quizResultCard");
  resultCard.style.display = "block";

  const total = NASHIK_DATA.quizQuestions.length;
  const percentage = Math.round((quizScore / total) * 100);
  const scoreNumber = document.getElementById("quizFinalScore");
  const certForm = document.getElementById("certNameInputSection");
  const resultMessage = document.getElementById("quizResultMessage");

  if (scoreNumber) scoreNumber.textContent = `${quizScore} / ${total} (${percentage}%)`;

  if (percentage >= 60) {
    if (resultMessage) {
      resultMessage.innerHTML = `<span class="text-success"><i class="fas fa-trophy"></i> Outstanding! You have qualified as a certified <strong>Nashik Community Safety Champion</strong>. Enter your full name below to generate your official signed certificate.</span>`;
    }
    if (certForm) certForm.style.display = "block";
  } else {
    if (resultMessage) {
      resultMessage.innerHTML = `<span class="text-warning"><i class="fas fa-redo"></i> You scored ${percentage}%. Review the safety topics above and retake the quiz to qualify for the official certificate (minimum 60% required).</span>`;
    }
    if (certForm) certForm.style.display = "none";
  }
}

function generateAndDownloadCertificate() {
  const nameInput = document.getElementById("certCandidateName");
  const candidateName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Nashik Citizen";

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  // Certificate Background Gradient & Borders
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
  bgGrad.addColorStop(0, "#f8fafc");
  bgGrad.addColorStop(1, "#f1f5f9");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 800);

  // Outer Decorative Borders
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#1e3a8a"; // Deep Navy
  ctx.strokeRect(20, 20, 1160, 760);

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#d97706"; // Gold
  ctx.strokeRect(36, 36, 1128, 728);

  // Corner Ornaments
  drawCornerOrnament(ctx, 36, 36);
  drawCornerOrnament(ctx, 1164, 36);
  drawCornerOrnament(ctx, 36, 764);
  drawCornerOrnament(ctx, 1164, 764);

  // Civic Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("NASHIK ACCIDENT PREVENTION & COMMUNITY AWARENESS INITIATIVE", 600, 110);

  ctx.fillStyle = "#d97706";
  ctx.font = "600 18px sans-serif";
  ctx.fillText("GOVERNMENT & CIVIC SAFETY OUTREACH • KISAN-NAGARIK MITRA", 600, 140);

  // Certificate Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 46px serif";
  ctx.fillText("CERTIFICATE OF CIVIC MERIT", 600, 220);

  ctx.font = "italic 20px sans-serif";
  ctx.fillStyle = "#475569";
  ctx.fillText("This is proudly presented to", 600, 270);

  // Candidate Name
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 44px sans-serif";
  ctx.fillText(candidateName.toUpperCase(), 600, 340);

  // Underline
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(350, 360);
  ctx.lineTo(850, 360);
  ctx.stroke();

  // Commendation Text
  ctx.fillStyle = "#334155";
  ctx.font = "20px sans-serif";
  ctx.fillText("for demonstrating high proficiency in Community Road Safety, Godavari River Precautions,", 600, 410);
  ctx.fillText("Fire Defense Protocols, and Kumbh Mela Crowd Vigilance.", 600, 445);
  ctx.fillText("Officially recognized as an active guardian of community safety in Nashik Metropolitan Area.", 600, 480);

  // Date and Certificate ID
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const certId = "NSK-SAFE-CERT-" + Math.floor(100000 + Math.random() * 900000);

  ctx.fillStyle = "#64748b";
  ctx.font = "16px monospace";
  ctx.fillText(`Certificate ID: ${certId}  |  Issue Date: ${today}`, 600, 530);

  // Seal Graphic
  ctx.beginPath();
  ctx.arc(600, 620, 45, 0, Math.PI * 2);
  ctx.fillStyle = "#fef3c7";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#d97706";
  ctx.stroke();

  ctx.fillStyle = "#b45309";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("OFFICIAL SEAL", 600, 615);
  ctx.fillText("NMC • 2026", 600, 635);

  // Signatures
  // Left: Traffic & Disaster Warden
  ctx.textAlign = "left";
  ctx.fillStyle = "#1e293b";
  ctx.font = "italic bold 22px serif";
  ctx.fillText("Rajendra S. Kadam", 120, 680);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#94a3b8";
  ctx.beginPath();
  ctx.moveTo(120, 690);
  ctx.lineTo(320, 690);
  ctx.stroke();
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Chief Disaster & Traffic Coordinator", 120, 715);
  ctx.fillText("Nashik Safety Council", 120, 735);

  // Right: Medical & Rescue Directorate
  ctx.textAlign = "right";
  ctx.fillStyle = "#1e293b";
  ctx.font = "italic bold 22px serif";
  ctx.fillText("Dr. Sunita V. Deshmukh", 1080, 680);
  ctx.beginPath();
  ctx.moveTo(880, 690);
  ctx.lineTo(1080, 690);
  ctx.stroke();
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Head of Trauma Care & Emergency Relief", 1080, 715);
  ctx.fillText("District Civil Hospital, Nashik", 1080, 735);

  // Download Trigger
  const link = document.createElement("a");
  link.download = `Nashik-Safety-Certificate-${candidateName.replace(/\s+/g, "_")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function drawCornerOrnament(ctx, x, y) {
  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
}

/* ==========================================================================
   8. COMMUNITY SAFETY PLEDGE ENGINE
   ========================================================================== */
function initPledge() {
  const pledgeBtn = document.getElementById("takePledgeBtn");
  const pledgeCounterEl = document.getElementById("livePledgeCounter");
  const pledgeCardResult = document.getElementById("pledgeSuccessCard");

  // Default seed count
  let count = parseInt(localStorage.getItem("safeNashik_pledgeCount") || "12450", 10);
  const hasTaken = localStorage.getItem("safeNashik_userPledged") === "true";

  // Attempt to sync with live server stats
  fetch("/api/stats")
    .then(r => r.json())
    .then(json => {
      if (json.success && json.data && json.data.pledgesCount) {
        count = json.data.pledgesCount;
        if (pledgeCounterEl) pledgeCounterEl.textContent = count.toLocaleString("en-IN");
      }
    })
    .catch(() => {});

  if (pledgeCounterEl) {
    pledgeCounterEl.textContent = count.toLocaleString("en-IN");
  }

  if (hasTaken && pledgeBtn) {
    pledgeBtn.disabled = true;
    pledgeBtn.innerHTML = '<i class="fas fa-check-double"></i> <span>Pledge Taken!</span>';
    if (pledgeCardResult) pledgeCardResult.style.display = "block";
  }

  if (pledgeBtn && !hasTaken) {
    pledgeBtn.addEventListener("click", () => {
      count++;
      localStorage.setItem("safeNashik_pledgeCount", count);
      localStorage.setItem("safeNashik_userPledged", "true");

      // Notify backend API
      fetch("/api/pledges", { method: "POST" })
        .then(r => r.json())
        .then(res => {
          if (res.newCount && pledgeCounterEl) {
            pledgeCounterEl.textContent = res.newCount.toLocaleString("en-IN");
          }
        })
        .catch(() => {});

      if (pledgeCounterEl) pledgeCounterEl.textContent = count.toLocaleString("en-IN");
      pledgeBtn.disabled = true;
      pledgeBtn.innerHTML = '<i class="fas fa-check-double"></i> <span>Pledge Taken!</span>';

      if (pledgeCardResult) {
        pledgeCardResult.style.display = "block";
        pledgeCardResult.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/* ==========================================================================
   9. DIGITAL CHILD / ELDERLY SAFETY ID CARD GENERATOR
   ========================================================================== */
function initIdCardGenerator() {
  const form = document.getElementById("idCardGeneratorForm");
  const previewBox = document.getElementById("idCardRenderBox");
  const printBtn = document.getElementById("printIdCardBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const personName = document.getElementById("idPersonName").value.trim();
      const personType = document.getElementById("idPersonType").value;
      const age = document.getElementById("idAge").value;
      const bloodGroup = document.getElementById("idBloodGroup").value;
      const guardianName = document.getElementById("idGuardianName").value.trim();
      const primaryPhone = document.getElementById("idPrimaryPhone").value.trim();
      const emergencyPhone = document.getElementById("idEmergencyPhone").value.trim();
      const address = document.getElementById("idCityAddress").value.trim();

      const cardId = "NSK-ID-" + Math.floor(100000 + Math.random() * 900000);

      previewBox.innerHTML = `
        <div class="printable-safety-card animate-fade-in" id="printableCard">
          <div class="card-band">
            <div class="band-left">
              <strong>NASHIK PILGRIM & CITIZEN SAFETY WRISTBAND / ID</strong>
              <span>Kumbh Mela & Heavy Crowd Safety Protection Protocol</span>
            </div>
            <div class="band-right">
              <span class="id-serial">${cardId}</span>
            </div>
          </div>
          <div class="card-content-grid">
            <div class="card-photo-avatar">
              <div class="avatar-icon"><i class="fas ${personType === 'Child' ? 'fa-child' : (personType === 'Elderly' ? 'fa-blind' : 'fa-user-shield')}"></i></div>
              <span class="type-tag">${personType}</span>
            </div>
            <div class="card-details-col">
              <h3 class="name-display">${personName}</h3>
              <p><strong>Age:</strong> ${age} yrs &nbsp;|&nbsp; <strong>Blood Group:</strong> <span class="blood-badge">${bloodGroup}</span></p>
              <p><strong>Guardian / Emergency Contact:</strong> ${guardianName} (${primaryPhone})</p>
              ${emergencyPhone ? `<p><strong>Alt Police / Helpdesk Contact:</strong> ${emergencyPhone}</p>` : ""}
              <p><strong>Address / Nashik Lodging:</strong> ${address}</p>
            </div>
            <div class="card-barcode-col">
              <div class="simulated-qr">
                <i class="fas fa-qrcode"></i>
              </div>
              <span class="qr-text">Scan for SOS Help</span>
              <span class="sos-call-label">If Lost, Call: 112 / 108</span>
            </div>
          </div>
        </div>
      `;

      if (printBtn) printBtn.style.display = "inline-flex";
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   10. ACCESSIBILITY & TEXT-TO-SPEECH (Voice Reader)
   ========================================================================== */
function initAccessibilityFeatures() {
  const readAloudBtns = document.querySelectorAll(".btn-read-aloud");
  
  readAloudBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetSelector = btn.getAttribute("data-target");
      const targetEl = document.querySelector(targetSelector);
      if (targetEl && "speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Stop ongoing speech

        const text = targetEl.innerText || targetEl.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Pick language appropriate voice if available
        if (window.currentLanguage === "hi") {
          utterance.lang = "hi-IN";
        } else if (window.currentLanguage === "mr") {
          utterance.lang = "mr-IN";
        } else {
          utterance.lang = "en-IN";
        }
        
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);

        btn.classList.add("speaking");
        utterance.onend = () => btn.classList.remove("speaking");
      }
    });
  });

  // Font Resizing (A- / A / A+)
  const btnFontDecrease = document.getElementById("btnFontDecrease");
  const btnFontNormal = document.getElementById("btnFontNormal");
  const btnFontIncrease = document.getElementById("btnFontIncrease");

  let currentFontSize = 100;
  if (btnFontDecrease) {
    btnFontDecrease.addEventListener("click", () => {
      currentFontSize = Math.max(85, currentFontSize - 10);
      document.documentElement.style.fontSize = currentFontSize + "%";
    });
  }
  if (btnFontNormal) {
    btnFontNormal.addEventListener("click", () => {
      currentFontSize = 100;
      document.documentElement.style.fontSize = "100%";
    });
  }
  if (btnFontIncrease) {
    btnFontIncrease.addEventListener("click", () => {
      currentFontSize = Math.min(130, currentFontSize + 10);
      document.documentElement.style.fontSize = currentFontSize + "%";
    });
  }
}

/* ==========================================================================
   11. LEFT-SIDE NAVIGATION DROPDOWN MENU
   ========================================================================== */
function initLeftDropdownMenu() {
  const dropdownWrap = document.getElementById("leftDropdownWrap");
  const dropdownBtn = document.getElementById("leftDropdownBtn");
  const closeBtn = document.getElementById("leftDropdownCloseBtn");
  const backdrop = document.getElementById("leftDropdownBackdrop");
  const searchInput = document.getElementById("dropdownSearchInput");
  const dropdownItems = document.querySelectorAll("#dropdownPanelBody .dropdown-item, #dropdownPanelBody .hotline-card");
  
  if (!dropdownWrap || !dropdownBtn) return;

  function openDropdown() {
    dropdownWrap.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-active");
    dropdownBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 150);
  }

  function closeDropdown() {
    dropdownWrap.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-active");
    dropdownBtn.setAttribute("aria-expanded", "false");
    if (searchInput) {
      searchInput.value = "";
      dropdownItems.forEach(item => (item.style.display = ""));
    }
  }

  function toggleDropdown() {
    if (dropdownWrap.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDropdown();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeDropdown);
  }

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (dropdownWrap.classList.contains("is-open") && !dropdownWrap.contains(e.target) && e.target !== backdrop) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dropdownWrap.classList.contains("is-open")) {
      closeDropdown();
    }
  });

  // Close when clicking any nav link inside dropdown
  const navLinks = dropdownWrap.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDropdown();
    });
  });

  // Instant Search / Filter inside Dropdown
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      dropdownItems.forEach(item => {
        const filterStr = (item.getAttribute("data-filter") || item.innerText).toLowerCase();
        if (!q || filterStr.includes(q)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Quick Controls inside Dropdown
  const themeBtn = document.getElementById("dropdownThemeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const globalThemeBtn = document.getElementById("themeToggleBtn");
      if (globalThemeBtn) globalThemeBtn.click();
    });
  }

  const contrastBtn = document.getElementById("dropdownContrastBtn");
  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      const globalContrastBtn = document.getElementById("contrastToggleBtn");
      if (globalContrastBtn) globalContrastBtn.click();
    });
  }

  const sosBtn = document.getElementById("dropdownSosBtn");
  if (sosBtn) {
    sosBtn.addEventListener("click", () => {
      closeDropdown();
      const globalSosBtn = document.getElementById("openSosModalBtn");
      if (globalSosBtn) globalSosBtn.click();
    });
  }
}

/* ==========================================================================
   12. ROAD RULES & TRAFFIC REGULATIONS INTERACTIVE HUB
   ========================================================================== */
function initRoadRulesHub() {
  const tabBtns = document.querySelectorAll("#rulesCategoryTabs .rule-tab-btn");
  const searchInput = document.getElementById("rulesSearchInput");
  const ruleCards = document.querySelectorAll("#roadRulesGrid .road-rule-card");

  if (!ruleCards.length) return;

  let currentCategory = "all";
  let currentSearchQuery = "";

  function filterCards() {
    ruleCards.forEach(card => {
      const cardCat = card.getAttribute("data-category") || "";
      const cardSearchText = (card.getAttribute("data-search") + " " + card.innerText).toLowerCase();

      const matchesCat = currentCategory === "all" || cardCat.includes(currentCategory);
      const matchesSearch = !currentSearchQuery || cardSearchText.includes(currentSearchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Category Tab clicks
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      filterCards();
    });
  });

  // Instant Search filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }
}

// Global expose
window.selectQuizAnswer = selectQuizAnswer;
window.generateAndDownloadCertificate = generateAndDownloadCertificate;
window.toggleEmergencySiren = toggleEmergencySiren;
window.removePhotoPreview = removePhotoPreview;
window.initLeftDropdownMenu = initLeftDropdownMenu;
window.initRoadRulesHub = initRoadRulesHub;

// ============================================================================
// ORGANIZED SPA VIEW CONTROLLER (Zero-Clutter Home & Dedicated Modules)
// ============================================================================
function switchAppView(viewName) {
  if (!viewName) viewName = 'home';
  viewName = viewName.replace('#', '').trim();

  const aliasMap = {
    'home': 'home',
    'safetyTopics': 'guides',
    'guides': 'guides',
    'interactiveMap': 'map',
    'map': 'map',
    'speedCalculator': 'speed',
    'speed': 'speed',
    'rules': 'rules',
    'allRoadRulesSection': 'rules',
    'hazardReporting': 'hazard',
    'hazard': 'hazard',
    'kumbhSpecial': 'kumbh',
    'kumbh': 'kumbh',
    'safetyQuiz': 'quiz',
    'quiz': 'quiz',
    'communityPledge': 'pledge',
    'volunteerSection': 'pledge',
    'campaignGallery': 'pledge',
    'pledge': 'pledge'
  };

  const target = aliasMap[viewName] || 'home';

  // Toggle sections
  document.querySelectorAll('[data-view-section]').forEach(sec => {
    const sectionViews = (sec.getAttribute('data-view-section') || '').split(' ');
    if (sectionViews.includes(target)) {
      sec.style.display = '';
      sec.classList.add('active-view');
    } else {
      sec.style.display = 'none';
      sec.classList.remove('active-view');
    }
  });

  // Update navbar tab buttons
  document.querySelectorAll('.mod-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-view') === target) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // If map view, recompute Leaflet size
  if (target === 'map') {
    setTimeout(() => {
      if (typeof mapInstance !== 'undefined' && mapInstance) {
        mapInstance.invalidateSize();
      }
    }, 250);
  }

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update hash
  if (history.pushState) {
    history.pushState(null, null, target === 'home' ? window.location.pathname : '#' + target);
  }
}

// Global expose
window.switchAppView = switchAppView;

// Hashchange & Initial Load Listeners
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) switchAppView(hash);
});

document.addEventListener('DOMContentLoaded', () => {
  // Check initial hash
  const initialHash = window.location.hash.replace('#', '');
  switchAppView(initialHash || 'home');

  // Intercept dropdown items to switch views cleanly
  document.querySelectorAll('.dropdown-item[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHash = link.getAttribute('href').replace('#', '');
      if (targetHash) {
        e.preventDefault();
        switchAppView(targetHash);
        const closeBtn = document.getElementById('leftDropdownCloseBtn');
        if (closeBtn) closeBtn.click();
      }
    });
  });

  // Intercept mobile bottom bar map & report buttons
  const mobileMapBtn = document.querySelector('.mobile-bottom-sos-bar .btn-map');
  if (mobileMapBtn) {
    mobileMapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('map');
    });
  }
  const mobileHazardBtn = document.querySelector('.mobile-bottom-sos-bar .btn-hazard');
  if (mobileHazardBtn) {
    mobileHazardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppView('hazard');
    });
  }
});

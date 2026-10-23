/**
 * Safe Nashik - All Road Rules & Traffic Penalties Engine (234 Rules)
 * Search, filter, categorization and bilingual display engine.
 */

let currentRulesCategory = 'all';
let currentRulesFineFilter = 'all';
let currentRulesSearchQuery = '';

function initRoadRulesEngine() {
  renderRoadRules();

  // Search input listener (bind to rulesSearchInput or .rules-search-field)
  const searchInput = document.getElementById('rulesSearchInput') || document.querySelector('.rules-search-field');
  if (searchInput) {
    const handleSearch = (e) => {
      currentRulesSearchQuery = (e.target.value || '').toLowerCase().trim();
      renderRoadRules();
    };

    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', handleSearch);
    searchInput.addEventListener('change', handleSearch);
  }

  // Clear search button
  const clearBtn = document.getElementById('rulesClearSearchBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const input = document.getElementById('rulesSearchInput') || document.querySelector('.rules-search-field');
      if (input) {
        input.value = '';
        input.focus();
      }
      currentRulesSearchQuery = '';
      renderRoadRules();
    });
  }

  // Category filter chips
  document.querySelectorAll('.rules-cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.rules-cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentRulesCategory = pill.getAttribute('data-cat') || 'all';
      renderRoadRules();
    });
  });

  // Fine filter selector
  const fineFilter = document.getElementById('rulesFineFilterSelect');
  if (fineFilter) {
    fineFilter.addEventListener('change', (e) => {
      currentRulesFineFilter = e.target.value;
      renderRoadRules();
    });
  }
}

function filterRulesData() {
  if (typeof ALL_ROAD_RULES === 'undefined' || !Array.isArray(ALL_ROAD_RULES)) {
    return [];
  }

  return ALL_ROAD_RULES.filter(item => {
    // 1. Category Filter
    if (currentRulesCategory !== 'all' && item.category !== currentRulesCategory) {
      return false;
    }

    // 2. Fine Filter
    if (currentRulesFineFilter !== 'all') {
      const fineStr = String(item.fine || '');
      const isCourt = fineStr.includes('Court') || (item.repeatFine && item.repeatFine.includes('Non-Compoundable'));
      
      if (currentRulesFineFilter === 'court' && !isCourt) return false;
      if (currentRulesFineFilter === 'low') {
        const num = parseInt(fineStr.replace(/[^0-9]/g, '')) || 0;
        if (isCourt || num > 1000) return false;
      }
      if (currentRulesFineFilter === 'mid') {
        const num = parseInt(fineStr.replace(/[^0-9]/g, '')) || 0;
        if (isCourt || num <= 1000 || num > 5000) return false;
      }
      if (currentRulesFineFilter === 'high') {
        const num = parseInt(fineStr.replace(/[^0-9]/g, '')) || 0;
        if (isCourt || num < 10000) return false;
      }
    }

    // 3. Multi-Term Search Query across all fields
    if (currentRulesSearchQuery) {
      const q = currentRulesSearchQuery.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      
      const combinedText = [
        item.sr,
        item.section || '',
        item.nameEn || '',
        item.nameMr || '',
        item.fine || '',
        item.repeatFine || '',
        item.category || ''
      ].join(' ').toLowerCase();

      // Ensure every typed term appears in the offense record
      const allTermsFound = terms.every(term => combinedText.includes(term));
      if (!allTermsFound) {
        return false;
      }
    }

    return true;
  });
}

function renderRoadRules() {
  const tableBody = document.getElementById('rulesTableBody');
  const cardsContainer = document.getElementById('rulesMobileCards');
  const countBadge = document.getElementById('rulesResultsCount');
  
  if (!tableBody || !cardsContainer) return;

  const filtered = filterRulesData();

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${typeof ALL_ROAD_RULES !== 'undefined' ? ALL_ROAD_RULES.length : 234} Rules`;
  }

  if (filtered.length === 0) {
    const noResultsHtml = `
      <div class="rules-empty-state">
        <i class="fas fa-search" style="font-size:2.2rem; color:var(--text-muted); margin-bottom:0.75rem;"></i>
        <h4>No matching rules found</h4>
        <p style="color:var(--text-muted); margin-bottom:1rem;">Try searching with another keyword like "helmet", "speed", "license", "181", "10000", or reset filters.</p>
        <button class="btn btn-outline btn-sm" onclick="resetRulesSearch()">Reset All Filters</button>
      </div>
    `;
    tableBody.innerHTML = `<tr><td colspan="6">${noResultsHtml}</td></tr>`;
    cardsContainer.innerHTML = noResultsHtml;
    return;
  }

  // Desktop Table Rows
  tableBody.innerHTML = filtered.map(rule => {
    const isCourt = (rule.fine || '').includes('Court') || (rule.repeatFine || '').includes('Non-Compoundable');
    const finePillClass = isCourt ? 'fine-court' : (parseInt(String(rule.fine).replace(/[^0-9]/g, '')) >= 5000 ? 'fine-high' : 'fine-standard');
    
    return `
      <tr>
        <td class="col-sr font-bold text-muted">${rule.sr}</td>
        <td class="col-sec">
          <span class="rule-sec-badge">${escapeHtml(rule.section)}</span>
        </td>
        <td class="col-en">
          <div class="rule-name-en font-medium">${highlightMatch(rule.nameEn, currentRulesSearchQuery)}</div>
          <span class="rule-cat-tag">${escapeHtml(rule.category)}</span>
        </td>
        <td class="col-mr">
          <div class="rule-name-mr">${highlightMatch(rule.nameMr, currentRulesSearchQuery)}</div>
        </td>
        <td class="col-fine">
          <span class="rule-fine-pill ${finePillClass}">
            ${isCourt ? '<i class="fas fa-gavel"></i> ' : '₹ '}${escapeHtml(rule.fine)}
          </span>
        </td>
        <td class="col-rep">
          <span class="rule-rep-fine">
            ${(rule.repeatFine && rule.repeatFine !== '-') ? (isCourt ? rule.repeatFine : '₹ ' + rule.repeatFine) : 'Same'}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  // Mobile Touch Cards
  cardsContainer.innerHTML = filtered.map(rule => {
    const isCourt = (rule.fine || '').includes('Court') || (rule.repeatFine || '').includes('Non-Compoundable');
    const finePillClass = isCourt ? 'fine-court' : (parseInt(String(rule.fine).replace(/[^0-9]/g, '')) >= 5000 ? 'fine-high' : 'fine-standard');

    return `
      <div class="rule-touch-card">
        <div class="rule-card-top">
          <div class="rule-card-top-left">
            <span class="rule-card-num">#${rule.sr}</span>
            <span class="rule-sec-badge">${escapeHtml(rule.section)}</span>
          </div>
          <span class="rule-fine-pill ${finePillClass}">
            ${isCourt ? '<i class="fas fa-gavel"></i> ' : '₹ '}${escapeHtml(rule.fine)}
          </span>
        </div>
        <div class="rule-card-en">${highlightMatch(rule.nameEn, currentRulesSearchQuery)}</div>
        <div class="rule-card-mr">${highlightMatch(rule.nameMr, currentRulesSearchQuery)}</div>
        <div class="rule-card-footer">
          <span class="rule-cat-tag">${escapeHtml(rule.category)}</span>
          <span class="rule-card-repeat">
            <strong>Repeat:</strong> ${(rule.repeatFine && rule.repeatFine !== '-') ? (isCourt ? rule.repeatFine : '₹ ' + rule.repeatFine) : 'Same fine'}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function resetRulesSearch() {
  const searchInput = document.getElementById('rulesSearchInput') || document.querySelector('.rules-search-field');
  if (searchInput) searchInput.value = '';
  currentRulesSearchQuery = '';
  currentRulesCategory = 'all';
  currentRulesFineFilter = 'all';

  document.querySelectorAll('.rules-cat-pill').forEach(p => {
    if (p.getAttribute('data-cat') === 'all') p.classList.add('active');
    else p.classList.remove('active');
  });

  const fineFilter = document.getElementById('rulesFineFilterSelect');
  if (fineFilter) fineFilter.value = 'all';

  renderRoadRules();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightMatch(text, query) {
  if (!text) return '';
  if (!query) return escapeHtml(text);
  const escapedText = escapeHtml(text);
  const terms = query.trim().split(/\s+/).filter(t => t.length > 0);
  if (!terms.length) return escapedText;

  let result = escapedText;
  terms.forEach(term => {
    try {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark class="rules-highlight">$1</mark>');
    } catch (e) {}
  });
  return result;
}

// Global expose
window.initRoadRulesEngine = initRoadRulesEngine;
window.resetRulesSearch = resetRulesSearch;

document.addEventListener('DOMContentLoaded', () => {
  initRoadRulesEngine();
});

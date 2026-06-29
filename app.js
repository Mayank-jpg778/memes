// Core Application State & UI Rendering Logic (politics & live simulation updates)

let activeTab = "dashboard";
let memeSearchQuery = "";
let selectedCategory = "all";
let currentAudio = null;

// Live Auto-Upload Simulation State
let uploadInterval = null;
let progressInterval = null;
let uploadProgress = 0;
const uploadDuration = 15000; // 15 seconds per simulated upload
const progressIncrementTime = 100; // Update progress bar every 100ms
const progressStep = (progressIncrementTime / uploadDuration) * 100;

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load Meme of the Day
  setupMemeOfTheDay();

  // Load Initial Tab
  switchTab("dashboard");

  // Setup Nav Tabs
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Setup Search Bar & Category Filters in Dashboard
  const searchInput = document.getElementById("search-memes");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      memeSearchQuery = e.target.value.toLowerCase();
      renderMemes();
    });
  }

  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.getAttribute("data-category");
      renderMemes();
    });
  });

  // Generate Meme Templates Select Options
  populateMemeTemplates();

  // Render Initial Memes
  renderMemes();

  // Calculate and update the initial scoreboard
  updateBattleScore();

  // Render Soundboard
  renderSoundboard();

  // Start Live Simulation Systems
  startLiveTickerSimulation();
  startAutoUploaderSimulation();
});

// Switch SPA Tabs
function switchTab(tabId) {
  activeTab = tabId;

  // Toggle active tab link styles
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Toggle tab sections visibility
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach(section => {
    if (section.id === `${tabId}-section`) {
      section.classList.remove("hidden");
      section.classList.add("active-section");
    } else {
      section.classList.add("hidden");
      section.classList.remove("active-section");
    }
  });

  // Initialize canvas if switching to generator
  if (tabId === "generator") {
    if (window.initMemeGenerator) {
      window.initMemeGenerator();
    }
  }

  // Stop any playing audio if leaving soundboard
  if (tabId !== "soundboard" && currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    resetSoundButtons();
  }
}

// Curate and show 'Meme of the Day'
function setupMemeOfTheDay() {
  const motdContainer = document.getElementById("motd-card");
  if (!motdContainer) return;

  const allMemes = window.memesData;
  const randomIndex = Math.floor(Math.random() * allMemes.length);
  const motd = allMemes[randomIndex];

  motdContainer.innerHTML = `
    <div class="motd-badge">🔥 Meme of the Day</div>
    <div class="motd-content">
      <div class="motd-info">
        <h3>${motd.title}</h3>
        <p>"${motd.caption}"</p>
        <div class="motd-tags">
          ${motd.tags.map(tag => `<span class="tag">#${tag}</span>`).join("")}
        </div>
      </div>
      <div class="motd-image-wrapper">
        <img src="${motd.imageUrl}" alt="${motd.title}" class="motd-image">
      </div>
    </div>
  `;
}

// Render Memes Feed
function renderMemes() {
  const feed = document.getElementById("memes-feed");
  if (!feed) return;

  const filteredMemes = window.memesData.filter(meme => {
    const matchesCategory = selectedCategory === "all" || meme.category === selectedCategory;
    const matchesSearch = meme.title.toLowerCase().includes(memeSearchQuery) || 
                          meme.caption.toLowerCase().includes(memeSearchQuery) ||
                          meme.tags.some(tag => tag.toLowerCase().includes(memeSearchQuery));
    return matchesCategory && matchesSearch;
  });

  if (filteredMemes.length === 0) {
    feed.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">😭</div>
        <h3>No memes found!</h3>
        <p>Try searching for something else or switch categories.</p>
      </div>
    `;
    return;
  }

  feed.innerHTML = filteredMemes.map(meme => {
    const keyPrefix = `meme_${meme.id}_`;
    const likes = parseInt(localStorage.getItem(`${keyPrefix}likes`)) || meme.likes;
    const laughs = parseInt(localStorage.getItem(`${keyPrefix}laughs`)) || meme.laughs;
    const facepalms = parseInt(localStorage.getItem(`${keyPrefix}facepalms`)) || meme.facepalms;

    return `
      <div class="meme-card" id="card-${meme.id}">
        <div class="meme-card-header">
          <span class="category-badge category-${meme.category}">${meme.category.toUpperCase()}</span>
          <h4 class="meme-card-title">${meme.title}</h4>
        </div>
        <div class="meme-card-media">
          <img src="${meme.imageUrl}" alt="${meme.title}" loading="lazy">
        </div>
        <div class="meme-card-body">
          <p class="meme-card-caption">"${meme.caption}"</p>
          <div class="meme-card-tags">
            ${meme.tags.map(tag => `<span class="tag">#${tag}</span>`).join("")}
          </div>
        </div>
        <div class="meme-card-footer">
          <button class="reaction-btn" onclick="reactToMeme('${meme.id}', 'likes')">
            <span class="emoji">❤️</span>
            <span class="count" id="count-${meme.id}-likes">${likes}</span>
          </button>
          <button class="reaction-btn" onclick="reactToMeme('${meme.id}', 'laughs')">
            <span class="emoji">😂</span>
            <span class="count" id="count-${meme.id}-laughs">${laughs}</span>
          </button>
          <button class="reaction-btn" onclick="reactToMeme('${meme.id}', 'facepalms')">
            <span class="emoji">🤦‍♂️</span>
            <span class="count" id="count-${meme.id}-facepalms">${facepalms}</span>
          </button>
          <button class="share-btn" onclick="shareMeme('${meme.id}', '${meme.title}')" title="Share Meme">
            <span class="share-icon">🔗</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// React to Meme, update localstorage & scoreboard
window.reactToMeme = function(memeId, type) {
  const key = `meme_${memeId}_${type}`;
  const meme = window.memesData.find(m => m.id === memeId);
  if (!meme) return;

  const currentCount = parseInt(localStorage.getItem(key)) || meme[type];
  const newCount = currentCount + 1;
  localStorage.setItem(key, newCount);

  // Update UI instantly
  const countEl = document.getElementById(`count-${memeId}-${type}`);
  if (countEl) {
    countEl.textContent = newCount;
    countEl.parentElement.classList.add("reacted");
    setTimeout(() => {
      countEl.parentElement.classList.remove("reacted");
    }, 300);
  }

  // Update Political Battleground if it's political category
  if (meme.category === "political" && type === "laughs") {
    updateBattleScore();
  }
};

// Share Meme (Copy title link)
window.shareMeme = function(memeId, title) {
  const shareText = `Check out this hilarious political/coding meme: "${title}" - Shared from Comedy Memes Hub!`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast("Meme link copied to clipboard! 🚀");
    });
  } else {
    alert(shareText);
  }
};

// Populate templates select options in generator dropdown
function populateMemeTemplates() {
  const select = document.getElementById("template-select");
  if (!select) return;

  select.innerHTML = `
    <option value="" disabled selected>Choose a meme template...</option>
    ${window.memeTemplates.map(t => `<option value="${t.id}">${t.name}</option>`).join("")}
    <option value="custom">-- Upload Custom Image --</option>
  `;
}

// Render Soundboard cards
function renderSoundboard() {
  const container = document.getElementById("sound-grid");
  if (!container) return;

  container.innerHTML = window.soundsData.map(sound => {
    return `
      <div class="sound-card" id="sound-${sound.id}" style="--accent-color: ${sound.color}" onclick="playSound('${sound.id}')">
        <div class="sound-card-header">
          <span class="sound-category">${sound.category.toUpperCase()}</span>
          <div class="sound-wave hidden">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <h4 class="sound-name">${sound.name}</h4>
        <p class="sound-desc">${sound.description}</p>
        <button class="sound-play-btn" style="background: ${sound.color}">
          <span class="play-icon">▶</span>
        </button>
      </div>
    `;
  }).join("");
}

// Play soundboard audios
window.playSound = function(soundId) {
  const sound = window.soundsData.find(s => s.id === soundId);
  if (!sound) return;

  if (currentAudio) {
    currentAudio.pause();
    resetSoundButtons();
  }

  const card = document.getElementById(`sound-${soundId}`);
  if (card) {
    card.classList.add("playing");
    const wave = card.querySelector(".sound-wave");
    if (wave) wave.classList.remove("hidden");
    const icon = card.querySelector(".play-icon");
    if (icon) icon.textContent = "⏸";
  }

  const audio = new Audio(sound.url);
  currentAudio = audio;

  audio.addEventListener("ended", () => {
    if (currentAudio === audio) {
      currentAudio = null;
    }
    card.classList.remove("playing");
    const wave = card.querySelector(".sound-wave");
    if (wave) wave.classList.add("hidden");
    const icon = card.querySelector(".play-icon");
    if (icon) icon.textContent = "▶";
  });

  audio.play().catch(err => {
    console.error("Audio play failed:", err);
    showToast("Sound could not be loaded. Please check internet connection.");
    card.classList.remove("playing");
    const wave = card.querySelector(".sound-wave");
    if (wave) wave.classList.add("hidden");
    const icon = card.querySelector(".play-icon");
    if (icon) icon.textContent = "▶";
  });
};

function resetSoundButtons() {
  const cards = document.querySelectorAll(".sound-card");
  cards.forEach(card => {
    card.classList.remove("playing");
    const wave = card.querySelector(".sound-wave");
    if (wave) wave.classList.add("hidden");
    const icon = card.querySelector(".play-icon");
    if (icon) icon.textContent = "▶";
  });
}

// Calculate BJP vs Congress Laugh Scores in Real Time
function updateBattleScore() {
  const bjpBar = document.getElementById("bjp-bar");
  const congressBar = document.getElementById("congress-bar");
  if (!bjpBar || !congressBar) return;

  let bjpLaughs = 0;
  let congressLaughs = 0;

  window.memesData.forEach(meme => {
    if (meme.category === "political") {
      const keyPrefix = `meme_${meme.id}_`;
      const laughs = parseInt(localStorage.getItem(`${keyPrefix}laughs`)) || meme.laughs;
      
      const containsBjp = meme.title.toLowerCase().includes("bjp") || 
                          meme.caption.toLowerCase().includes("bjp") || 
                          meme.tags.includes("bjp");
      
      const containsCong = meme.title.toLowerCase().includes("congress") || 
                           meme.caption.toLowerCase().includes("congress") || 
                           meme.tags.includes("congress");

      if (containsBjp) bjpLaughs += laughs;
      if (containsCong) congressLaughs += laughs;
    }
  });

  const total = bjpLaughs + congressLaughs;
  if (total > 0) {
    const bjpPercent = Math.round((bjpLaughs / total) * 100);
    const congPercent = 100 - bjpPercent;

    bjpBar.style.width = `${bjpPercent}%`;
    bjpBar.textContent = `${bjpPercent}% (${bjpLaughs} 😂)`;

    congressBar.style.width = `${congPercent}%`;
    congressBar.textContent = `${congPercent}% (${congressLaughs} 😂)`;
  }
}

// SIMULATOR 1: Live Ticker Tapes
function startLiveTickerSimulation() {
  const ticker = document.getElementById("live-activity-ticker");
  if (!ticker) return;

  const activities = [
    "@ModiJiFan reacted 😂 on exit polls claim",
    "@RG_Supporter joined the chatroom",
    "New tech meme created by @CodingGuru",
    "@Amit_ITCell commented on 'BJP vs Congress'",
    "@Rahul_Gandhi_Fan reacted 🤦‍♂️ on 'Spiderman Pointing'",
    "@ChaiLover shared meme to WhatsApp status",
    "@NoPoliticsPlease voted ❤️ on a Wholesome dog meme",
    "@SeniorDev commented: 'Is that a bug or a campaign strategy?'",
    "@FufaJi shared 'WhatsApp Family Group Debate' meme",
    "@VoterIndian reacted 😂 on 'Political Sarcasm'"
  ];

  // Rotate list of items in ticker tapes
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * activities.length);
    const text = activities[randomIndex];
    
    // Add item to ticker
    const item = document.createElement("span");
    item.className = "ticker-item";
    item.textContent = text;
    ticker.appendChild(item);
    
    // Remove oldest item to prevent memory leaks
    if (ticker.children.length > 8) {
      ticker.removeChild(ticker.children[0]);
    }
  }, 4000);
}

// SIMULATOR 2: Auto Meme Uploader
function startAutoUploaderSimulation() {
  const progressBar = document.getElementById("live-upload-progress");
  const statusText = document.getElementById("upload-status-text");
  const queueList = document.getElementById("upload-queue-list");

  if (!progressBar || !statusText || !queueList) return;

  progressInterval = setInterval(() => {
    uploadProgress += progressStep;
    if (uploadProgress >= 100) {
      uploadProgress = 0;
      triggerSimulatedUpload();
    }
    progressBar.style.width = `${uploadProgress}%`;
    const secRemaining = Math.ceil(((100 - uploadProgress) / 100) * (uploadDuration / 1000));
    statusText.textContent = `New meme uploading in ${secRemaining}s...`;
  }, progressIncrementTime);

  function triggerSimulatedUpload() {
    const pool = window.simulatedMemesPool;
    if (!pool || pool.length === 0) return;

    // Pick a random meme from pool
    const randomIndex = Math.floor(Math.random() * pool.length);
    const template = pool[randomIndex];

    // Generate unique ID and randomized reaction counts
    const newId = `simulated_${Date.now()}`;
    const newMeme = {
      id: newId,
      title: template.title,
      category: template.category,
      tags: [...template.tags, "live-upload"],
      imageUrl: template.imageUrl,
      caption: template.caption,
      likes: Math.floor(Math.random() * 200) + 50,
      laughs: Math.floor(Math.random() * 400) + 100,
      facepalms: Math.floor(Math.random() * 50) + 5
    };

    // Push to window.memesData at index 0 (so it appears at top of feed)
    window.memesData.unshift(newMeme);

    // Re-render feed if dashboard is showing
    renderMemes();
    updateBattleScore();

    // Show beautiful toast notification
    showToast(`🆕 ${template.creator} uploaded: "${template.title}"!`);

    // Add to Sidebar Queue List
    const queueItem = document.createElement("div");
    queueItem.className = "queue-item";
    queueItem.innerHTML = `
      <span class="queue-user">${template.creator}</span>
      <span class="queue-title">${template.title}</span>
      <span class="queue-category">${template.category.toUpperCase()}</span>
    `;
    queueList.insertBefore(queueItem, queueList.firstChild);

    // Keep queue list length clean
    if (queueList.children.length > 5) {
      queueList.removeChild(queueList.lastChild);
    }
  }
}

// Toast Notifications helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

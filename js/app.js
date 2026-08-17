// ===== CONFIGURATION =====
const API_BASE = window.location.origin;

// ===== AUTH SYSTEM (localStorage) =====
function getUsers() {
  return JSON.parse(localStorage.getItem("ntp_users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("ntp_users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("ntp_currentUser") || "null");
}

function setCurrentUser(user) {
  localStorage.setItem("ntp_currentUser", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("ntp_currentUser");
  window.location.href = "index.html";
}

function handleRegister(e) {
  e.preventDefault();
  const errEl = document.getElementById("auth-error");
  const successEl = document.getElementById("auth-success");
  errEl.classList.remove("show");
  successEl.classList.remove("show");

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (password !== confirm) {
    errEl.textContent = "Passwords do not match.";
    errEl.classList.add("show");
    return;
  }

  if (password.length < 6) {
    errEl.textContent = "Password must be at least 6 characters.";
    errEl.classList.add("show");
    return;
  }

  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    errEl.textContent = "An account with this email already exists.";
    errEl.classList.add("show");
    return;
  }

  if (users.find((u) => u.name.toLowerCase() === name.toLowerCase())) {
    errEl.textContent = "This username is already taken.";
    errEl.classList.add("show");
    return;
  }

  const user = { name, email, password, role: "member", joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }), posts: 0, threads: 0, reputation: 0, bio: "New to NightTime RP!" };
  users.push(user);
  saveUsers(users);
  setCurrentUser(user);

  successEl.textContent = "Account created! Redirecting...";
  successEl.classList.add("show");
  setTimeout(() => { window.location.href = "index.html"; }, 1000);
}

function handleLogin(e) {
  e.preventDefault();
  const errEl = document.getElementById("auth-error");
  errEl.classList.remove("show");

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    errEl.textContent = "Invalid email or password.";
    errEl.classList.add("show");
    return;
  }

  setCurrentUser(user);
  window.location.href = "index.html";
}

// ===== FORUM DATA =====
const categories = [
  { id: 1, icon: "📢", name: "Announcements", description: "Server news, updates, and important information", threads: 47, posts: 312, lastThread: "Patch 2.4 — New vehicles & interiors", lastAuthor: "Admin", lastTime: "1 hr ago", color: "var(--accent)" },
  { id: 2, icon: "📋", name: "Character Applications", description: "Submit and review character whitelisting applications", threads: 234, posts: 1890, lastThread: "New character: Marcus Cole — LSPD Transfer", lastAuthor: "xXDarkAngelXx", lastTime: "20 min ago", color: "var(--success)" },
  { id: 3, icon: "🔵", name: "Los Santos Police Department", description: "LSPD internal discussions, reports, and patrol logs", threads: 189, posts: 2340, lastThread: "Patrol Report — Officer Martinez 8/16", lastAuthor: "CptMartinez", lastTime: "45 min ago", color: "var(--lspd)" },
  { id: 4, icon: "🚑", name: "Pillbox Hill Medical Center", description: "EMS/Fire department discussions and medical RP", threads: 112, posts: 890, lastThread: "New ambulance dispatch protocol", lastAuthor: "DrNightshade", lastTime: "2 hrs ago", color: "var(--ems)" },
  { id: 5, icon: "💀", name: "Gang Territory", description: "Gang RP, turf wars, and organized crime", threads: 345, posts: 4567, lastThread: "The Families vs Ballas — who runs Grove?", lastAuthor: "OG_Smoke", lastTime: "10 min ago", color: "var(--gang)" },
  { id: 6, icon: "🚗", name: "Civilian Life", description: "Regular citizen RP, businesses, and daily life in LS", threads: 278, posts: 3210, lastThread: "New car dealership opening on Route 68", lastAuthor: "MikeWheeler", lastTime: "1 hr ago", color: "var(--civic)" },
  { id: 7, icon: "🔧", name: "Mechanics & Services", description: "Auto repair, towing, taxi, and other services", threads: 98, posts: 670, lastThread: "LS Customs — now offering matte wraps", lastAuthor: "WrenchMaster", lastTime: "3 hrs ago", color: "var(--mech)" },
  { id: 8, icon: "⚖️", name: "Reports & Appeals", description: "Player reports, ban appeals, and staff tickets", threads: 156, posts: 1230, lastThread: "Report: RDM near Legion Square — Case #4821", lastAuthor: "StaffTeam", lastTime: "30 min ago", color: "var(--danger)" },
];

const threads = [
  {
    id: 1, pinned: true, title: "📌 Server Rules — Read Before Playing",
    author: "Admin", authorRole: "admin", avatar: "A", tag: "ooc",
    replies: 2, views: 15420, lastReply: "Admin", lastTime: "1 week ago",
    content: `<p><strong>Welcome to NightTime RP — FiveM Roleplay Server</strong></p>
<p>By playing on our server, you agree to follow these rules:</p>
<p><strong>1. No RDM (Random Deathmatch)</strong> — You must have a valid RP reason before initiating violence.</p>
<p><strong>2. No VDM (Vehicle Deathmatch)</strong> — Using vehicles as weapons is strictly prohibited.</p>
<p><strong>3. Value Your Life</strong> — Your character should act realistically when threatened.</p>
<p><strong>4. No Metagaming</strong> — Don't use OOC information in IC situations.</p>
<p><strong>5. No Powergaming</strong> — Don't force actions on other players without their consent.</p>
<p><strong>6. New Life Rule</strong> — If you die, you forget everything from your previous life.</p>
<p><strong>7. Respect Staff Decisions</strong> — If you disagree, open a ticket on Discord.</p>
<p><em>Breaking these rules may result in warnings, kicks, or bans.</em></p>`
  },
  {
    id: 2, pinned: true, title: "📥 How to Join — FiveM Connection Guide",
    author: "Admin", authorRole: "admin", avatar: "A", tag: "ooc",
    replies: 12, views: 8900, lastReply: "HelperBot", lastTime: "3 days ago",
    content: `<p><strong>Connecting to NightTime RP is easy:</strong></p>
<p>1. Download FiveM from <strong>fivem.net</strong></p>
<p>2. Open FiveM and press <strong>F8</strong> to open the console</p>
<p>3. Type: <code>connect 81.111.74.157:40120</code></p>
<p>4. Wait for the server to load and follow the character creation prompt</p>
<p>5. You're in! Head to the apartment selector and start your new life in Los Santos.</p>
<p><strong>Need help?</strong> Join our Discord: discord.gg/nighttimerp</p>`
  },
];

// ===== LIVE SERVER DATA =====
let serverStatus = { online: false, players: 0, maxPlayers: 48, name: "NightTime RP" };
let livePlayers = [];
let chatMessages = [];
let chatPollInterval = null;

async function fetchServerStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/status`);
    serverStatus = await res.json();
    updateServerStatusUI();
    updatePlayerList();
  } catch (err) {
    serverStatus = { online: false, players: 0, maxPlayers: 48, name: "NightTime RP" };
    updateServerStatusUI();
  }
}

async function fetchPlayers() {
  try {
    const res = await fetch(`${API_BASE}/api/players`);
    const data = await res.json();
    if (data.online) {
      livePlayers = data.players;
      updatePlayerList();
    }
  } catch (err) {
    livePlayers = [];
    updatePlayerList();
  }
}

async function fetchChat() {
  try {
    const res = await fetch(`${API_BASE}/api/chat?limit=30`);
    chatMessages = await res.json();
    updateChatUI();
  } catch (err) {
    // Backend not running — use empty chat
  }
}

async function sendChatMessage(username, message) {
  try {
    await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    });
    await fetchChat();
  } catch (err) {
    alert("Could not send message. Is the backend server running?");
  }
}

// ===== UI UPDATES =====
function updateServerStatusUI() {
  const el = document.getElementById("server-status");
  if (!el) return;

  if (serverStatus.online) {
    el.innerHTML = `
      <div class="server-status">
        <div class="dot"></div>
        <span class="info">Server Online</span>
        <span class="players">${serverStatus.players} / ${serverStatus.maxPlayers}</span>
      </div>
    `;
  } else {
    el.innerHTML = `
      <div class="server-status" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.2);">
        <div class="dot" style="background:var(--danger);"></div>
        <span class="info" style="color:var(--danger);">Server Offline</span>
        <span class="players">0 / ${serverStatus.maxPlayers}</span>
      </div>
    `;
  }

  // Update hero stats
  const heroPlayers = document.getElementById("hero-players");
  if (heroPlayers) heroPlayers.textContent = serverStatus.online ? serverStatus.players : 0;
}

function updatePlayerList() {
  const container = document.getElementById("online-users");
  if (!container) return;

  if (livePlayers.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem;color:var(--text-muted);padding:8px 0;">No players online</div>`;
    return;
  }

  container.innerHTML = livePlayers.slice(0, 15).map((p) => `
    <div class="online-user">
      <div class="avatar avatar-sm">${p.name.charAt(0).toUpperCase()}<div class="status-dot"></div></div>
      <span class="name">${escapeHtml(p.name)}</span>
      <span style="margin-left:auto;font-size:0.65rem;color:var(--text-muted);">${p.ping}ms</span>
    </div>
  `).join("");

  // Update online count in sidebar
  const countEl = document.getElementById("online-count");
  if (countEl) countEl.textContent = livePlayers.length;
}

function updateChatUI() {
  const container = document.getElementById("chat-messages");
  if (!container) return;

  container.innerHTML = chatMessages.map((m) => {
    const isSystem = m.username === "[SYSTEM]" || m.source === "system";
    const isGame = m.source === "game";
    const sourceTag = isGame ? '<span style="color:var(--success);font-size:0.65rem;">[IN-GAME]</span> ' : "";
    return `
      <div class="chat-msg ${isSystem ? "chat-system" : ""}">
        <span class="chat-user">${sourceTag}${escapeHtml(m.username)}</span>
        <span class="chat-text">${escapeHtml(m.message)}</span>
      </div>
    `;
  }).join("");

  container.scrollTop = container.scrollHeight;
}

function handleChatSend(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const user = getCurrentUser();
  if (!user) {
    alert("Login to send messages to the server!");
    return;
  }
  const msg = input.value.trim();
  if (!msg) return;

  sendChatMessage(user.name, msg);
  input.value = "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===== RENDER FUNCTIONS =====
function renderNavbar() {
  const nav = document.getElementById("nav-actions");
  if (!nav) return;
  const user = getCurrentUser();

  if (user) {
    nav.innerHTML = `
      <div class="search-bar">
        <span class="search-icon">&#128269;</span>
        <input type="text" placeholder="Search forums...">
      </div>
      <div class="user-menu">
        <button class="user-menu-btn" onclick="toggleDropdown()">
          <div class="avatar avatar-sm">${user.name.charAt(0).toUpperCase()}</div>
          ${user.name}
        </button>
        <div class="user-dropdown" id="user-dropdown">
          <a href="profile.html?user=${encodeURIComponent(user.name)}">My Profile</a>
          <a href="#" onclick="alert('Settings coming soon!')">Settings</a>
          <div class="divider"></div>
          <button onclick="logout()">Log Out</button>
        </div>
      </div>
    `;
  } else {
    nav.innerHTML = `
      <div class="search-bar">
        <span class="search-icon">&#128269;</span>
        <input type="text" placeholder="Search forums...">
      </div>
      <a href="login.html" class="btn btn-secondary btn-sm">Log In</a>
      <a href="register.html" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}

function toggleDropdown() {
  const dd = document.getElementById("user-dropdown");
  dd.classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const menu = document.querySelector(".user-menu");
  if (menu && !menu.contains(e.target)) {
    const dd = document.getElementById("user-dropdown");
    if (dd) dd.classList.remove("show");
  }
});

function renderCategories() {
  const list = document.getElementById("category-list");
  if (!list) return;
  list.innerHTML = categories.map((c) => `
    <a href="category.html?id=${c.id}" class="category-card" style="text-decoration:none;color:inherit;">
      <div class="category-icon" style="background:${c.color}22;border:1px solid ${c.color}44;">${c.icon}</div>
      <div class="category-info">
        <h3>${c.name}</h3>
        <p>${c.description}</p>
      </div>
      <div class="category-stats">
        <div class="stat">
          <span class="stat-num">${c.threads}</span>
          <span class="stat-label">Threads</span>
        </div>
        <div class="stat">
          <span class="stat-num">${c.posts.toLocaleString()}</span>
          <span class="stat-label">Posts</span>
        </div>
      </div>
      <div class="category-last-post">
        <div class="thread-title">${c.lastThread}</div>
        <div class="thread-meta">by ${c.lastAuthor} &middot; ${c.lastTime}</div>
      </div>
    </a>
  `).join("");
}

function renderThreads() {
  const list = document.getElementById("thread-list");
  if (!list) return;

  list.innerHTML = threads.map((t) => `
    <a href="thread.html?id=${t.id}" class="thread-item ${t.pinned ? "pinned" : ""}" style="text-decoration:none;color:inherit;">
      <div class="thread-avatar">
        <div class="avatar">${t.avatar}</div>
      </div>
      <div class="thread-content">
        <h3>${t.title}</h3>
        <div class="thread-meta">
          by <span class="author">${t.author}</span> &middot; ${t.tag.toUpperCase()} &middot; Last reply by ${t.lastReply} &middot; ${t.lastTime}
        </div>
      </div>
      <div class="thread-tags">
        <span class="tag tag-${t.tag}">${t.tag}</span>
      </div>
      <div class="thread-stats">
        <div class="stat">
          <span class="stat-num">${t.replies}</span>
          <span class="stat-label">Replies</span>
        </div>
        <div class="stat">
          <span class="stat-num">${t.views.toLocaleString()}</span>
          <span class="stat-label">Views</span>
        </div>
      </div>
    </a>
  `).join("");
}

function renderThread() {
  const header = document.getElementById("thread-header");
  const postList = document.getElementById("post-list");
  if (!header || !postList) return;

  const id = parseInt(new URLSearchParams(window.location.search).get("id") || "1");
  const thread = threads.find((t) => t.id === id) || threads[0];

  header.innerHTML = `
    <h1>${thread.title}</h1>
    <div class="meta">
      <span>Started by <strong style="color:var(--accent-light)">${thread.author}</strong></span>
      <span>&middot;</span>
      <span>${thread.tag.toUpperCase()}</span>
      <span>&middot;</span>
      <span>${thread.views.toLocaleString()} views</span>
    </div>
  `;

  postList.innerHTML = `
    <div class="post-card">
      <div class="post-sidebar">
        <a href="profile.html?user=${encodeURIComponent(thread.author)}" style="text-decoration:none;"><div class="avatar avatar-lg">${thread.avatar}</div></a>
        <a href="profile.html?user=${encodeURIComponent(thread.author)}" style="text-decoration:none;"><div class="username">${thread.author}</div></a>
        <span class="role admin">Admin</span>
        <div class="joined">Joined: Jan 2026</div>
      </div>
      <div class="post-body">
        <div class="post-content">${thread.content}</div>
        <div class="post-footer">
          <span class="post-date">Posted 1 week ago</span>
          <div class="post-actions">
            <button onclick="alert('Liked!')">Like</button>
            <button onclick="document.querySelector('textarea.form-input').focus()">Reply</button>
            <button onclick="alert('Quoted!')">Quote</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProfile() {
  const header = document.getElementById("profile-header");
  const statsGrid = document.getElementById("profile-stats");
  const recentPosts = document.getElementById("recent-posts");
  if (!header) return;

  const userName = new URLSearchParams(window.location.search).get("user") || "Admin";
  const users = getUsers();
  const storedUser = users.find((u) => u.name === userName);

  const defaultProfiles = {
    Admin: { role: "admin", roleLabel: "Server Admin", bio: "Running NightTime RP since day one.", joined: "Jan 2026", posts: 2890, threads: 145, reputation: 12400, online: true },
  };

  const p = storedUser
    ? { role: storedUser.role, roleLabel: storedUser.role, bio: storedUser.bio, joined: storedUser.joined, posts: storedUser.posts, threads: storedUser.threads, reputation: storedUser.reputation, online: true }
    : defaultProfiles[userName] || { role: "member", roleLabel: "Member", bio: "Just another resident of Los Santos.", joined: "Jan 2026", posts: 0, threads: 0, reputation: 0, online: false };

  header.innerHTML = `
    <div class="avatar avatar-xl">${userName.charAt(0).toUpperCase()}</div>
    <div class="profile-info">
      <h1>${userName}</h1>
      <span class="role-badge ${p.role}">${p.roleLabel}</span>
      <p class="bio">${p.bio}</p>
      <div class="profile-meta">
        <span>Joined ${p.joined}</span>
        <span>Los Santos</span>
        <span>${p.online ? "🟢 Online" : "⚫ Offline"}</span>
      </div>
    </div>
  `;

  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="profile-stat-card"><div class="num">${p.posts}</div><div class="label">Posts</div></div>
      <div class="profile-stat-card"><div class="num">${p.threads}</div><div class="label">Threads</div></div>
      <div class="profile-stat-card"><div class="num">${p.reputation.toLocaleString()}</div><div class="label">Reputation</div></div>
      <div class="profile-stat-card"><div class="num">${Math.floor(p.posts / 8)}</div><div class="label">Likes</div></div>
    `;
  }

  if (recentPosts) {
    recentPosts.innerHTML = threads.slice(0, 2).map((t) => `
      <a href="thread.html?id=${t.id}" class="thread-item" style="text-decoration:none;color:inherit;">
        <div class="thread-content">
          <h3>${t.title}</h3>
          <div class="thread-meta">${t.lastTime} &middot; ${t.replies} replies</div>
        </div>
      </a>
    `).join("");
  }
}

function highlightNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderCategories();
  renderThreads();
  renderThread();
  renderProfile();
  highlightNav();

  // Fetch live server data
  fetchServerStatus();
  fetchPlayers();

  // Set up chat form
  const chatForm = document.getElementById("chat-form");
  if (chatForm) {
    chatForm.addEventListener("submit", handleChatSend);
    fetchChat();
    // Poll chat every 5 seconds
    chatPollInterval = setInterval(fetchChat, 5000);
  }

  // Poll server status every 15 seconds
  setInterval(fetchServerStatus, 15000);
  setInterval(fetchPlayers, 15000);
});

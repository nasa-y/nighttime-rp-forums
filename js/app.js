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

// ===== MOCK DATA =====
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
<p>3. Type: <code>connect connect.nighttimerp.com</code></p>
<p>4. Wait for the server to load and follow the character creation prompt</p>
<p>5. You're in! Head to the apartment selector and start your new life in Los Santos.</p>
<p><strong>Need help?</strong> Join our Discord: discord.gg/nighttimerp</p>`
  },
  {
    id: 3, pinned: false, title: "Patrol Report — Officer Martinez 8/16/2026",
    author: "CptMartinez", authorRole: "member", avatar: "C", tag: "ic",
    replies: 8, views: 234, lastReply: "LtRivera", lastTime: "45 min ago",
    content: `<p><strong>Shift:</strong> Night (2200-0600)<br><strong>Patrol Zone:</strong> Vinewood / Rockford Hills<br><strong>Partner:</strong> Ofc. Thompson</p>
<p><strong>2230</strong> — Conducted traffic stop on Route 68. Vehicle had expired tags. Verbal warning issued.</p>
<p><strong>2345</strong> — Responded to 10-31 (crime in progress) at Vinewood Blvd. Two individuals fighting outside the liquor store. Both parties separated, no arrests made.</p>
<p><strong>0120</strong> — Pursued stolen vehicle (red Buffalo) from Legion Square. Lost visual at the tunnels. BOLO issued.</p>
<p><strong>0310</strong> — Assisted with traffic control near the casino due to a vehicle accident.</p>
<p><em>Overall quiet shift. Need more units on night patrol.</em></p>`
  },
  {
    id: 4, pinned: false, title: "The Families vs Ballas — Who Really Runs Grove Street?",
    author: "OG_Smoke", authorRole: "member", avatar: "O", tag: "ic",
    replies: 67, views: 2100, lastReply: "BallSoHard99", lastTime: "10 min ago",
    content: `<p><em>*OG_Smoke pulls up in a green Buccaneer, leanin' out the window*</em></p>
<p>Aye, let's settle this once and for all. Grove Street used to be Families territory. Then Ballas pushed in from Chamberlain. Now what?</p>
<p>Families still hold the block. Ballas got the apartments and the corner on Forum Drive. But everybody knows — Families run this neighborhood.</p>
<p>Ballas can talk all they want. But when the shots ring out, who's still standing?</p>
<p><em>*He spits on the ground*</em></p>
<p>Any Balla wanna dispute this, you know where to find me. Grove Street. For life.</p>`
  },
  {
    id: 5, pinned: false, title: "New Ambulance Dispatch Protocol — Pillbox Medical",
    author: "DrNightshade", authorRole: "member", avatar: "D", tag: "ic",
    replies: 14, views: 456, lastReply: "EMT_Johnson", lastTime: "2 hrs ago",
    content: `<p><strong>Attention all Pillbox Hill Medical Staff:</strong></p>
<p>Starting immediately, we're implementing new dispatch protocols:</p>
<p>• <strong>Priority 1 (Life Threatening)</strong> — All available units respond immediately</p>
<p>• <strong>Priority 2 (Serious Injury)</strong> — Nearest unit responds</p>
<p>• <strong>Priority 3 (Non-Urgent)</strong> — Available unit on next rotation</p>
<p>All units must check in with dispatch upon going 10-8 (in service). Stay radio-equipped at all times.</p>
<p><em>— Dr. Nightshade, Chief of Medicine</em></p>`
  },
  {
    id: 6, pinned: false, title: "Report: RDM near Legion Square — Case #4821",
    author: "StaffTeam", authorRole: "mod", avatar: "S", tag: "report",
    replies: 5, views: 89, lastReply: "StaffTeam", lastTime: "30 min ago",
    content: `<p><strong>Report Filed:</strong> Random Deathmatch<br><strong>Location:</strong> Legion Square, 14:32<br><strong>Victim:</strong> xXCasualPlayerXx<br><strong>Accused:</strong> DarkViper99</p>
<p><strong>Description:</strong> Victim reports walking through Legion Square when the accused approached and shot them without any prior RP interaction or warning. No words were exchanged before the shots were fired.</p>
<p><strong>Status:</strong> Under investigation. Both parties have been contacted for statements.</p>
<p><em>If you witnessed this incident, please open a ticket on Discord with your statement.</em></p>`
  },
];

const onlineUsers = [
  { name: "Admin", role: "Admin", avatar: "A" },
  { name: "CptMartinez", role: "LSPD", avatar: "C" },
  { name: "OG_Smoke", role: "Families", avatar: "O" },
  { name: "DrNightshade", role: "EMS", avatar: "D" },
  { name: "BallSoHard99", role: "Ballas", avatar: "B" },
  { name: "MikeWheeler", role: "Civilian", avatar: "M" },
  { name: "WrenchMaster", role: "Mechanic", avatar: "W" },
];

const activities = [
  { user: "OG_Smoke", action: "posted in", target: "Gang Territory", time: "1m ago" },
  { user: "CptMartinez", action: "submitted a report in", target: "LSPD", time: "5m ago" },
  { user: "xXDarkAngelXx", action: "applied in", target: "Character Applications", time: "12m ago" },
  { user: "DrNightshade", action: "replied to", target: "EMS Dispatch", time: "18m ago" },
  { user: "StaffTeam", action: "updated Case", target: "#4821", time: "30m ago" },
];

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
  const categoryId = new URLSearchParams(window.location.search).get("id");
  const filtered = categoryId ? threads.filter((_, i) => i < 4) : threads;

  list.innerHTML = filtered.map((t) => `
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

  const roleMap = {
    Admin: { badge: "admin", label: "Admin" },
    CptMartinez: { badge: "police", label: "LSPD Captain" },
    OG_Smoke: { badge: "member", label: "Families OG" },
    DrNightshade: { badge: "ems", label: "Chief of Medicine" },
    BallSoHard99: { badge: "member", label: "Ballas" },
    StaffTeam: { badge: "mod", label: "Staff" },
  };

  const posts = [
    { author: thread.author, avatar: thread.avatar, role: thread.authorRole, content: thread.content, date: "Today at 12:00 PM" },
    { author: "CptMartinez", avatar: "C", role: "police", content: `<p>Good report. We need to increase patrol presence in that area during night shift. I'll bring it up at the next LSPD briefing.</p>`, date: "Today at 12:30 PM" },
    { author: "OG_Smoke", avatar: "O", role: "member", content: `<p><em>*leans against the wall*</em></p><p>Street's been quiet lately. Too quiet. Something's brewing, I can feel it.</p>`, date: "Today at 1:15 PM" },
    { author: "StaffTeam", avatar: "S", role: "mod", content: `<p>We're looking into this. If anyone has clips or screenshots, please submit them through the ticket system on Discord.</p><p><strong>Status:</strong> Under review</p>`, date: "Today at 2:00 PM" },
  ];

  postList.innerHTML = posts.map((p, i) => {
    const r = roleMap[p.author] || { badge: "member", label: "Member" };
    return `
    <div class="post-card" style="animation-delay:${i * 0.08}s">
      <div class="post-sidebar">
        <a href="profile.html?user=${encodeURIComponent(p.author)}" style="text-decoration:none;"><div class="avatar avatar-lg">${p.avatar}</div></a>
        <a href="profile.html?user=${encodeURIComponent(p.author)}" style="text-decoration:none;"><div class="username">${p.author}</div></a>
        <span class="role ${r.badge}">${r.label}</span>
        <div class="joined">Joined: Jan 2026</div>
        <div class="posts-count">Posts: ${Math.floor(Math.random() * 500 + 50)}</div>
      </div>
      <div class="post-body">
        <div class="post-content">${p.content}</div>
        <div class="post-footer">
          <span class="post-date">${p.date}</span>
          <div class="post-actions">
            <button onclick="alert('Liked!')">Like</button>
            <button onclick="document.querySelector('textarea.form-input').focus()">Reply</button>
            <button onclick="alert('Quoted!')">Quote</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
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
    Admin: { role: "admin", roleLabel: "Server Admin", bio: "Running NightTime RP since day one. Don't make me use my ban hammer.", joined: "Jan 2026", posts: 2890, threads: 145, reputation: 12400, online: true },
    CptMartinez: { role: "police", roleLabel: "LSPD Captain", bio: "Protect and serve. Night shift veteran. I've seen things in Vinewood you wouldn't believe.", joined: "Feb 2026", posts: 1234, threads: 67, reputation: 4200, online: true },
    OG_Smoke: { role: "member", roleLabel: "Families", bio: "Grove Street for life. Ain't nobody pushing us out.", joined: "Mar 2026", posts: 892, threads: 34, reputation: 2800, online: true },
    DrNightshade: { role: "ems", roleLabel: "EMS Chief", bio: "Saving lives in Los Santos, one patient at a time. Don't call me unless someone's dying.", joined: "Feb 2026", posts: 678, threads: 23, reputation: 3100, online: true },
    BallSoHard99: { role: "member", roleLabel: "Ballas", bio: "Purple til I die. Ballas run these streets.", joined: "Apr 2026", posts: 456, threads: 12, reputation: 1200, online: true },
  };

  const p = storedUser
    ? { role: storedUser.role, roleLabel: storedUser.role, bio: storedUser.bio, joined: storedUser.joined, posts: storedUser.posts, threads: storedUser.threads, reputation: storedUser.reputation, online: true }
    : defaultProfiles[userName] || { role: "member", roleLabel: "Member", bio: "Just another resident of Los Santos.", joined: "Jan 2026", posts: 0, threads: 0, reputation: 0, online: false };

  const avatarBg = p.role === "admin" ? "var(--danger)" : p.role === "police" ? "var(--lspd)" : p.role === "ems" ? "var(--ems)" : "var(--gradient-1)";

  header.innerHTML = `
    <div class="avatar avatar-xl" style="background:${avatarBg}">${userName.charAt(0).toUpperCase()}</div>
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
    recentPosts.innerHTML = threads.slice(0, 3).map((t) => `
      <a href="thread.html?id=${t.id}" class="thread-item" style="text-decoration:none;color:inherit;">
        <div class="thread-content">
          <h3>${t.title}</h3>
          <div class="thread-meta">${t.lastTime} &middot; ${t.replies} replies</div>
        </div>
      </a>
    `).join("");
  }
}

function renderOnlineUsers() {
  const container = document.getElementById("online-users");
  if (!container) return;
  container.innerHTML = onlineUsers.map((u) => `
    <a href="profile.html?user=${u.name}" class="online-user" style="text-decoration:none;color:inherit;">
      <div class="avatar avatar-sm">${u.avatar}<div class="status-dot"></div></div>
      <span class="name">${u.name}</span>
      <span style="margin-left:auto;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">${u.role}</span>
    </a>
  `).join("");
}

function renderActivity() {
  const container = document.getElementById("recent-activity");
  if (!container) return;
  container.innerHTML = activities.map((a) => `
    <div class="activity-item">
      <span class="time">${a.time}</span>
      <span><strong>${a.user}</strong> ${a.action} <em>${a.target}</em></span>
    </div>
  `).join("");
}

function renderServerStatus() {
  const el = document.getElementById("server-status");
  if (!el) return;
  el.innerHTML = `
    <div class="dot"></div>
    <span class="info">Server Online</span>
    <span class="players">128 / 256 players</span>
  `;
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
  renderOnlineUsers();
  renderActivity();
  renderServerStatus();
  highlightNav();
});
